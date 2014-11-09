/*
 * 游戏开火层
 * 
 */

var FireLayer=cc.Layer.extend({

	ctor:function(){
		this._super();
		this.init();
	},

	init:function(){
		this.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
		this.sprite=new cc.Sprite("res/glass.png");
		this.addChild(this.sprite);
	}
});