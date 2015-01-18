/*
 * 游戏主界面
 * 
 */
var WelcomeLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		var winSize=cc.director.getWinSize();
		//Scenes
		var menuFont=new cc.MenuItemFont("Go",this.LevelSelect,null);
		var menu=new cc.Menu(menuFont);
		var centerPos=new cc.p(winSize.width/2,winSize.height/2);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		//exit
		menuFont=new cc.MenuItemFont("Exit",this.Exit,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/4*3,winSize.height/4);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		//exit
		menuFont=new cc.MenuItemFont("Reset",this.Reset,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/4*3,winSize.height/4*3);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
	},
	LevelSelect:function(){
		cc.director.runScene(new LevelSelectScene());
	},
	Exit:function(){
		cc.director.end();
	},
	Reset:function(){
		var manager=new StorageManager();
		manager.reset();
	}
});