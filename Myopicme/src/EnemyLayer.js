/*
 * 游戏敌人初始化
 * 
 */
var EnemyLayer=cc.Layer.extend({
	controller:null,
	
	space:null,
	sprite:null,
	spriteSheet:null,
	body:null,
	shape:null,
	
	high:100,
	_reward:0,
	
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
		cc.log("enemyLayer inited");
	},
	init:function(){
		this.controller=Controller.getInstance();
		//加载图形
		var winSize=cc.director.getWinSize();
		cc.spriteFrameCache.addSpriteFrames(res.alien_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.alien_png);
		this.addChild(this.spriteSheet);
		
		//添加物理绑定
		this.sprite=new cc.PhysicsSprite("#alien_1.png");
		var contentSize=this.sprite.getContentSize();
		//cp.Body(质量,cp.momentForBox(转动惯量,宽,高)); Infinity无限大，使人物无法旋转
		this.body=new cp.Body(1,cp.momentForBox(Infinity, contentSize.width, contentSize.height));
		this.body.p=cc.p(winSize.width-100,this.high);
		//添加浮力，使敌人高度不变
		this.body.applyForce(cp.v(0, -space_gravity),cp.v(0, 0));
		//添加冲量
		//applyImpulse(cp.v(x轴冲力,y轴冲力),cp.v(角加速度,弹力));
		this.body.applyImpulse(cp.v(start_speed, 0),cp.v(0, 0));
		this.space.addBody(this.body);
		this.spriteSheet.addChild(this.sprite);
		//将物理计算与贴图结合
		this.shape=new cp.BoxShape(this.body,contentSize.width-14,contentSize.height);
		this.shape.setCollisionType(TagOfSprite.enemy);
		this.shape.setSensor(true);
		this.space.addShape(this.shape);
		this.sprite.setBody(this.body);
		this.scheduleUpdate();
		
	},
	update:function(){
		var animationLayer=this.controller.AnimationLayer;
		//使Enemy位置固定
		var vel=animationLayer.body.getVel();
		vel.y=0;
		this.body.setVel(vel);
	},
	//敌人被攻击后采取的行动 更换位置+可能掉装备
	postHited:function(){
		this.randomPlace();
		this.controller.leftEquipment(this.sprite.getPosition());
	},
	//enemy被攻击后改变位置
	//TODO 需要更加合理的算法
	randomPlace:function(){
		var high=Math.random()*g_topHeight;
		if(high<g_groundHeight){
			high=g_groundHeight;
		}
		else if((high+this.sprite.getContentSize().height)>g_topHeight){
			high=g_topHeight-this.sprite.getContentSize().height;
		}
		var _high=this.high;
		this.high=high;
		var ch=this.high-_high;
		this.sprite.runAction(cc.moveBy(1, cc.p(0,ch)));
	},
	//用于从游戏中删除
	removeFromParent:function(){
		this.space.removeStaticShape(this.shape);
		this.shape=null;
		this.sprite.removeFromParent();
		this.sprite=null;
	},
	//获取形状
	getShape:function(){
		return this.shape;
	},
});