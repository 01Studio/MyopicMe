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
var speed_step=50;//加减速间隔
var dead_speed=50;//死亡速度，小于此速度即判断为碰撞发生
var bullet_speed=1000;//子弹速度

var score_boss=1000;//击打boss得分
var score_hinder=100;//击打障碍得分
var score_repair=500;//获得修复器得分
var score_glasses=3000;//获得镜片得分


//每次场景初始化时同时对数据进行初始化
var g_topHeight;//地图顶端高度
var g_accessibleTop;//镜头跟进高度
var g_accessibleBottom;//地面高度

//音乐及音效控制
var audioEngine=cc.audioEngine;

//场景索引 
if(typeof TagOfScene=="undefined"){
	var TagOfScene={};
	TagOfScene.HouseScene=0;
	TagOfScene.StreetScene=1;
	TagOfScene.RoadScene=2;
	TagOfScene.BeijingScene=3;
	TagOfScene.ShanghaiScene=4;
	TagOfScene.HongKongScene=5;
	TagOfScene.TokyoScene=6;
	TagOfScene.DubaiScene=7;
	TagOfScene.MoscowScene=8;
	TagOfScene.EuropeScene=9;
	TagOfScene.AfricaScene=10;
	TagOfScene.AntarcticaScene=11;
	TagOfScene.MoonScene=12;
	TagOfScene.SolarSystemScene=13;
}
//初始化各场景
var HouseSceneMap=new Hash();
var StreetSceneMap=new Hash();
var RoadSceneMap=new Hash();
var BeijingSceneMap=new Hash();
var ShanghaiSceneMap=new Hash();
var HongKongSceneMap=new Hash();
var TokyoSceneMap=new Hash();
var DubaiSceneMap=new Hash();
var MoscowSceneMap=new Hash();
var EuropeSceneMap=new Hash();
var AfricaSceneMap=new Hash();
var AntarcticaSceneMap=new Hash();
var MoonSceneMap=new Hash();
var SolarSystemSceneMap=new Hash();

HouseSceneMap.add("name","HouseScene");
StreetSceneMap.add("name","StreetScene");
RoadSceneMap.add("name","RoadScene");
BeijingSceneMap.add("name","BeijingScene");
ShanghaiSceneMap.add("name","ShanghaiScene");
HongKongSceneMap.add("name","HongKongScene");
TokyoSceneMap.add("name","TokyoScene");
DubaiSceneMap.add("name","DubaiScene");
MoscowSceneMap.add("name","MoscowScene");
EuropeSceneMap.add("name","EuropeScene");
AfricaSceneMap.add("name","AfricaScene");
AntarcticaSceneMap.add("name","AntarcticaScene");
MoonSceneMap.add("name","MoonScene");
SolarSystemSceneMap.add("name","SolarSystemScene");

HouseSceneMap.add("time",30);
StreetSceneMap.add("time",30);
RoadSceneMap.add("time",30);
BeijingSceneMap.add("time",30);
ShanghaiSceneMap.add("time",30);
HongKongSceneMap.add("time",30);
TokyoSceneMap.add("time",30);
DubaiSceneMap.add("time",30);
MoscowSceneMap.add("time",30);
EuropeSceneMap.add("time",30);
AfricaSceneMap.add("time",30);
AntarcticaSceneMap.add("time",30);
MoonSceneMap.add("time",30);
SolarSystemSceneMap.add("time",30);


var SceneMaps=new Hash();
SceneMaps.add(TagOfScene.HouseScene, HouseSceneMap);
SceneMaps.add(TagOfScene.StreetScene, StreetSceneMap);
SceneMaps.add(TagOfScene.RoadScene, RoadSceneMap);
SceneMaps.add(TagOfScene.BeijingScene, BeijingSceneMap);
SceneMaps.add(TagOfScene.ShanghaiScene, ShanghaiSceneMap);
SceneMaps.add(TagOfScene.HongKongScene, HongKongSceneMap);
SceneMaps.add(TagOfScene.TokyoScene, TokyoSceneMap);
SceneMaps.add(TagOfScene.DubaiScene, DubaiSceneMap);
SceneMaps.add(TagOfScene.MoscowScene, MoscowSceneMap);
SceneMaps.add(TagOfScene.EuropeScene, EuropeSceneMap);
SceneMaps.add(TagOfScene.AfricaScene, AfricaSceneMap);
SceneMaps.add(TagOfScene.AntarcticaScene, AntarcticaSceneMap);
SceneMaps.add(TagOfScene.MoonScene, MoonSceneMap);
SceneMaps.add(TagOfScene.SolarSystemScene, SolarSystemSceneMap);

//眼镜索引
if(typeof TagOfGlasses=="undefined"){
	var TagOfGlasses={};
	TagOfGlasses.House=0;
	TagOfGlasses.Street=1;
	TagOfGlasses.Road=2;
	TagOfGlasses.Beijing=3;
	TagOfGlasses.Shanghai=4;
	TagOfGlasses.HongKong=5;
	TagOfGlasses.Tokyo=6;
	TagOfGlasses.Dubai=7;
	TagOfGlasses.Moscow=8;
	TagOfGlasses.Europe=9;
	TagOfGlasses.Africa=10;
	TagOfGlasses.Antarctica=11;
	TagOfGlasses.Moon=12;
	TagOfGlasses.SolarSystem=13;
}
//初始化各眼镜

var GlassesHouseMap=new Hash();
var GlassesStreetMap=new Hash();
var GlassesRoadMap=new Hash();
var GlassesBeijingMap=new Hash();
var GlassesShanghaiMap=new Hash();
var GlassesHongKongMap=new Hash();
var GlassesTokyoMap=new Hash();
var GlassesDubaiMap=new Hash();
var GlassesMoscowMap=new Hash();
var GlassesEuropeMap=new Hash();
var GlassesAfricaMap=new Hash();
var GlassesAntarcticaMap=new Hash();
var GlassesMoonMap=new Hash();
var GlassesSolarSystemMap=new Hash();

GlassesHouseMap.add("name","#GlassesHouse.png");
GlassesStreetMap.add("name","#GlassesStreet.png");
GlassesRoadMap.add("name","#GlassesRoad.png");
GlassesBeijingMap.add("name","#GlassesBeijing.png");
GlassesShanghaiMap.add("name","#GlassesShanghai.png");
GlassesHongKongMap.add("name","#GlassesHongKong.png");
GlassesTokyoMap.add("name","#GlassesTokyo.png");
GlassesDubaiMap.add("name","#GlassesDubai.png");
GlassesMoscowMap.add("name","#GlassesMoscow.png");
GlassesEuropeMap.add("name","#GlassesEurope.png");
GlassesAfricaMap.add("name","#GlassesAfrica.png");
GlassesAntarcticaMap.add("name","#GlassesAntarctica.png");
GlassesMoonMap.add("name","#GlassesMoon.png");
GlassesSolarSystemMap.add("name","#GlassesSolarSystem.png");

GlassesHouseMap.add("fixed",3);
GlassesStreetMap.add("fixed",10);
GlassesRoadMap.add("fixed",10);
GlassesBeijingMap.add("fixed",10);
GlassesShanghaiMap.add("fixed",10);
GlassesHongKongMap.add("fixed",10);
GlassesTokyoMap.add("fixed",10);
GlassesDubaiMap.add("fixed",10);
GlassesMoscowMap.add("fixed",10);
GlassesEuropeMap.add("fixed",10);
GlassesAfricaMap.add("fixed",10);
GlassesAntarcticaMap.add("fixed",10);
GlassesMoonMap.add("fixed",10);
GlassesSolarSystemMap.add("fixed",10);


GlassesHouseMap.add("attack",2);
GlassesStreetMap.add("attack",2);
GlassesRoadMap.add("attack",2);
GlassesBeijingMap.add("attack",2);
GlassesShanghaiMap.add("attack",2);
GlassesHongKongMap.add("attack",2);
GlassesTokyoMap.add("attack",2);
GlassesDubaiMap.add("attack",2);
GlassesMoscowMap.add("attack",2);
GlassesEuropeMap.add("attack",2);
GlassesAfricaMap.add("attack",2);
GlassesAntarcticaMap.add("attack",2);
GlassesMoonMap.add("attack",2);
GlassesSolarSystemMap.add("attack",2);

var GlassesMaps=new Hash();
GlassesMaps.add(TagOfGlasses.House,GlassesHouseMap);
GlassesMaps.add(TagOfGlasses.Street,GlassesStreetMap);
GlassesMaps.add(TagOfGlasses.Road,GlassesRoadMap);
GlassesMaps.add(TagOfGlasses.Beijing,GlassesBeijingMap);
GlassesMaps.add(TagOfGlasses.Shanghai,GlassesShanghaiMap);
GlassesMaps.add(TagOfGlasses.HongKong,GlassesHongKongMap);
GlassesMaps.add(TagOfGlasses.Tokyo,GlassesTokyoMap);
GlassesMaps.add(TagOfGlasses.Dubai,GlassesDubaiMap);
GlassesMaps.add(TagOfGlasses.Moscow,GlassesMoscowMap);
GlassesMaps.add(TagOfGlasses.Europe,GlassesEuropeMap);
GlassesMaps.add(TagOfGlasses.Africa,GlassesAfricaMap);
GlassesMaps.add(TagOfGlasses.Antarctica,GlassesAntarcticaMap);
GlassesMaps.add(TagOfGlasses.Moon,GlassesMoonMap);
GlassesMaps.add(TagOfGlasses.SolarSystem,GlassesSolarSystemMap);

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
	TagOfSprite.glasses=5;//眼镜碎片
}
//游戏结束方式
if(typeof TagOfGameOver=="undefined"){
	var TagOfGameOver={};
	TagOfGameOver.win=0;
	TagOfGameOver.hit=1;
	TagOfGameOver.timeOver=2;
}

//tileMaps 地图资源
var tileMapsOfHouse = {
		map01:"res/Background/House/house05.tmx",
		map02:"res/Background/House/house05.tmx",
		map03:"res/Background/House/house05.tmx",
		map04:"res/Background/House/house05.tmx",
		map05:"res/Background/House/house05.tmx",
		map06:"res/Background/House/house05.tmx",
		map07:"res/Background/House/house05.tmx",
		map08:"res/Background/House/house05.tmx",
		map09:"res/Background/House/house05.tmx"
};
var tileMapsOfStreet = {
		map01:"res/Background/Street/street001.tmx",
		map02:"res/Background/Street/street001.tmx",
		map03:"res/Background/Street/street001.tmx",
		map04:"res/Background/Street/street001.tmx",
		map05:"res/Background/Street/street001.tmx",
		map06:"res/Background/Street/street001.tmx",
		map07:"res/Background/Street/street001.tmx",
		map08:"res/Background/Street/street001.tmx",
		map09:"res/Background/Street/street001.tmx"
};
var tileMapsOfRoad = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};
var tileMapsOfBeijing = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfShanghai = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfHongKong = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfTokyo = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfDubai = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfMoscow = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfEurope = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfAfrica = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfAntractica = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfMoon = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

var tileMapsOfSolarSystem = {
		map01:"res/Background/temp.tmx",
		map02:"res/Background/temp.tmx",
		map03:"res/Background/temp.tmx",
		map04:"res/Background/temp.tmx",
		map05:"res/Background/temp.tmx",
		map06:"res/Background/temp.tmx",
		map07:"res/Background/temp.tmx",
		map08:"res/Background/temp.tmx",
		map09:"res/Background/temp.tmx"
};

//地图索引，用于openMap
var tileMaps=new Hash();
tileMaps.add(TagOfScene.HouseScene, tileMapsOfHouse);
tileMaps.add(TagOfScene.StreetScene, tileMapsOfStreet);
tileMaps.add(TagOfScene.RoadScene, tileMapsOfRoad);
tileMaps.add(TagOfScene.BeijingScene, tileMapsOfBeijing);
tileMaps.add(TagOfScene.ShanghaiScene, tileMapsOfShanghai);
tileMaps.add(TagOfScene.HongKongScene, tileMapsOfHongKong);
tileMaps.add(TagOfScene.TokyoScene, tileMapsOfTokyo);
tileMaps.add(TagOfScene.DubaiScene, tileMapsOfDubai);
tileMaps.add(TagOfScene.MoscowScene, tileMapsOfMoscow);
tileMaps.add(TagOfScene.EuropeScene, tileMapsOfEurope);
tileMaps.add(TagOfScene.AfricaScene, tileMapsOfAfrica);
tileMaps.add(TagOfScene.AntarcticaScene, tileMapsOfAntractica);
tileMaps.add(TagOfScene.MoonScene, tileMapsOfMoon);
tileMaps.add(TagOfScene.SolarSystemScene, tileMapsOfSolarSystem);

//开始首张地图
var beginMaps=new Hash();
beginMaps.add(TagOfScene.HouseScene, tileMapsOfHouse.map01);
beginMaps.add(TagOfScene.StreetScene, tileMapsOfStreet.map01);
beginMaps.add(TagOfScene.RoadScene, tileMapsOfRoad.map01);
beginMaps.add(TagOfScene.BeijingScene, tileMapsOfBeijing.map01);
beginMaps.add(TagOfScene.ShanghaiScene, tileMapsOfShanghai.map01);
beginMaps.add(TagOfScene.HongKongScene, tileMapsOfHongKong.map01);
beginMaps.add(TagOfScene.TokyoScene, tileMapsOfTokyo.map01);
beginMaps.add(TagOfScene.DubaiScene, tileMapsOfDubai.map01);
beginMaps.add(TagOfScene.MoscowScene, tileMapsOfMoscow.map01);
beginMaps.add(TagOfScene.EuropeScene, tileMapsOfEurope.map01);
beginMaps.add(TagOfScene.AfricaScene, tileMapsOfAfrica.map01);
beginMaps.add(TagOfScene.AntarcticaScene, tileMapsOfAntractica.map01);
beginMaps.add(TagOfScene.MoonScene, tileMapsOfMoon.map01);
beginMaps.add(TagOfScene.SolarSystemScene, tileMapsOfSolarSystem.map01);


//map_Resources 地图索引，用于openMapKey查询
var map_ResourcesOfHouse=[];
for(var map in tileMapsOfHouse){
	map_ResourcesOfHouse.push(map);
}
var map_ResourcesOfStreet=[];
for(var map in tileMapsOfStreet){
	map_ResourcesOfStreet.push(map);
}
var map_ResourcesOfRoad=[];
for(var map in tileMapsOfRoad){
	map_ResourcesOfRoad.push(map);
}
var map_ResourcesOfBeijing=[];
for(var map in tileMapsOfBeijing){
	map_ResourcesOfBeijing.push(map);
}
var map_ResourcesOfShanghai=[];
for(var map in tileMapsOfShanghai){
	map_ResourcesOfShanghai.push(map);
}
var map_ResourcesOfHongKong=[];
for(var map in tileMapsOfHongKong){
	map_ResourcesOfHongKong.push(map);
}
var map_ResourcesOfTokyo=[];
for(var map in tileMapsOfTokyo){
	map_ResourcesOfTokyo.push(map);
}
var map_ResourcesOfDubai=[];
for(var map in tileMapsOfDubai){
	map_ResourcesOfDubai.push(map);
}
var map_ResourcesOfMoscow=[];
for(var map in tileMapsOfMoscow){
	map_ResourcesOfMoscow.push(map);
}
var map_ResourcesOfEurope=[];
for(var map in tileMapsOfEurope){
	map_ResourcesOfEurope.push(map);
}
var map_ResourcesOfAfrica=[];
for(var map in tileMapsOfAfrica){
	map_ResourcesOfAfrica.push(map);
}
var map_ResourcesOfAntractica=[];
for(var map in tileMapsOfAntractica){
	map_ResourcesOfAntractica.push(map);
}
var map_ResourcesOfMoon=[];
for(var map in tileMapsOfMoon){
	map_ResourcesOfMoon.push(map);
}
var map_ResourcesOfSolarSystem=[];
for(var map in tileMapsOfSolarSystem){
	map_ResourcesOfSolarSystem.push(map);
}

var map_Resources=new Hash();
map_Resources.add(TagOfScene.HouseScene, map_ResourcesOfHouse);
map_Resources.add(TagOfScene.StreetScene, map_ResourcesOfStreet);
map_Resources.add(TagOfScene.RoadScene, map_ResourcesOfRoad);
map_Resources.add(TagOfScene.BeijingScene, map_ResourcesOfBeijing);
map_Resources.add(TagOfScene.ShanghaiScene, map_ResourcesOfShanghai);
map_Resources.add(TagOfScene.HongKongScene, map_ResourcesOfHongKong);
map_Resources.add(TagOfScene.TokyoScene, map_ResourcesOfTokyo);
map_Resources.add(TagOfScene.DubaiScene, map_ResourcesOfDubai);
map_Resources.add(TagOfScene.MoscowScene, map_ResourcesOfMoscow);
map_Resources.add(TagOfScene.EuropeScene, map_ResourcesOfEurope);
map_Resources.add(TagOfScene.AfricaScene, map_ResourcesOfAfrica);
map_Resources.add(TagOfScene.AntarcticaScene, map_ResourcesOfAntractica);
map_Resources.add(TagOfScene.MoonScene, map_ResourcesOfMoon);
map_Resources.add(TagOfScene.SolarSystemScene, map_ResourcesOfSolarSystem);

//全局变量操作类 -- 因变量初始化
InitGlobals=function(tagOfScene){	
	g_topHeight=new cc.TMXTiledMap(beginMaps.find(tagOfScene)).getContentSize().height;
	g_accessibleBottom=cc.director.getWinSize().height/2;
	g_accessibleTop=g_topHeight-g_accessibleBottom;
}
//全局初始化
var res = {
	//背景
	background_png:"res/Background/cityBackground.png",
    //人物动画帧
    running_png : "res/Animation/running_test.png", 
    running_plist : "res/Animation/running_test.plist",
    //敌人动画帧
    alien_png : "res/Enemy/alien.png", 
    alien_plist : "res/Enemy/alien.plist",
    //障碍，奖励等物件
    objects_png:"res/Background/objects.png",
    objects_plist:"res/Background/objects.plist",
    //开火
    fire_act:"res/Foreground/Fire-act_0.png",
    fire_free:"res/Foreground/Fire-free_0.png",
    //各类Icon
    heroIcon:"res/Foreground/head.png",
    glassesIcon:"res/Foreground/life.png",
    timeIcon:"res/Foreground/time.png",
    //字体
    font_plist:"res/fonts/tuffy_bold_italic-charmap.plist",
    font_png:"res/fonts/tuffy_bold_italic-charmap.png",
    //vsh和fsh文件
    blur_vsh:"res/Shader/blur.vsh",
    blur_mv_vsh:"res/Shader/blur_mv.vsh",
    blur_fsh:"res/Shader/blur.fsh",
    blur_mv_fsh:"res/Shader/blur_mv.fsh",
    //背景音乐与音效
    xrayEffect:"res/xrayEffect.mp3"
    
};


//TODO 分类预加载，现在是所有在进入时一次性加载
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in tileMapsOfHouse){
	g_resources.push(tileMapsOfHouse[i])
}
for (var i in tileMapsOfStreet){
	g_resources.push(tileMapsOfStreet[i])
}
for (var i in tileMapsOfRoad){
	g_resources.push(tileMapsOfRoad[i])
}
for (var i in tileMapsOfBeijing){
	g_resources.push(tileMapsOfBeijing[i])
}
for (var i in tileMapsOfShanghai){
	g_resources.push(tileMapsOfShanghai[i])
}
for (var i in tileMapsOfHongKong){
	g_resources.push(tileMapsOfHongKong[i])
}
for (var i in tileMapsOfTokyo){
	g_resources.push(tileMapsOfTokyo[i])
}
for (var i in tileMapsOfDubai){
	g_resources.push(tileMapsOfDubai[i])
}
for (var i in tileMapsOfMoscow){
	g_resources.push(tileMapsOfMoscow[i])
}
for (var i in tileMapsOfEurope){
	g_resources.push(tileMapsOfEurope[i])
}
for (var i in tileMapsOfAfrica){
	g_resources.push(tileMapsOfAfrica[i])
}
for (var i in tileMapsOfAntractica){
	g_resources.push(tileMapsOfAntractica[i])
}
for (var i in tileMapsOfMoon){
	g_resources.push(tileMapsOfMoon[i])
}
for (var i in tileMapsOfSolarSystem){
	g_resources.push(tileMapsOfSolarSystem[i])
}