/**
 * 游戏场景模板
 */
SceneTemplate=cc.Scene.extend({
	tagOfScene:null,//关卡标记
	space:null,//游戏空间
	gameLayer:null,//游戏层
	controller:null,//控制中心
	bulletsToRemove:[],//准备删除的子弹，AnimationLayer中
	shapesToRemove:[],//准备删除的其他物体，BackgroundLayer中
	
	ctor:function(tag){
		this.tagOfScene=tag;
		this._super();
	},
	//启动runScene时调用
	onEnter:function(){
		this._super();
		//获取控制器
		this.controller=Controller.getNewInstance();
		this.controller.initStatus(start_glass,start_time,start_boss);
		//初始化全局变量
		InitGlobals(this.tagOfScene);
		//初始化物理引擎
		this.initPhysics();

		//定义各游戏层
		this.gameLayer=new cc.Layer();
		var backgroundLayer=new BackgroundLayer(this.space,this.tagOfScene);
		var animationLayer=new AnimationLayer(this.space);
		var enemyLayer=new EnemyLayer(this.space);
		var foregroundLayer=new ForegroundLayer();

		//添加到场景中
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

		this.bulletsToRemove=[];
		this.shapesToRemove=[];

		cc.log("GameScene is load");

		this.scheduleUpdate();
	},
	
	//初始化物理引擎
	initPhysics:function(){
		this.space=new cp.Space();
		this.space.gravity=cp.v(0, space_gravity);//设置重力
		//边界线
		//下界
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(MAX_INT, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		//上界
		var wallTop = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_topHeight),// start point
				cp.v(MAX_INT, g_topHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallTop);

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

	//玩家与障碍
	collision_runner_hinder:function(arbiter,space){
		cc.log("a collision happen between runner with hinder");
	},
	//玩家与修复器
	collision_runner_repair:function(arbiter,space){
		cc.log("a collision happen between runner with repair");
		this.controller.addBaseScore(score_repair);
		this.controller.repair();
		var shapes=arbiter.getShapes();
		this.shapesToRemove.push(shapes[1]);
	},
	//玩家与敌人
	collision_runner_enemy:function(arbiter,space){
	},
	//激光与障碍
	collision_xray_hinder:function(arbiter,space){
		cc.log("a collision happen between xray with hinder");
		this.controller.addBaseScore(score_hinder);
		var shapes=arbiter.getShapes();
		this.bulletsToRemove.push(shapes[0]);
		this.shapesToRemove.push(shapes[1]);
	},
	//激光与敌人
	collision_xray_enemy:function(arbiter,space){
		cc.log("a collision happen between xray with enemy");
		this.controller.addBaseScore(score_boss);
		this.controller.hitBoss();
		var shapes=arbiter.getShapes();
		this.bulletsToRemove.push(shapes[0]);
	},


	update:function(dt){
		//TODO 物理世界处理，dt值需重新设置，否则不稳定
		this.space.step(dt);
		//镜头跟随人物移动
		var eye=this.controller.AnimationLayer.getEye();
		this.gameLayer.setPositionX(-eye.width);
		
		//设置地图位置，使得人物在地图中位置合理
		if(eye.height<g_accessibleTop){
			if(eye.height>g_accessibleBottom)
				this.gameLayer.setPositionY(-eye.height+g_accessibleBottom);
			else
				this.gameLayer.setPositionY(0);
		}
		//删除击中的子弹
		for(var i=0;i<this.bulletsToRemove.length;i++){
			var shape=this.bulletsToRemove[i];
			this.controller.AnimationLayer.removeObjectByShape(shape);
		}
		this.bulletsToRemove=[];
		//删除击中的障碍
		for(var i=0;i<this.shapesToRemove.length;i++){
			var shape=this.shapesToRemove[i];
			this.controller.BackgroundLayer.removeObjectByShape(shape);
		}
		this.shapesToRemove=[];

		//计时，到时未击败敌人，游戏结束
		this.controller.timeNow-=dt;
		if(this.controller.timeNow<0){
			this.controller.askForGameOver();
		}
		else{
			this.controller.update(parseInt(eye.width.toFixed(0)));
		}
	},
	/**
	 * 
	 */
	setCustom:function(){
		
	}
});
