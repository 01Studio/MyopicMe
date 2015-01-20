/**
 * 游戏场景模板
 */
PlayingScene=cc.Scene.extend({
	tagOfScene:null,//关卡标记
	space:null,//游戏空间
	gameLayer:null,//游戏层
	controller:null,//控制中心
	bulletsToRemove:[],//准备删除的子弹，AnimationLayer中
	shapesToRemove:[],//准备删除的其他物体，BackgroundLayer中
	
	glassesRepair:null,
	
	ctor:function(tag){
		this._super();
		this.tagOfScene=tag;
	},
	//启动runScene时调用
	onEnter:function(){
		this._super();
		//初始化
		var manager=new StorageManager();
		var key=manager.getGlassesUsingKey();
		var glassesRepaired=manager.getGlassesRepaired(key);
		var time=SceneMaps.find(this.tagOfScene).find("time");
		
		this.bulletsToRemove=[];
		this.shapesToRemove=[];
		this.glassesRepair=new Hash();

		//获取控制器
		this.controller=Controller.getNewInstance();
		this.controller.GameScene=this;
		this.controller.initStatus(glassesRepaired,time,
				GlassesMaps.find(this.tagOfScene).find("fixed")-manager.getGlassesRepaired(this.tagOfScene),
				GlassesMaps.find(key).find("attack"));
		//初始化全局变量
		InitGlobals(this.tagOfScene);
		//初始化物理引擎
		this.initPhysics();
		//初始化各游戏层，并加入控制器中
		this.gameLayer=new cc.Layer();
		this.addChild(this.gameLayer,0);
		this.controller.GameLayer=this.gameLayer;
		
		backgroundLayer=new BackgroundLayer(this.space,this.tagOfScene);
		this.gameLayer.addChild(backgroundLayer, 0);
		this.controller.BackgroundLayer=backgroundLayer;
		
		var animationLayer=new AnimationLayer(this.space);
		this.gameLayer.addChild(animationLayer, 0);
		this.controller.AnimationLayer=animationLayer;
		
		var enemyLayer=new EnemyLayer(this.space);
		this.gameLayer.addChild(enemyLayer, 0);
		this.controller.EnemyLayer=enemyLayer;
		
		var foregroundLayer=new ForegroundLayer();
		this.addChild(foregroundLayer, 0);
		this.controller.ForegroundLayer=foregroundLayer;
		
		cc.log("GameScene is load");

		this.scheduleUpdate();
	},
	onExit:function(){
		this._super();
		
	},
	
	/**
	 * 初始化物理引擎
	 */
	initPhysics:function(){
		this.space=new cp.Space();
		this.space.gravity=cp.v(0, space_gravity);//设置重力
		//边界线
		//下界
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(MAX_INT, g_groundHeight),// MAX INT:4294967295
				10);// thickness of wall,防止飞出去
		this.space.addStaticShape(wallBottom);
		//上界
		var wallTop = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_topHeight),// start point
				cp.v(MAX_INT, g_topHeight),// MAX INT:4294967295
				10);// thickness of wall
		this.space.addStaticShape(wallTop);

		this.space.addCollisionHandler(TagOfSprite.runner,TagOfSprite.hinder,
				this.collision_runner_hinder.bind(this),this.waterPreSolve,null,null);
		this.space.addCollisionHandler(TagOfSprite.runner,TagOfSprite.repair,
				this.collision_runner_repair.bind(this),null,null,null);
		this.space.addCollisionHandler(TagOfSprite.xray,TagOfSprite.enemy,
				this.collision_xray_enemy.bind(this),null,null,null);
		this.space.addCollisionHandler(TagOfSprite.xray,TagOfSprite.hinder,
				this.collision_xray_hinder.bind(this),null,null,null);
		this.space.addCollisionHandler(TagOfSprite.runner,TagOfSprite.glasses,
				this.collision_runner_glasses.bind(this),null,null,null);
	},

	//玩家与障碍
	collision_runner_hinder:function(arbiter,space){
		cc.log("a collision happen between runner with hinder");
		return true;//接着执行下一碰撞处理函数
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
	//玩家和眼镜碎片
	collision_runner_glasses:function(arbiter,space){
		cc.log("a collision happen between runner with glasses");
		this.controller.addBaseScore(score_glasses);
		var shapes=arbiter.getShapes();
		this.shapesToRemove.push(shapes[1]);
		var glassesType=shapes[1].glassesType;
		var value=this.glassesRepair.find(glassesType);
		if(value==null){
			this.glassesRepair.add(glassesType, 1);
		}
		else{
			value+=1;
			this.glassesRepair.update(glassesType, value);
		}
		this.controller.level--;
		if(this.controller.level==0){
			this.controller.askForGameOver(TagOfGameOver.win);
		}
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
			this.controller.askForGameOver(TagOfGameOver.timeOver);
		}
		else{
			this.controller.update(parseInt(eye.width.toFixed(0)));
		}
	},
	//web专用staticBody碰撞处理
	//TODO 整理，缩减。
	waterPreSolve : function(arb, space, ptr) {
		var FLUID_DENSITY = 0.00014;
		var FLUID_DRAG = 2.0;
		var shapes = arb.getShapes();
		var water = shapes[0];
		var poly = shapes[1];

		var body = poly.getBody();

		// Get the top of the water sensor bounding box to use as the water level.
		var level = water.getBB().t;

		// Clip the polygon against the water level
		var count = poly.getNumVerts();

		var clipped = [];

		var j=count-1;
		for(var i=0; i<count; i++) {
			var a = body.local2World( poly.getVert(j));
			var b = body.local2World( poly.getVert(i));

			if(a.y < level){
				clipped.push( a.x );
				clipped.push( a.y );
			}

			var a_level = a.y - level;
			var b_level = b.y - level;

			if(a_level*b_level < 0.0){
				var t = Math.abs(a_level)/(Math.abs(a_level) + Math.abs(b_level));

				var v = cp.v.lerp(a, b, t);
				clipped.push(v.x);
				clipped.push(v.y);
			}
			j=i;
		}

		// Calculate buoyancy from the clipped polygon area
		var clippedArea = cp.areaForPoly(clipped);

		var displacedMass = clippedArea*FLUID_DENSITY;
		var centroid = cp.centroidForPoly(clipped);
		var r = cp.v.sub(centroid, body.getPos());

		var dt = space.getCurrentTimeStep();
		var g = space.gravity;

		// Apply the buoyancy force as an impulse.
		body.applyImpulse( cp.v.mult(g, -displacedMass*dt), r);

		// Apply linear damping for the fluid drag.
		var v_centroid = cp.v.add(body.getVel(), cp.v.mult(cp.v.perp(r), body.w));
		var k = 1; //k_scalar_body(body, r, cp.v.normalize_safe(v_centroid));
		var damping = clippedArea*FLUID_DRAG*FLUID_DENSITY;
		var v_coef = Math.exp(-damping*dt*k); // linear drag
//		var v_coef = 1.0/(1.0 + damping*dt*cp.v.len(v_centroid)*k); // quadratic drag
		body.applyImpulse( cp.v.mult(cp.v.sub(cp.v.mult(v_centroid, v_coef), v_centroid), 1.0/k), r);

		// Apply angular damping for the fluid drag.
		var w_damping = cp.momentForPoly(FLUID_DRAG*FLUID_DENSITY*clippedArea, clipped, cp.v.neg(body.p));
		body.w *= Math.exp(-w_damping*dt* (1/body.i));

		return true;
	}
});
