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
		var animFrames=[];
		for(var i=0;i<8;i++){
			var str="coin"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation=cc.Animation.create(animFrames,0.2);
		var action=cc.RepeatForever.create(cc.Animate.create(animation));

		this.sprite=cc.PhysicsSprite.create("#coin0.png");

		var radius=0.95*this.sprite.getContentSize().width/2;
		var body=new cp.StaticBody();
		body.setPos(pos);
		this.sprite.setBody(body);

		this.shape=new cp.CircleShape(body,radius,cp.vzero);
		this.shape.setCollisionType(1);
		this.shape.setSensor(true);

		this.space.addShape(this.shape);

		this.sprite.runAction(action);
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