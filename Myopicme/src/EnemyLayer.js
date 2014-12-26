/*
 * 游戏敌人初始化
 * 
 */

var EnemyLayer=cc.Layer.extend({
	space:null,
	sprite:null,
	body:null,
	shape:null,
	_mapIndex:0,
	//获取与设置所在地图的标记
	get mapIndex(){
		return this._mapIndex;
	},
	set mapIndex(index){
		this._mapIndex=index;
	},

	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
	},
	init:function(){
		//加载图形
		var winSize=cc.director.getWinSize();
		cc.spriteFrameCache.addSpriteFrames("res/alien.plist");
		this.spriteSheet=new cc.SpriteBatchNode("res/alien.png");
		this.addChild(this.spriteSheet);
		
		//添加物理绑定
		this.sprite=new cc.PhysicsSprite("#alien_0.png");
		var contentSize=this.sprite.getContentSize();
		//cp.Body(质量,cp.momentForBox(转动惯量,宽,高)); Infinity无限大，使人物无法旋转
		this.body=new cp.Body(1,cp.momentForBox(Infinity, contentSize.width, contentSize.height));
		this.body.p=cc.p(winSize.width-100,100);
		//添加冲量
		//applyImpulse(cp.v(x轴冲力,y轴冲力),cp.v(角加速度,弹力));
		this.body.applyImpulse(cp.v(start_speed, 0),cp.v(0, 0));
		this.space.addBody(this.body);
		this.spriteSheet.addChild(this.sprite);
		//将物理计算与贴图结合
		this.shape=new cp.BoxShape(this.body,contentSize.width-14,contentSize.height);
		this.shape.setCollisionType(TagOfSprite.enemy);
		this.space.addShape(this.shape);
		this.sprite.setBody(this.body);

		this.scheduleUpdate();
		
	},
	update:function(){
		var animationLayer=this.getParent().getChildByTag(TagOfLayer.Animation);
		this.body.setVel(animationLayer.body.getVel());
	},
	
	
	//设置enemy的基本属性
	//TODO
	initProperty:function(){
	},
	//enemy被攻击后改变位置
	//TODO
	changePlace:function(){
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