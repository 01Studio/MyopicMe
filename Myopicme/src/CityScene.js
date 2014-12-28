/*
 * 城市游戏场景
 * 
 */

var CityScene=cc.Scene.extend({
	space:null,//游戏空间
	gameLayer:null,//游戏层
	controller:null,
	shapesToRemove:[],
	//初始化物理引擎
	initPhysics:function(){
		this.space=new cp.Space();
		this.space.gravity=cp.v(0, space_grivaty);//设置重力
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
		this.space.addCollisionHandler(TagOfSprite.runner,TagOfSprite.repair,
				this.collision_runner_repair.bind(this),null,null,null);
		this.space.addCollisionHandler(TagOfSprite.xray,TagOfSprite.enemy,
				this.collision_xray_enemy.bind(this),null,null,null);
		this.space.addCollisionHandler(TagOfSprite.xray,TagOfSprite.hinder,
				this.collision_xray_hinder.bind(this),null,null,null);
	},
	
	//TODO 碰撞函数 建议后期放到处理函数供多场景统一调用
	//示例
//	collisionHinder:function(arbiter,space){
//		var shapes=arbiter.getShapes();
//		this.shapesToRemove.push(shapes[1]);
//		var statusLayer=this.getChildByTag(TagOfLayer.Status);
//		statusLayer.addCoin(1);
//	},
	//玩家与障碍
	collision_runner_hinder:function(arbiter,space){
		cc.log("a collision happen between runner with hinder");
	},
	//玩家与修复器
	collision_runner_repair:function(arbiter,space){
		cc.log("a collision happen between runner with repair");
		this.controller.repair();
	},
	//玩家与敌人
	collision_runner_enemy:function(arbiter,space){
	},
	//激光与障碍
	collision_xray_hinder:function(arbiter,space){
		var shapes=arbiter.getShapes();
		this.shapesToRemove.push(shapes[1]);
	},
	//激光与敌人
	collision_xray_enemy:function(arbiter,space){
		cc.log("a collision happen between xray with enemy");
	},
	
	update:function(dt){
		//TODO 物理世界处理，dt值需重新设置，否则不稳定
		this.space.step(dt);
		
		var animationLayer=this.controller.AnimationLayer;
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
//		//删除击中的障碍
//		for(var i=0;i<this.shapesToRemove.length;i++){
//			var shape=this.shapesToRemove[i];
//			this.controller.BackgroundLayer.removeObjectByShape(shape);
//		}
//		this.shapesToRemove=[];
		
		//计时，到时未击败敌人，游戏结束
		this.controller.timeNow=eye.width;
		if(this.controller.timeNow>this.controller.timeAll){
			this.controller.askForGameOver();
		}
		else{
			this.controller.clock();
		}
		
	},
	
	onEnter:function(){
		this._super();
		//获取控制器
		this.controller=Controller.getInstance();
		this.controller.initStatus(10, 10000, 10);
		//初始化全局变量
		g_topHeight=new cc.TMXTiledMap(res.tileMap01_tmx).getContentSize().height;
		g_accessibleBottom=cc.director.getWinSize().height/2;
		g_accessibleTop=g_topHeight-g_accessibleBottom;
		//初始化物理引擎
		this.initPhysics();
		
		this.gameLayer=new cc.Layer();
		
		var backgroundLayer=new BackgroundLayer(this.space);
		var animationLayer=new AnimationLayer(this.space);
		var enemyLayer=new EnemyLayer(this.space);
		var foregroundLayer=new ForegroundLayer();
		
		
		
		this.gameLayer.addChild(backgroundLayer, 0, TagOfLayer.Background);
		this.gameLayer.addChild(animationLayer, 0, TagOfLayer.Animation);
		this.gameLayer.addChild(enemyLayer, 0, TagOfLayer.Enemy);
		this.addChild(this.gameLayer,0,TagOfLayer.gameLayer);
		this.addChild(foregroundLayer, 0, TagOfLayer.Foreground);
		
		//加入控制器中
		this.controller.BackgroundLayer=backgroundLayer;
		this.controller.AnimationLayer=animationLayer;
		this.controller.EnemyLayer=enemyLayer;
		this.controller.ForegroundLayer=foregroundLayer;
		this.controller.GameLayer=this.gameLayer;
		this.controller.GameScene=this;
		
		cc.log("CityScene is load");

		cc.director.resume();
		
		this.scheduleUpdate();
	},
	BlurCityScene:function(num){
//		//游戏层模糊处理
		this.controller.blur(num);
	}
});
