/*
 * 游戏背景层
 * 
 */

var BackgroundLayer=cc.Layer.extend({
	map01:null,
	map02:null,
	space:null,
	spriteSheet:null,
	objects:[],
	mapSize:null,
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
	},

	init:function(){
		//载入地图
		this.map01=cc.TMXTiledMap.create(res.tileMap01_tmx);
		this.map02=cc.TMXTiledMap.create(res.tileMap02_tmx);
		//添加地图
		this.addChild(this.map01);
		//获取每个地图的大小
		this.mapSize=cc.size(this.map01.width,this.map01.height);
		this.map02.setPosition(cc.p(this.mapSize.width, 0));
		this.addChild(this.map02);
		cc.log("background is load");
		this.scheduleUpdate();
	},
	
	update:function(){
		var animationLayer=this.getParent().getChildByTag(TagOfLayer.Animation);
		var eye=animationLayer.getEye();
		this.checkAndReload(eye.width);
	},
	
	checkAndReload:function(eyeX){
		var newMapIndex=parseInt(eyeX/this.mapSize.width);
		if(this.mapIndex==newMapIndex){
			return false;
		}
		if(0==newMapIndex%2){
			this.map02.setPositionX(this.mapSize.width*(newMapIndex+1));
			this.loadObjects(this.map02, newMapIndex+1);
		}
		else{
			this.map01.setPositionX(this.mapSize.width*(newMapIndex+1));
			this.loadObjects(this.map01, newMapIndex+1);
		}
		this.mapIndex=newMapIndex;
		this.removeObjects(newMapIndex-1);
		return true;
	},
	//载入物体
	loadObjects:function(map,mapIndex){
		cc.log("1");
		var hinderGroup=map.getObjectGroup("object");
		var hinderArray=hinderGroup.getObjects();
		cc.log("2");
		for(var i=0;i<hinderArray.length;i++){
			cc.log("d");
			var hinder=new Hinder(this.spriteSheet,
					this.space,
					cc.p(hinderArray[i]["x"]+this.mapWidth*mapIndex,hinderArray[i]["y"]));
			hinder.mapIndex=mapIndex;
			this.objects.push(hinder);
		}
		cc.log("0");
	},
	//移除物体
	removeObjects:function(mapIndex){
		while((function(obj,index){
			for(var i=0;i<obj.length;i++){
				if(obj[i].mapIndex==index){
					obj[i].removeFromParent();
					obj.splice(i,1);
					return true;
				}
			}
			return false;
		})(this.objects,mapIndex));
	},
});