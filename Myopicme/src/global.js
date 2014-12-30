/*
 * 全局变量
 * 
 */

//固定量
var g_groundHeight=57;//地面高度
var g_startX=80;//开始的X坐标

var MAX_INT=4294967295;//最大INT数值

var space_grivaty=-350;//重力加速度

var max_speed=400;//人物最大速度
var jump_vel=450;//跳起冲量
var start_speed=150;//起始速度

//可变量（每次场景初始化时同时对数据进行初始化）

var g_topHeight;//地图顶端高度
var g_accessibleTop;//镜头跟进高度
var g_accessibleBottom;

var blurSize=0;

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

//全局变量操作类
if(typeof Global=="undefined"){
	var Global={};
}
Global.initGlobals=function(){
	blurSize=0;
	g_topHeight=new cc.TMXTiledMap(res.beginMap).getContentSize().height;
	g_accessibleBottom=cc.director.getWinSize().height/2;
	g_accessibleTop=g_topHeight-g_accessibleBottom;
}