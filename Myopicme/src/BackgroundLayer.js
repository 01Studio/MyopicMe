/*
 * 游戏背景层
 * 
 */

var BackgroundLayer=cc.Layer.extend({
	map01:null,
	map02:null,
	space:null,
	spriteSheet:null,
	mapSize:null,

	closedMapKey:[],//不可随机地图
	openMapKey:[],	//可随机地图
	closedMap:[],
	objects:[],
	maxOfClosed:5,
	
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
		this.openMapKey=map_Resources;
	},

	init:function(){
		//载入第一张地图
		this.map01=new cc.TMXTiledMap(res.tileMap01_tmx);
		//添加地图
		this.addChild(this.map01);
		//获取每个地图的大小
		this.mapSize=cc.size(this.map01.getContentSize().width,this.map01.getContentSize().height);
		
		cc.spriteFrameCache.addSpriteFrames(res.houseAndHinder_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.houseAndHinder_png);
		this.addChild(this.spriteSheet,1);
		
		this.scheduleUpdate();
	},
	
	update:function(){
		var animationLayer=this.getParent().getChildByTag(TagOfLayer.Animation);
		var eye=animationLayer.getEye();
		this.checkAndReload(eye.width);
		
	},
	//添加新地图
	checkAndReload:function(eyeX){
		var newMapIndex=parseInt(eyeX/this.mapSize.width);
		if(this.mapIndex==newMapIndex){
			return false;
		}
		
		//TODO 载入随机地图
		var map=this.randomMap();
		map.setPosition(this.mapSize.width*(newMapIndex+1),0);
		this.addChild(map,0);
		this.loadObjects(map, newMapIndex+1);
		this.mapIndex=newMapIndex;
		this.removeObjects(newMapIndex-1);
				
		return true;
	},
	//随机地图
	//TODO
	randomMap:function(){
		var lengthOfMaps=this.openMapKey.length;
		var num=parseInt(Math.random()*lengthOfMaps);
		var mapKey=this.openMapKey[num];
		var map=new cc.TMXTiledMap(tileMapsOfCity[mapKey]);
		this.openMapKey.splice(num,1);	//从openMapKey中删除一个选定的Map
		this.closedMapKey.push(mapKey);
		this.closedMap.push(map);	//添加到closedMap中
//		if(lengthOfMaps/2<this.maxOfClosed)
//			lengthOfMaps=lengthOfMaps/2;
//		this.closedMap.push(map);	//添加地图到closedMap
		if(this.closedMapKey.length>this.maxOfClosed){
			this.openMapKey.push(this.closedMapKey[0]);
			this.closedMapKey.splice(0, 1);
			this.closedMap[0].removeFromParent();
			this.closedMap.splice(0, 1);	//从closedMap中删除第一项
		}
		return map;
	},
	//载入物体
	loadObjects:function(map,mapIndex){
		var hinderGroup=map.getObjectGroup("object");
		var hinderArray=hinderGroup.getObjects();
		for(var i=0;i<hinderArray.length;i++){
			var hinder=new Hinder(this.spriteSheet,
					this.space,
					cc.p(hinderArray[i]["x"]+this.mapSize.width*mapIndex,hinderArray[i]["y"]),
					1);
			hinder._mapIndex=mapIndex;
			this.objects.push(hinder);
		};
		var back=map.getObjectGroup("backgroundObject");
		var backArray=back.getObjects();
		for(var i=0;i<backArray.length;i++){
			//TODO
			//随机组合生成房子或其他背景
			var house=new cc.Sprite("#hourse.png");
			house.setAnchorPoint(0, 0);
			house.setPosition(backArray[i]["x"]+this.mapSize.width*mapIndex,backArray[i]["y"])
			house._mapIndex=mapIndex;
			this.spriteSheet.addChild(house,100);
			this.objects.push(house);
		}
	},
	//移除物体
	removeObjects:function(mapIndex){
		while((function(obj,index){
			for(var i=0;i<obj.length;i++){
				if(obj[i]._mapIndex==index){
					obj[i].removeFromParent();
					obj.splice(i,1);
					return true;
				}
			}
			return false;
		})(this.objects,mapIndex));
	}
});