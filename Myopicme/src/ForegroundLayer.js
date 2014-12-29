/* 游戏前景层=
 * 游戏开火层+屏幕模糊效果
 * 
 */

var ForegroundLayer=cc.Layer.extend({
	//控制中心
	controller:null,
	
	ctor:function(){
		this._super();
		this.init();
		cc.log("foregroundLayer inited");
	},

	init:function(){
		this.controller=Controller.getInstance();
		
		var winSize=cc.director.getWinSize();
		//开火按钮
		var menuItemFire=new cc.MenuItemSprite(
				new cc.Sprite("res/Fire-act_0.png"),
				new cc.Sprite("res/Fire-free_0.png"),
				this.onFire,this);
		var fire=new cc.Menu(menuItemFire);
		fire.setPosition(winSize.width-100,100);
		this.addChild(fire,1);
		this.controller.setFireIcon(fire);

		//英雄头像
		var heroIcon=cc.Sprite("res/head.png");
		heroIcon.setPosition(100, winSize.height-100);
		this.addChild(heroIcon,1);
		this.controller.setHeroIcon(heroIcon);

		//眼镜生命值
		var glassIcon=new cc.Sprite("res/life.png");	
		glassIcon.setPosition(220+glassIcon.getContentSize().width/2, winSize.height-100);
		this.addChild(glassIcon,1);
		this.controller.setGlassIcon(glassIcon);

		//时间值
		var timeIcon=new cc.Sprite("res/time.png");	
		timeIcon.setPosition(250+glassIcon.getContentSize().width+timeIcon.getContentSize().width/2, winSize.height-100);
		this.addChild(timeIcon,1);
		this.controller.setTimeIcon(timeIcon);
	},
	
	onFire:function(sender){
		this.controller.fire();
	},
});