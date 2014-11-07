/*
 * 游戏障碍物功能实现
 * 
 */

var Hinder=cc.Class.extend({
	space:null,
	sprite:null,
	shape:null,
	mapIndex:0,
	ctor:function(spriteSheet,space,pos){
		this.space=space;
		
		this.sprite=cc.PhysicsSprite.create("#rock.png");

		var body=new cp.StaticBody();
		body.setPos(pos);
		this.sprite.setBody(body);

		this.shape=new cp.BoxShape(body,
				this.sprite.getContentSize().width,
				this.sprite.getContentSize().height);
		this.space.addStaticShape(this.shape);
		spriteSheet.addChild(this.sprite,1);
	}
});