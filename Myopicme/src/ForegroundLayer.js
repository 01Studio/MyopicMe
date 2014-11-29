/* 游戏前景层=
 * 游戏开火层+屏幕模糊效果
 * 
 */

var ForegroundLayer=cc.Layer.extend({
	heroIcon:null,//英雄头像
	//眼镜参数
	glassIcon:null,
	glassAll:10,
	glassNum:10,
	//时间参数
	timeIcon:null,
	timeAll:10,
	timeNum:10,
	
	
	ctor:function(){
		this._super();
		this.init();
	},

	init:function(){

		var winSize=cc.director.getWinSize();
		
		//开火按钮
		var menuItemFire=new cc.MenuItemSprite(
				new cc.Sprite("res/Fire-act_0.png"),
				new cc.Sprite("res/Fire-free_0.png"),
				this.OnFire,this);
		var fire=new cc.Menu(menuItemFire);
		fire.setPosition(winSize.width-100,100);
		this.addChild(fire,1);

		//英雄头像
		this.heroIcon=cc.Sprite("res/head.png");
		this.heroIcon.setPosition(100, winSize.height-100);
		this.addChild(this.heroIcon,1);

		//眼镜生命值
		this.glassIcon=new cc.Sprite("res/life.png");	
		this.glassIcon.setPosition(220+this.glassIcon.getContentSize().width/2, winSize.height-100);
		this.addChild(this.glassIcon,1);

		//时间值
		this.timeIcon=new cc.Sprite("res/time.png");	
		this.timeIcon.setPosition(250+this.glassIcon.getContentSize().width+this.timeIcon.getContentSize().width/2, winSize.height-100);
		this.addChild(this.timeIcon,1);
		
	},
	
	//开火
	OnFire:function(sender){
		this.getParent().gameLayer.getChildByTag(TagOfLayer.Animation).fire();
		this.damage();
	},
	//损毁与修复眼镜
	//TODO
	damage:function(){
		this.glassNum-=1;
		if(this.glassNum==0){
			cc.log("gameover");
			this.glassNum=this.glassAll;
		}
		this.glassIcon.setScaleX(this.glassNum/this.glassAll);
		this.getParent().BlurCityScene((this.glassAll-this.glassNum)*10);
	},
	//TODO
	repair:function(){
		if(this.glassNum<this.glassAll){
			this.glassNum++;
			this.glassIcon.setScaleX(this.glassNum/this.glassAll);
			this.getParent().BlurCityScene((this.glassAll-this.glassNum)*10);
		}
	},
});