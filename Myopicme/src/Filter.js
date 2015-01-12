/** 
 * Created by IAMAI on 2014/11/28. 
 * Update by IAMAI on 2015/1/11
 * 用于全屏模糊效果，截图+blur
 */ 
Filter = function(){
	this.initShader();
}
Filter.prototype = {
		constructor:Filter,
		
		controller:null,
		
		shader:null,
		renderTexture:null,
		sprite:null,
		
		added:false,
		/**
		 * 初始化shader
		 */
		initShader:function(){
			var winSize=cc.director.getWinSize();
			
			this.renderTexture=new cc.RenderTexture(winSize.width,winSize.height,0,0);
			this.renderTexture.retain();

			this.sprite=cc.Sprite.createWithTexture(this.renderTexture.getSprite().getTexture());
			this.sprite.retain();
			this.sprite.setAnchorPoint(cc.p(0.5,0.5))
			this.sprite.setPosition(winSize.width/2, winSize.height/2);
			this.sprite.setFlippedY(true);
				
			if(cc.sys.isNative){
				this.shader = new cc.GLProgram("res/blur.vsh", "res/blur.fsh");
				this.shader.link();
				this.shader.updateUniforms();
				this.glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader);
				this.glProgram_state.setUniformVec2("blurSize", {x: 0, y: 0});
				this.sprite.setGLProgramState(this.glProgram_state);
			}	
			else{//!cc.sys.isNative 未测试
				this.shader = new cc.GLProgram("res/blur_mv.vsh", "res/blur.fsh");
				this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
				this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
				this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
				this.shader.link();
				this.shader.updateUniforms();
				this.shader.use();
				this.shader.setUniformLocationWith2f(this.shader.getUniformLocationForName('blurSize'), 0, 0);
				this.sprite.shaderProgram = this.shader;
			}
		},
		setBlurSize:function(blurSize){
			if(cc.sys.isNative){
				this.glProgram_state.setUniformVec2("blurSize", {x: blurSize, y: blurSize});
			}	
			else{//!cc.sys.isNative 未测试
				this.shader.updateUniforms();
				this.shader.setUniformLocationWith2f(this.shader.getUniformLocationForName('blurSize'), blurSize, blurSize);
			}	
		},
		/*
		 * 更新截图
		 */
		update:function(){
			if(!this.added){
				this.controller=Controller.getInstance();
				this.controller.ForegroundLayer.addChild(this.sprite,0);
				this.added=true;
			}
			this.renderTexture.begin();
			this.controller.GameLayer.visit();
			this.renderTexture.end();
		},
		destory:function(){
			this.controller.ForegroundLayer.removeChild(this.sprite);
		}
};