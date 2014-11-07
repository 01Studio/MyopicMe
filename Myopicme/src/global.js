/*
 * 全局变量
 * 
 */
var g_groundHeight=57;
var g_startX=80;


if(typeof TagOfLayer=="undefined"){
	var TagOfLayer={};
	TagOfLayer.Animation=0;
	TagOfLayer.Background=1;
	TagOfLayer.Fire=2;
	TagOfLayer.GameOver=3;
	TagOfLayer.Status=4;
}

if(typeof RunnerStat=="undefined"){
	var RunnerStat={};
	RunnerStat.running=0;
	RunnerStat.jumpUp=1;
	RunnerStat.jumpDown=2;
}