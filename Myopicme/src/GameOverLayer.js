/*
 * 游戏结束层
 * 
 */

var GameOverLayer=cc.LayerColor.extend({
	//TODO
	ctor:function(){
		this._super();
		this.init();
	},

	init:function(){
		this._super(cc.color(0,0,0,180));
		var winSize=cc.director.getWinSize();
		//重新开始
		var centerPos=cc.p(winSize.width/2,winSize.height/2);
		var menuItemRestart=new cc.MenuItemSprite(
				new cc.Sprite("res/restart_n.png"),
				new cc.Sprite("res/restart_s.png"),
				this.onRestart,this);
		var restart=new cc.Menu(menuItemRestart);
		restart.setPosition(centerPos);
		this.addChild(restart);
		//回到菜单
		var menuFont=new cc.MenuItemFont("Back to menu",this.backToMenu,null);
		var menu=new cc.Menu(menuFont);
		menu.setColor(new cc.Color(255, 0, 0, 255));
		centerPos=new cc.p(winSize.width/2,winSize.height/3*2);
		menu.setPosition(centerPos);
		this.addChild(menu);
	},
	
	onRestart:function(sender){
		switch(Controller.getInstance().GameScene.tagOfScene){
			case TagOfScene.CityScene:
				cc.director.runScene(new CityScene());
				break;
			case TagOfScene.CountryScene:
				cc.director.runScene(new CountryScene());
				break;
			case TagOfScene.OutSpaceScene:
				cc.director.runScene(new OutSpaceScene());
				break;
		}
	},
	backToMenu:function(sender){
		cc.director.runScene(new LevelSelectScene());
	}
});