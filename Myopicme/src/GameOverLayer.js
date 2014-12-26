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

		var centerPos=cc.p(winSize.width/2,winSize.height/2);
		var menuItemRestart=new cc.MenuItemSprite(
				new cc.Sprite("res/restart_n.png"),
				new cc.Sprite("res/restart_s.png"),
				this.onRestart,this);
		var restart=new cc.Menu(menuItemRestart);
		restart.setPosition(centerPos);
		this.addChild(restart);
	},
	
	onExit:function(){
		this._super();
	},
	
	
	onRestart:function(sender){
		cc.director.resume();
		cc.director.runScene(new CityScene());
	}
});