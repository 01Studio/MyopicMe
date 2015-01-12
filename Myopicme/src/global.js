/*
 * 全局变量
 * 
 */

//固定量
var g_groundHeight=57;//地面高度
var g_startX=80;//开始的X坐标

var MAX_INT=4294967295;//最大INT数值

var space_gravity=-350;//重力加速度
var max_speed=400;//人物最大速度
var jump_vel=450;//跳起冲量
var start_speed=150;//起始速度

var score_boss=1000;//击打boss得分
var score_hinder=100;//击打障碍得分
var score_repair=500;//获得修复器得分

var start_glass=10;//初始眼镜值
var start_time=30;//初始剩余时间，秒
var start_boss=1;//boss初始生命值

//可变量（每次场景初始化时同时对数据进行初始化）
var g_topHeight;//地图顶端高度
var g_accessibleTop;//镜头跟进高度
var g_accessibleBottom;//地面高度


//各个场景的标记
if(typeof TagOfScene=="undefined"){
	var TagOfScene={};
	TagOfScene.CityScene=0;
	TagOfScene.CountryScene=1;
	TagOfScene.OutSpaceScene=2;
}
//各层的标记
if(typeof TagOfLayer=="undefined"){
	var TagOfLayer={};
	TagOfLayer.Animation=0;
	TagOfLayer.Background=1;
	TagOfLayer.Enemy=2;
	TagOfLayer.Foreground=3;
	TagOfLayer.GameOver=4;
	TagOfLayer.Status=5;
	TagOfLayer.gameLayer=6;
}
//跑步状态的标记
if(typeof RunnerStat=="undefined"){
	var RunnerStat={};
	RunnerStat.running=0;
	RunnerStat.jumpUp=1;
	RunnerStat.jumpDown=2;
}
//物体类型的标记，用于碰撞检测
if(typeof TagOfSprite=="undefined"){
	var TagOfSprite={};
	TagOfSprite.runner=0;//主角
	TagOfSprite.hinder=1;//障碍
	TagOfSprite.repair=2;//修复器
	TagOfSprite.enemy=3;//敌人
	TagOfSprite.xray=4;//激光
}
//眼镜索引 .name 眼睛名字; .repaired 最大修复值
if(typeof TagOfGlass=="undefined"){
	var TagOfGlass={
			Def:{},
			Night:{},
			Desert:{},
			Gold:{},
	};
	TagOfGlass.Def.name="Glass_def";
	TagOfGlass.Def.repaired=10;
	TagOfGlass.Night.name="Glass_night";
	TagOfGlass.Night.repaired=20;
	TagOfGlass.Desert.name="Glass_desert";
	TagOfGlass.Desert.repaired=30;
	TagOfGlass.Gold.name="Glass_gold";
	TagOfGlass.Gold.repaired=50;
}
//游戏结束方式
if(typeof TagOfGameOver=="undefined"){
	var TagOfGameOver={};
	TagOfGameOver.win=0;
	TagOfGameOver.hit=1;
	TagOfGameOver.timeOver=2;
	TagOfGameOver.glassBroken=3;
}

//全局变量操作类
InitGlobals=function(tagOfScene){	
	g_topHeight=new cc.TMXTiledMap(res.beginMap.find(tagOfScene)).getContentSize().height;
	g_accessibleBottom=cc.director.getWinSize().height/2;
	g_accessibleTop=g_topHeight-g_accessibleBottom;
}