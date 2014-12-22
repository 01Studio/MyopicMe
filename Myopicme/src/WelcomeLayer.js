var WelcomeLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		this._super();
		var winSize=cc.director.getWinSize();
		var menuFont=new cc.MenuItemFont("CityScene",this.CityScene,null);
		var menu=new cc.Menu(menuFont);
		var centerPos=new cc.p(winSize.width/2,winSize.height/2);
		menu.setPosition(centerPos);
		this.addChild(menu);
	},
	
	CityScene:function(){
		cc.director.runScene(new CityScene());
	}
});