/*
 * 游戏修复器功能实现
 * 
 */

var Reward=cc.Class.extend({
	space:null,
	sprite:null,
	body:null,
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
		case "#Def.png":
			temp=[29.00000,23.50000,	
			      29.00000,-23.50000,	
			      -29.00000,-23.50000,	
			      -29.00000,23.50000,];
			temp.collisionType=TagOfSprite.glass;
			temp.glassType=TagOfGlass.Def;
			verts.push(temp);
			break;
		case "#Night.png":
			temp=[29.00000,23.50000,	
			      29.00000,-23.50000,	
			      -29.00000,-23.50000,	
			      -29.00000,23.50000,];
			temp.collisionType=TagOfSprite.glass;
			temp.glassType=TagOfGlass.Night;
			verts.push(temp);
			break;
		}
		for(var i=0;i<verts.length;i++){
			var shape=new cp.PolyShape(body, verts[i], cp.v(0, 0));
			shape.setCollisionType(verts[i].collisionType);
			shape.glassType=verts[i].glassType;
			shape.setSensor(true);
			this.space.addShape(shape);
		}

		spriteSheet.addChild(sprite,1);

		this.body=body;
		this.sprite=sprite;
	},
	//用于从游戏中删除
	removeFromParent:function(){
		this.body.eachShape(this.deleteShape);
		this.sprite.removeFromParent();
		this.sprite=null;
	},
	//删除所有shape
	deleteShape:function(shape){
		shape.space.removeStaticShape(shape);
		shape=null;
	}
	,
	//获取Body
	getBody:function(){
		return this.body;
	}
});
