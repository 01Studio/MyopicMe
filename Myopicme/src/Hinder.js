/*
 * 游戏障碍物功能实现
 * 
 */

var Hinder=cc.Class.extend({
	space:null,
	sprite:null,
	shape:null,
	_mapIndex:0,
	get mapIndex(){
		return this._mapIndex;
	},
	set mapIndex(index){
		this._mapIndex=index;
	},
	
	ctor:function(spriteSheet,space,pos){
		this.space=space;
		this.sprite=cc.PhysicsSprite.create("#rock.png");
		var body=new cp.StaticBody();
		body.setPos(pos);
		this.sprite.setBody(body);
		
		this.shape=new cp.BoxShape(body,
				this.sprite.getContentSize().width,
				this.sprite.getContentSize().height);
		this.shape.setCollisionType(1);
		this.space.addStaticShape(this.shape);
		spriteSheet.addChild(this.sprite,1);
	},

	removeFromParent:function(){
		this.space.removeStaticShape(this.shape);
		this.shape=null;
		this.sprite.removeFromParent();
		this.sprite=null;
	},

	getShape:function(){
		return this.shape;
	}
});