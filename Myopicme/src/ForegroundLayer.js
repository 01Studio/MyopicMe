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
				new cc.Sprite(res.fire_act),
				new cc.Sprite(res.fire_free),
				this.onFire,this);
		var fire=new cc.Menu(menuItemFire);
		fire.setPosition(winSize.width-100,100);
		this.addChild(fire,1);
		this.controller.setFireIcon(fire);


		//英雄头像
		var heroIcon=new cc.Sprite(res.heroIcon);
		heroIcon.setPosition(100, winSize.height-100);
		this.addChild(heroIcon,1);
		this.controller.setHeroIcon(heroIcon);
		
		cc.spriteFrameCache.addSpriteFrames(res.objects_plist);
		var spriteSheet=new cc.SpriteBatchNode(res.objects_png);
		this.addChild(spriteSheet, 1);
		var glasses=new cc.Sprite(GlassesMaps.find(new StorageManager().getGlassesUsingKey()).find("name"));
		glasses.setPosition(100, winSize.height-80);
		spriteSheet.addChild(glasses,1);
		this.controller.setHeroIcon(glasses);
		
		//眼镜生命值		
		var glassesIcon = new ccui.LoadingBar();
		glassesIcon.loadTexture(res.glassesIcon);
		glassesIcon.setPercent(100);
		glassesIcon.setPosition(220+glassesIcon.getContentSize().width/2, winSize.height-100);
		this.addChild(glassesIcon,1);
		this.controller.setGlassesIcon(glassesIcon);

		//时间值
		var timeIcon = new ccui.LoadingBar();
		timeIcon.loadTexture(res.timeIcon);
		timeIcon.setPercent(100);
		timeIcon.setPosition(20+glassesIcon.getPositionX()+glassesIcon.getContentSize().width/2+timeIcon.getContentSize().width/2, winSize.height-100);
		this.addChild(timeIcon,1);
		this.controller.setTimeIcon(timeIcon);
		
		//分数值
		var scoreIcon = new cc.LabelAtlas("0", res.font_plist);
		this.controller.setScoreIcon(scoreIcon);
		this.addChild(scoreIcon, 1);
		scoreIcon.x = 10;
		scoreIcon.y = 100;
		scoreIcon.opacity = 200;
		
		//添加分数提醒
		var scoreAddIcon = new cc.LabelAtlas("0", res.font_plist);
		scoreAddIcon.setColor(cc.color(255, 0, 0, 255));
		scoreAddIcon.setVisible(false);
		this.controller.setScoreAddIcon(scoreAddIcon);
		this.addChild(scoreAddIcon, 2);
		scoreAddIcon.x = 10;
		scoreAddIcon.y = 130;
		scoreAddIcon.opacity = 200;
	},
	
	onFire:function(sender){
		this.controller.fire();
	},
});