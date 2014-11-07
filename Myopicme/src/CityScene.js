/*
 * 城市游戏场景
 * 
 */

var CityScene=cc.Scene.extend({
	gameLayer:null,
	onEnter:function(){
		this._super();
		cc.log("CityScene is load");
		this.gameLayer=new cc.Layer();
		this.gameLayer.addChild(new AnimationLayer(), 0, TagOfLayer.Animation);
		this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.Background);
		this.gameLayer.addChild(new FireLayer(), 0, TagOfLayer.Fire);
		this.gameLayer.addChild(new StatusLayer(), 0, TagOfLayer.Status);
		this.gameLayer.addChild(new GameOverLayer(), 0, TagOfLayer.GameOver);
	}
});