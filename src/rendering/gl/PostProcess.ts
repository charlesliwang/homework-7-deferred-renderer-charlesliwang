import Texture from './Texture';
import {gl} from '../../globals';
import ShaderProgram, {Shader} from './ShaderProgram';
import Drawable from './Drawable';
import Square from '../../geometry/Square';
import {vec3, vec4, mat4} from 'gl-matrix';

class PostProcess extends ShaderProgram {
	static screenQuad: Square = undefined; // Quadrangle onto which we draw the frame texture of the last render pass
	unifFrame: WebGLUniformLocation; // The handle of a sampler2D in our shader which samples the texture drawn to the quad
	gb0: WebGLUniformLocation; // The handle of a sampler2D in our shader which samples the texture drawn to the quad
	gb1: WebGLUniformLocation; // The handle of a sampler2D in our shader which samples the texture drawn to the quad
	gb2: WebGLUniformLocation; // The handle of a sampler2D in our shader which samples the texture drawn to the quad
	name: string;

	constructor(fragProg: Shader, tag: string = "default") {
		super([new Shader(gl.VERTEX_SHADER, require('../../shaders/screenspace-vert.glsl')),
			fragProg]);

		this.unifFrame = gl.getUniformLocation(this.prog, "u_frame");

		this.gb0 = gl.getUniformLocation(this.prog, "u_gb0");
		this.gb1 = gl.getUniformLocation(this.prog, "u_gb1");
		this.gb2 = gl.getUniformLocation(this.prog, "u_gb2");
		this.use();
		this.name = tag;

		// bind texture unit 0 to this location
		gl.uniform1i(this.unifFrame, 0); // gl.TEXTURE0
		gl.uniform1i(this.gb0, 1); // gl.TEXTURE0
		gl.uniform1i(this.gb1, 2); // gl.TEXTURE0
		gl.uniform1i(this.gb2, 3); // gl.TEXTURE0

		if (PostProcess.screenQuad === undefined) {
			PostProcess.screenQuad = new Square(vec3.fromValues(0, 0, 0));
			PostProcess.screenQuad.create();
		}
	}

  	draw() {
  		super.draw(PostProcess.screenQuad);
  	}

  	getName() : string { return this.name; }

}

export default PostProcess;
