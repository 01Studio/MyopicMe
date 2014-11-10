/*
 * 游戏状态层
 * 
 */

var StatusLayer=cc.Layer.extend({
	hero:null,//主角头像
	glasses:null,//眼镜状况图标
	glasses_state:0,//眼镜状况计量
	road:null,//地图长度图标，为路程进度，在进度完成之前主角必须杀死enemy，夺回眼镜
	road_state:0,//路程剩余长度计量
	
	ctor:function(){
		this._super();
		this.init();
	},

	init:function(){

	},
	//改变眼镜状况
	//TODO
	setGlasses:function(){
		//改变ForegroundLayer
	},
	//改变路程长度
	setRoad:function(){
		
	}
});