/*
 * 游戏背景层
 * 
 */

var BackgroundLayer=cc.Layer.extend({
	tileMap:[],//所有地图文件
	map01:null,
	map02:null,
	space:null,
	spriteSheet:null,
	mapSize:null,

	closedMap:[],	//不可随机地图
	openMap:[],		//可随机地图
	maxOfClosed:5,
	
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
		this.openMap=map_Resources;
	},

	init:function(){
		//TODO 载入地图  改：随机载入
		this.map01=cc.TMXTiledMap.create(res.tileMap01_tmx);
		this.map02=cc.TMXTiledMap.create(res.tileMap02_tmx);
		//添加地图
		this.addChild(this.map01);
		//获取每个地图的大小
		this.mapSize=cc.size(this.map01.getContentSize().width,this.map01.getContentSize().height);
		this.map02.setPosition(cc.p(this.mapSize.width, 0));
		this.addChild(this.map02);		
		cc.spriteFrameCache.addSpriteFrames(res.background_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.background_png);
		this.addChild(this.spriteSheet);
		
		this.scheduleUpdate();
	},
	
	update:function(){
		var animationLayer=this.getParent().getChildByTag(TagOfLayer.Animation);
		var eye=animationLayer.getEye();
		this.checkAndReload(eye.width);
		
	},
	//载入地图资源
	loadTileMaps:function(){
		for(var i=0;i<map_Resources.length;i++)
		var map=cc.TMXTiledMap.create(map_Resources[i]);
		this.tileMap.push(map);
	},
	//添加新地图
	checkAndReload:function(eyeX){
		var newMapIndex=parseInt(eyeX/this.mapSize.width);
		if(this.mapIndex==newMapIndex){
			return false;
		}
		
		//TODO 载入随机地图
//		var map=this.randomMap();
//
//		map.setPositionX(this.mapSize.width*(newMapIndex+1));
//		this.loadObjects(map, newMapIndex+1);
//		this.mapIndex=newMapIndex;
//		this.removeObjects(newMapIndex-1);
		
//		if(0==newMapIndex%2){
//			this.map02.setPositionX(this.mapSize.width*(newMapIndex+1));
//			this.loadObjects(this.map02, newMapIndex+1);
//		}
//		else{
//			this.map01.setPositionX(this.mapSize.width*(newMapIndex+1));
//			this.loadObjects(this.map01, newMapIndex+1);
//		}
//		this.mapIndex=newMapIndex;
//		this.removeObjects(newMapIndex-1);
		return true;
	},
	//随机地图
	//TODO
	randomMap:function(){
		var lengthOfMaps=this.openMap.length;
		var num=parseInt(Math.random()*lengthOfMaps);
		var map=this.openMap[num];
		this.openMap.slice(num,num+1);//从openMap中删除一个选定的Map
		this.closedMap.push(map);	//添加到closedMap中
		if(lengthOfMaps/2<this.maxOfClosed)
			lengthOfMaps=lengthOfMaps/2;
		this.closedMap.push(map);	//添加地图到closedMap
		if(this.closedMap.length>this.maxOfClosed){
			this.closedMap.slice(0, 1);	//从closedMap中删除第一项
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
			cc.log("load house");
			//TODO
			//随机组合生成房子或其他背景
			var house=new cc.Sprite("res/hourse.png");
			house.setAnchorPoint(0, 0);
			house.setPosition(backArray[i]["x"]+this.mapSize.width*mapIndex,backArray[i]["y"])
			house.mapIndex=mapIndex;
			this.addChild(house,100);
			//this.objects.push(house);
		}
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
	}
});