/*
 * 全局变量
 * 
 */
var g_groundHeight=57;//地面高度
var g_startX=80;//开始的X坐标

var g_topHeight=0;//地图顶端高度
var g_accessibleTop=0;//镜头跟进高度
var g_accessibleBottom=0;

var MAX_INT=4294967295;//最大INT数值

var max_speed=400;//人物最大速度
var jump_vel=450;//跳起冲量
var start_speed=150;//起始速度

//各层的标记
if(typeof TagOfLayer=="undefined"){
	var TagOfLayer={};
	TagOfLayer.Animation=0;
	TagOfLayer.Background=1;
	TagOfLayer.Foreground=2;
	TagOfLayer.GameOver=3;
	TagOfLayer.Status=4;
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