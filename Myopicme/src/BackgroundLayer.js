/*
 * 游戏背景层
 * 
 */

var BackgroundLayer=cc.Layer.extend({
	controller:null,
	
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
		cc.log("backgroundLayer inited");
	},
	onExit:function(){
		this._super();
	},

	init:function(){
		this.controller=Controller.getInstance();
		//载入第一张地图
		var beginMap=new cc.TMXTiledMap(res.beginMap);
		//添加地图
		this.addChild(beginMap);
		this.closedMapKey.push("beginMap");
		this.closedMap.push(beginMap);
		this.controller.addToBlurList(beginMap.children[0]);
		//获取每个地图的大小
		this.mapSize=cc.size(beginMap.getContentSize().width,beginMap.getContentSize().height);
		
		cc.spriteFrameCache.addSpriteFrames(res.objects_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.objects_png);
		this.addChild(this.spriteSheet,1);
		
		this.closedMapKey=[],//不可随机地图
		this.closedMap=[],
		this.objects=[],
		this.openMapKey=map_Resources.concat();//数组拷贝
		
		//加入模糊队列
		this.controller.addToBlurList(this.spriteSheet);
		
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
		
		//加入模糊队列
		this.controller.addToBlurList(map.children[0]);
		
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
		//障碍物
		var hinderGroup=map.getObjectGroup("object");
		var hinderArray=hinderGroup.getObjects();
		for(var i=0;i<hinderArray.length;i++){
			var hinder=new Hinder(this.spriteSheet,
					this.space,
					cc.p(hinderArray[i]["x"]+this.mapSize.width*mapIndex,hinderArray[i]["y"]),
					hinderArray[i]["name"]);
			hinder._mapIndex=mapIndex;
			this.objects.push(hinder);
		};
		//修复器
		var repairGroup=map.getObjectGroup("repair");
		var repairArray=repairGroup.getObjects();
		for(var i=0;i<repairArray.length;i++){
			var repair=new Repair(this.spriteSheet,
					this.space,
					cc.p(repairArray[i]["x"]+this.mapSize.width*mapIndex,repairArray[i]["y"]),
					repairArray[i]["name"]);
			repair._mapIndex=mapIndex;
			this.objects.push(repair);
		};
	},
	//移除物体
	removeObjects:function(mapIndex){
		while((function(obj,index){
			for(var i=0;i<obj.length;i++){
				if(obj[i]._mapIndex==index){
					obj[i].removeFromParent();
					obj.splice(i,1);
					//obj =  obj.slice(0,i).concat(obj.slice(i+1,obj.length));//将数组从新拼接
					/*
					　　　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
					　　　　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
					　　 　　　　　　组成的新数组，这中间，刚好少了第n项。
					　　　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
					 */
					return true;
				}
			}
			return false;
		})(this.objects,mapIndex));
	}
});