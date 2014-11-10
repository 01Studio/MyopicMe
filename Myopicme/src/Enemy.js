/*
 * 游戏敌人初始化
 * 
 */

var Enemy=cc.Class.extend({
	space:null,
	sprite:null,
	shape:null,
	_mapIndex:0,
	//获取与设置所在地图的标记
	get mapIndex(){
		return this._mapIndex;
	},
	set mapIndex(index){
		this._mapIndex=index;
	},

	ctor:function(spriteSheet,space,pos){
		this.space=space;
		//加载图形
		this.sprite=new cc.PhysicsSprite("#runner0.png");
		var body=new cp.StaticBody();
		body.setPos(pos);
		this.sprite.setBody(body);
		//设置物理形状
		this.shape=new cp.BoxShape(body,
				this.sprite.getContentSize().width,
				this.sprite.getContentSize().height);
		this.shape.setCollisionType(2);
		this.space.addStaticShape(this.shape);
		spriteSheet.addChild(this.sprite,1);
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