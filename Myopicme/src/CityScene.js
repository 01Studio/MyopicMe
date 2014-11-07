/*
 * 城市游戏场景
 * 
 */

var CityScene=cc.Scene.extend({
	space:null,
	gameLayer:null,
	//初始化物理引擎
	initPhysics:function(){
		this.space=new cp.Space();
		this.space.gravity=cp.v(0, -350);
		//边界线
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		
	},
	
	update:function(dt){
		this.space.step(dt);
		
		var animationLayer=this.gameLayer.getChildByTag(TagOfLayer.Animation);
		var eye=animationLayer.getEye();
		this.gameLayer.setPosition(cc.p(-eye.width, 0));
	},
	
	onEnter:function(){
		this._super();
		this.initPhysics();
		this.gameLayer=new cc.Layer();
		
		this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.Background);
		this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
		this.addChild(this.gameLayer);
		this.addChild(new FireLayer(), 0, TagOfLayer.Fire);
		this.addChild(new StatusLayer(), 0, TagOfLayer.Status);
		cc.log("CityScene is load");
		this.scheduleUpdate();
	}
});