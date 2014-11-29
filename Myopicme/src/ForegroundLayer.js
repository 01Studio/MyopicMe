/* 游戏前景层=
 * 游戏开火层+屏幕模糊效果
 * 
 */

var ForegroundLayer=cc.Layer.extend({
	attack:null,
	damages:[],	//碎裂玻璃的数组，用于查找修复
	glassmenu:null,
	glassall:10,
	glassnum:10,
	timemunu:null,
	ctor:function(){
		this._super();
		this.init();
	},

	init:function(){

		var winSize=cc.director.getWinSize();
		//屏幕效果
//		this.sprite=new cc.Sprite("res/glass.png");
//		this.sprite.setPosition(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2));
//		this.addChild(this.sprite);
		
		//开火按钮
		var menuItemRestart=new cc.MenuItemSprite(
				new cc.Sprite("res/Fire-act_0.png"),
				new cc.Sprite("res/Fire-free_0.png"),
				this.OnFire,this);
		var menu=new cc.Menu(menuItemRestart);
		menu.setPosition(winSize.width-100,100);
		var head=cc.Sprite("res/head.png");
		this.addChild(menu,1);
		//头像
		head.setPosition(100, winSize.height-100);
		this.addChild(head);

		//眼镜生命值
		this.glassmenu=new cc.MenuItemSprite(
				new cc.Sprite("res/life.png"),
				new cc.Sprite("res/life.png")
				);	
		this.glassmenu.setPosition(220+this.glassmenu.getContentSize().width/2, winSize.height-100);
		this.addChild(this.glassmenu,1);

		//眼镜生命值
		this.timemenu=new cc.MenuItemSprite(
				new cc.Sprite("res/time.png"),
				new cc.Sprite("res/time.png")
		);	
		this.timemenu.setPosition(250+this.glassmenu.getContentSize().width+this.timemenu.getContentSize().width/2, winSize.height-100);

		this.addChild(this.timemenu,1);
		
	},
	
	//开火
	OnFire:function(sender){
		this.getParent().gameLayer.getChildByTag(TagOfLayer.Animation).fire();
		//this.damage();
	},
	//损毁与修复眼镜
	//TODO
	damage:function(){
		var sprite=new cc.Sprite("res/glass.png");
		sprite.setPosition(cc.p(cc.director.getWinSize().width*Math.random(),cc.director.getWinSize().height*Math.random()));
		this.addChild(sprite);
		this.damages.push(sprite);
		this.glassnum-=1;
		if(this.glassnum==0){
			cc.log("gameover");
			this.glassnum=this.glassall;
		}
		this.glassmenu.setScaleX(this.glassnum/this.glassall);
	},
	//TODO
	repair:function(){
		if(this.glassnum<this.glassall){
			this.glassnum++;
			this.glassmenu.setScaleX(this.glassnum/this.glassall);
		}
		var sprite=this.damages.pop();
		if(sprite!=null)
			this.removeChild(sprite, true);
	},
});