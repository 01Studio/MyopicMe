/*
 * 游戏障碍物功能实现
 * 
 */

var Hinder=cc.Class.extend({
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
		case "#rock.png":
			temp=[-24.00000,-22.00000,	
			      -21.00000,-14.00000,	
			      25.00000,12.00000,	
			      26.00000,-22.00000,];
			verts.push(temp);
			temp=[-21.00000,-14.00000,	
			      -24.00000,-22.00000,	
			      -25.00000,-15.00000,];
			verts.push(temp);
			temp=[28.00000,22.00000,	
			      -22.00000,0.00000,	
			      -28.00000,21.00000,];
			verts.push(temp);
			temp=[25.00000,12.00000,	
			      28.00000,22.00000,	
			      28.00000,12.00000,];
			verts.push(temp);
			temp=[28.00000,22.00000,	
			      25.00000,12.00000,	
			      -21.00000,-14.00000,	
			      -22.00000,0.00000,];
			verts.push(temp);
			break;
			
		case "#rabish.png":
			temp=[-33.50000,27.50000,	
			      -26.50000,32.50000,	
			      -9.00000,36.00000,	
			      -8.00000,36.00000,	
			      31.50000,29.50000,	
			      10.00000,-35.00000,	
			      -8.00000,-35.00000,	
			      -32.00000,-27.00000,];
			verts.push(temp);
			temp=[10.00000,-35.00000,	
			      31.50000,29.50000,	
			      30.00000,-28.00000,];
			verts.push(temp);
			temp=[31.50000,29.50000,	
			      -8.00000,36.00000,	
			      18.00000,35.00000,];
			verts.push(temp);
			break;
			
		case "#light.png":
			temp=[-130.00000,253.00000,	
			      -18.00000,223.00000,	
			      -4.50000,186.00000,	
			      -151.00000,243.00000,];
			verts.push(temp);
			temp=[15.00000,223.00000,	
			      -4.50000,186.00000,	
			      -18.00000,223.00000,];
			verts.push(temp);
			temp=[133.00000,251.00000,	
			      148.00000,240.00000,	
			      5.00000,186.00000,	
			      -4.50000,186.00000,	
			      15.00000,223.00000,];
			verts.push(temp);
			temp=[-4.50000,186.00000,	
			      5.00000,186.00000,	
			      8.00000,-250.00000,	
			      -9.00000,-250.00000,];
			verts.push(temp);
			break;
		}
		for(var i=0;i<verts.length;i++){
			var shape=new cp.PolyShape(body, verts[i], cp.v(0, 0));
			shape.setCollisionType(TagOfSprite.hinder);
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