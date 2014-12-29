/** 
 * Created by IAMAI on 2014/11/28. 
 */ 
/** 
 * 用于控制Sprite的各类滤镜 
 * 静态类 
 */ 
var Filter = {
	shader:null,
	/**
	 * 模糊效果
	 * @param {Node} sprite
	 * @param {Number} _blurSize
	 * @author IAM_AI
	 */
	initShader:function(){
		this.shader = new cc.GLProgram("res/blur.vsh", "res/blur.fsh");
		this.shader.retain();
		this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
		this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
		this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
		this.shader.link();
		this.shader.use();
		this.shader.setUniformsForBuiltins();
		var blurSize = this.shader.getUniformLocationForName("blurSize");
		//这个函数由于jsb实现有问题，原本只能实现整数传递，现在在fsh中加入0.0001的参数调整，范围为0-10000
		gl.uniform2f(blurSize, 0, 0);
		this.shader.updateUniforms();
		
	},
	setBlurSize:function(_blurSize){
		this.shader.use();
		this.shader.setUniformsForBuiltins();
		var blurSize = this.shader.getUniformLocationForName("blurSize");
		//这个函数由于jsb实现有问题，原本只能实现整数传递，现在在fsh中加入0.0001的参数调整，范围为0-10000
		gl.uniform2f(blurSize, _blurSize,_blurSize);
		this.shader.updateUniforms();
	},
	setBlurSprite:function(sprite){
		sprite.shaderProgram = this.shader;
	}
};