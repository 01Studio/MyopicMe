/**
 * 全局变量 与资源文件
 */
// 固定量
var g_groundHeight=80;//地面高度
var g_startX=80;//开始的X坐标
var MAX_INT=4294967295;//最大INT数值

var space_gravity=-350;//重力加速度
var max_speed=400;//人物最大速度
var jump_vel=450;//跳起冲量
var start_speed=150;//起始速度
var bullet_speed=1000;//子弹速度

var score_boss=1000;//击打boss得分
var score_hinder=100;//击打障碍得分
var score_repair=500;//获得修复器得分
var score_glass=3000;//获得镜片得分


//每次场景初始化时同时对数据进行初始化
var g_topHeight;//地图顶端高度
var g_accessibleTop;//镜头跟进高度
var g_accessibleBottom;//地面高度

//音乐及音效控制
var audioEngine=cc.audioEngine;

//场景索引 
if(typeof TagOfScene=="undefined"){
	var TagOfScene={};
	TagOfScene.CityScene=0;
	TagOfScene.CountryScene=1;
	TagOfScene.OutSpaceScene=2;
}
//初始化各场景
var CitySceneMap=new Hash();
var CountrySceneMap=new Hash();
var OutSpaceMap=new Hash();
var SceneMaps=new Hash();
CitySceneMap.add("name","cityScene");
CitySceneMap.add("time", 30);
CountrySceneMap.add("name", "countryScene");
CountrySceneMap.add("time", 40);
OutSpaceMap.add("name", "outSpaceScene");
OutSpaceMap.add("time", 50);
SceneMaps.add(TagOfScene.CountryScene, CountrySceneMap);
SceneMaps.add(TagOfScene.CityScene, CitySceneMap);
SceneMaps.add(TagOfScene.OutSpaceScene, OutSpaceMap);
//眼镜索引
if(typeof TagOfGlass=="undefined"){
	var TagOfGlass={};
	TagOfGlass.Def=0;
	TagOfGlass.Night=1;
	TagOfGlass.Desert=2;
	TagOfGlass.Gold=3;
}
//初始化各眼镜
var GlassMaps=new Hash();
var GlassDefMap=new Hash();
var GlassNightMap=new Hash();
var GlassDesertMap=new Hash();
var GlassGoldMap=new Hash();
GlassDefMap.add("name", "#Def.png");
GlassDefMap.add("fixed", 10);
GlassDefMap.add("attack", 2);
GlassNightMap.add("name", "#Night.png");
GlassNightMap.add("fixed", 15);
GlassNightMap.add("attack", 2);
GlassDesertMap.add("name", "#Desert.png");
GlassDesertMap.add("fixed", 15);
GlassDesertMap.add("attack", 3);
GlassGoldMap.add("name", "#Gold.png");
GlassGoldMap.add("fixed", 20);
GlassGoldMap.add("attack", 4);
GlassMaps.add(TagOfGlass.Def, GlassDefMap);
GlassMaps.add(TagOfGlass.Night, GlassNightMap);
GlassMaps.add(TagOfGlass.Desert, GlassDesertMap);
GlassMaps.add(TagOfGlass.Gold, GlassGoldMap);

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
	TagOfSprite.glass=5;//眼镜碎片1
}
//游戏结束方式
if(typeof TagOfGameOver=="undefined"){
	var TagOfGameOver={};
	TagOfGameOver.win=0;
	TagOfGameOver.hit=1;
	TagOfGameOver.timeOver=2;
}

//tileMaps 地图资源
var tileMapsOfCity = {
		map01:"res/city001.tmx",
		map02:"res/city002.tmx",
		map03:"res/city003.tmx",
		map04:"res/city004.tmx",
		map05:"res/city005.tmx",
		map06:"res/city005.tmx",
		map07:"res/city005.tmx",
		map08:"res/city005.tmx",
		map09:"res/city005.tmx"
};
var tileMapsOfCountry = {
		map01:"res/countryMap.tmx",
		map02:"res/countryMap.tmx",
		map03:"res/countryMap.tmx",
		map04:"res/countryMap.tmx",
		map05:"res/countryMap.tmx",
		map06:"res/countryMap.tmx",
		map07:"res/countryMap.tmx",
		map08:"res/countryMap.tmx",
		map09:"res/countryMap.tmx"
};
var tileMapsOfOutSpace = {
		map01:"res/outspaceMap.tmx",
		map02:"res/outspaceMap.tmx",
		map03:"res/outspaceMap.tmx",
		map04:"res/outspaceMap.tmx",
		map05:"res/outspaceMap.tmx",
		map06:"res/outspaceMap.tmx",
		map07:"res/outspaceMap.tmx",
		map08:"res/outspaceMap.tmx",
		map09:"res/outspaceMap.tmx"
};
//地图索引，用于openMap
var tileMaps=new Hash();
tileMaps.add(TagOfScene.CityScene, tileMapsOfCity);
tileMaps.add(TagOfScene.CountryScene, tileMapsOfCountry);
tileMaps.add(TagOfScene.OutSpaceScene, tileMapsOfOutSpace);

//开始首张地图
var beginMaps=new Hash();
beginMaps.add(TagOfScene.CityScene, tileMapsOfCity.map01);
beginMaps.add(TagOfScene.CountryScene, tileMapsOfCountry.map01);
beginMaps.add(TagOfScene.OutSpaceScene, tileMapsOfOutSpace.map01);


//map_Resources 地图索引，用于openMapKey查询
var map_ResourcesOfCity=[];
for(var map in tileMapsOfCity){
	map_ResourcesOfCity.push(map);
}
var map_ResourcesOfCountry=[];
for(var map in tileMapsOfCountry){
	map_ResourcesOfCountry.push(map);
}
var map_ResourcesOfOutSpace=[];
for(var map in tileMapsOfOutSpace){
	map_ResourcesOfOutSpace.push(map);
}
var map_Resources=new Hash();
map_Resources.add(TagOfScene.CityScene, map_ResourcesOfCity);
map_Resources.add(TagOfScene.CountryScene, map_ResourcesOfCountry);
map_Resources.add(TagOfScene.OutSpaceScene, map_ResourcesOfOutSpace);

//全局变量操作类 -- 因变量初始化
InitGlobals=function(tagOfScene){	
	g_topHeight=new cc.TMXTiledMap(beginMaps.find(tagOfScene)).getContentSize().height;
	g_accessibleBottom=cc.director.getWinSize().height/2;
	g_accessibleTop=g_topHeight-g_accessibleBottom;
}
//全局初始化
var res = {
    //人物动画帧
    running_png : "res/running_test.png", 
    running_plist : "res/running_test.plist",
    //敌人动画帧
    alien_png : "res/alien.png", 
    alien_plist : "res/alien.plist",
    //障碍，奖励等物件
    objects_png:"res/objects.png",
    objects_plist:"res/objects.plist",
    //开火
    fire_act:"res/Fire-act_0.png",
    fire_free:"res/Fire-free_0.png",
    //各类Icon
    heroIcon:"res/head.png",
    glassIcon:"res/life.png",
    timeIcon:"res/time.png",
    //字体
    font_plist:"res/fonts/tuffy_bold_italic-charmap.plist",
    font_png:"res/fonts/tuffy_bold_italic-charmap.png",
    //vsh和fsh文件
    blur_vsh:"res/blur.vsh",
    blur_mv_vsh:"res/blur_mv.vsh",
    blur_fsh:"res/blur.fsh",
    blur_mv_fsh:"res/blur_mv.fsh",
    //背景音乐与音效
    xrayEffect:"res/xrayEffect.mp3"
    
};


//TODO 分类预加载，现在是所有在进入时一次性加载
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in tileMapsOfCity){
	g_resources.push(tileMapsOfCity[i])
}
for (var i in tileMapsOfCountry){
	g_resources.push(tileMapsOfCountry[i])
}
for (var i in tileMapsOfOutSpace){
	g_resources.push(tileMapsOfOutSpace[i])
}