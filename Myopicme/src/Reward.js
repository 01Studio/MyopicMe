/*
 * 游戏修复器功能实现
 * 
 */

var Reward=cc.Class.extend({
	space:null,
	sprite:null,
	body:null,
	shapes:null,
	_mapIndex:0,
	//获取与设置所在地图的标记
	get mapIndex(){
		return this._mapIndex;
	},
	set mapIndex(index){
		this._mapIndex=index;
	},
	getSprite:function(){
		return this.sprite;
	},

	ctor:function(spriteSheet,space,pos,name){
		this.space=space;
		this.shapes=[];
		//加载图形
		var sprite=new cc.PhysicsSprite(name);
		var body = new cp.Body(Infinity, Infinity);
		body.nodeIdleTime = Infinity;
		body.p=cc.p(pos.x+sprite.getContentSize().width/2,pos.y+sprite.getContentSize().height/2);
		sprite.setBody(body);
		//设置物理形状
		var verts=[];
		var temp=[];
		switch(name){
		case "#repair.png":
			temp=[-16.00000,-15.50000,	
			      -16.50000,7.00000,	
			      -5.00000,14.50000,	
			      4.00000,14.50000,	
			      14.50000,8.00000,	
			      14.00000,-15.50000,];
			temp.collisionType=TagOfSprite.repair;
			verts.push(temp);
			break;
		case "#GlassesHouse.png":
			temp=[29.00000,23.50000,	
			      29.00000,-23.50000,	
			      -29.00000,-23.50000,	
			      -29.00000,23.50000,];
			temp.collisionType=TagOfSprite.glasses;
			temp.glassesType=TagOfGlasses.House;
			verts.push(temp);
			break;
		case "#GlassesStreet.png":
			temp=[29.00000,23.50000,	
			      29.00000,-23.50000,	
			      -29.00000,-23.50000,	
			      -29.00000,23.50000,];
			temp.collisionType=TagOfSprite.glasses;
			temp.glassesType=TagOfGlasses.Street;
			verts.push(temp);
			break;
		case "#GlassesRoad.png":
			temp=[29.00000,23.50000,	
			      29.00000,-23.50000,	
			      -29.00000,-23.50000,	
			      -29.00000,23.50000,];
			temp.collisionType=TagOfSprite.glasses;
			temp.glassesType=TagOfGlasses.Road;
			verts.push(temp);
			break;
		}
		for(var i=0;i<verts.length;i++){
			var shape=new cp.PolyShape(body, verts[i], cp.v(0, 0));
			shape.setCollisionType(verts[i].collisionType);
			shape.glassesType=verts[i].glassesType;
			shape.setSensor(true);
			this.space.addShape(shape);
			this.shapes.push(shape);
		}

		spriteSheet.addChild(sprite,1);

		this.body=body;
		this.sprite=sprite;
	},
	//用于从游戏中删除
	removeFromParent:function(){
		for(var i=0;i<this.shapes.length;i++){
			this.space.removeStaticShape(this.shapes[i]);
		}
		this.shapes=[];
		this.sprite.removeFromParent();
		this.sprite=null;
	},
	//获取Body，用于确定多边形
	getBody:function(){
		return this.body;
	}
});
