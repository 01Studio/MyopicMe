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
		this.space.gravity=cp.v(0, -350);//设置重力
		//边界线
		//下界
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(MAX_INT, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		//上界
		wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_topHeight),// start point
				cp.v(MAX_INT, g_topHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		
		//TODO 添加碰撞处理函数
		this.space.addCollisionHandler(TagOfSprite.runner,TagOfSprite.hinder,
				this.collision_runner_hinder.bind(this),null,null,null);
	},
	
	//TODO 碰撞函数 建议后期放到处理函数供多场景统一调用
	//示例
//	collisionHinder:function(arbiter,space){
//		var shapes=arbiter.getShapes();
//		this.shapesToRemove.push(shapes[1]);
//		var statusLayer=this.getChildByTag(TagOfLayer.Status);
//		statusLayer.addCoin(1);
//	},
	collision_runner_hinder:function(arbiter,space){
		cc.log("a collision happen between runner with hinder");
	},
	collision_runner_repair:function(arbiter,space){
	},
	collision_runner_enemy:function(arbiter,space){
	},
	collision_xray_hinder:function(arbiter,space){
	},
	collision_xray_enemy:function(arbiter,space){
	},
	
	update:function(dt){
		//TODO 物理世界处理，dt值需重新设置，否则不稳定
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
		this.addChild(new ForegroundLayer(), 0, TagOfLayer.Foreground);
		this.addChild(new StatusLayer(), 0, TagOfLayer.Status);
		cc.log("CityScene is load");
		this.scheduleUpdate();
	}
});