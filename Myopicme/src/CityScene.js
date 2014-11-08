/*
 * 城市游戏场景
 * 
 */

var CityScene=cc.Scene.extend({
	space:null,
	gameLayer:null,
	mapHeight:0,
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
		//上界
		wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_topHeight),// start point
				cp.v(4294967295, g_topHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		
	},
	
	update:function(dt){
		this.space.step(dt);
		
		var animationLayer=this.gameLayer.getChildByTag(TagOfLayer.Animation);
		var eye=animationLayer.getEye();
		//镜头跟随人物移动
		this.gameLayer.setPositionX(-eye.width);
		//设置地图位置，使得人物在地图中位置合理
		if(eye.height<g_accessibleTop){
			if(eye.height>g_accessibleBottom)
				this.gameLayer.setPositionY(-eye.height+g_accessibleBottom);
			else
				this.gameLayer.setPositionY(0);
		}
	},
	
	onEnter:function(){
		this._super();
		//初始化全局变量
		g_topHeight=cc.TMXTiledMap.create(res.tileMap01_tmx).getContentSize().height;
		g_accessibleBottom=cc.director.getWinSize().height/2;
		g_accessibleTop=g_topHeight-g_accessibleBottom;
		//初始化物理引擎
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