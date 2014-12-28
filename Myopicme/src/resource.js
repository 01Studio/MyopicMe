var res = {
    //地图
    tileMap01_tmx : "res/testMap2.tmx",
    tileMap02_tmx : "res/testMap2.tmx",
    
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

//TODO 地图资源，用于随机载入
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
var map_Resources=[];
for(var map in tileMapsOfCity){
	map_Resources.push(map);
}
