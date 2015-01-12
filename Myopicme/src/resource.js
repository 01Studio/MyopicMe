//开始首张地图
var beginMaps=new Hash();
beginMaps.add(TagOfScene.CityScene, "res/testMap2.tmx");
beginMaps.add(TagOfScene.CountryScene, "res/countryMap.tmx");
beginMaps.add(TagOfScene.OutSpaceScene, "res/testMap2.tmx");
//tileMaps 地图资源
var tileMapsOfCity = {
		map01:"res/testMap2.tmx",
		map02:"res/testMap2.tmx",
		map03:"res/testMap2.tmx",
		map04:"res/testMap2.tmx",
		map05:"res/testMap2.tmx",
		map06:"res/testMap2.tmx",
		map07:"res/testMap2.tmx",
		map08:"res/testMap2.tmx",
		map09:"res/testMap2.tmx"
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
		map01:"res/testMap2.tmx",
		map02:"res/testMap2.tmx",
		map03:"res/testMap2.tmx",
		map04:"res/testMap2.tmx",
		map05:"res/testMap2.tmx",
		map06:"res/testMap2.tmx",
		map07:"res/testMap2.tmx",
		map08:"res/testMap2.tmx",
		map09:"res/testMap2.tmx"
};
var tileMaps=new Hash();
tileMaps.add(TagOfScene.CityScene, tileMapsOfCity);
tileMaps.add(TagOfScene.CountryScene, tileMapsOfCountry);
tileMaps.add(TagOfScene.OutSpaceScene, tileMapsOfOutSpace);
//map_Resources 地图索引
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

//TODO 基础值设置


var res = {
	//开始场景，地图索引与资源，Hash()
    beginMap : beginMaps,
    tileMap : tileMaps,
    map_Resource : map_Resources,
    //用于测试大小的地图
    mapForSize:"res/testMap2.tmx",
    //人物动画帧
    running_png : "res/running_test.png", 
    running_plist : "res/running_test.plist",
    //障碍，奖励等物件
    objects_png:"res/objects.png",
    objects_plist:"res/objects.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
