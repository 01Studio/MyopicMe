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
		//CityScene
		var menuFont=new cc.MenuItemFont("Go",this.LevelSelect,null);
		var menu=new cc.Menu(menuFont);
		var centerPos=new cc.p(winSize.width/2,winSize.height/2);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
	},
	
	LevelSelect:function(){
		cc.director.runScene(new LevelSelectScene());
	}
});