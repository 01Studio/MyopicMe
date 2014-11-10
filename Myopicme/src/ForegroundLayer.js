/* 游戏前景层=
 * 游戏开火层+屏幕模糊效果
 * 
 */

var ForegroundLayer=cc.Layer.extend({

	ctor:function(){
		this._super();
		this.init();
	},

	init:function(){
		this.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
		this.sprite=new cc.Sprite("res/glass.png");
		this.addChild(this.sprite);
	},
	//损毁与修复眼镜
	//TODO
	damage:function(){
		
	},
	//TODO
	repair:function(){
		
	},
	//主角fire按钮点击监听
	//TODO
	fire:function(){
		
	}
});