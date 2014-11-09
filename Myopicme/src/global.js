/*
 * 全局变量
 * 
 */
var g_groundHeight=57;//地面高度
var g_startX=80;//开始的X坐标

var g_topHeight=0;//地图顶端高度
var g_accessibleTop=0;//镜头跟进高度
var g_accessibleBottom=0;

//各层的标记
if(typeof TagOfLayer=="undefined"){
	var TagOfLayer={};
	TagOfLayer.Animation=0;
	TagOfLayer.Background=1;
	TagOfLayer.Fire=2;
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
	TagOfSprite.hinder=0;//障碍
	TagOfSprite.glass=1;//眼镜
	TagOfSprite.repair=2;//修复器
	TagOfSprite.enemy=3;//敌人
	TagOfSprite.light=4;//激光
}