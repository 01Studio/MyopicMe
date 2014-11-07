var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    
    tileMap01_tmx : "res/tileMap01.tmx",
    tileMap02_tmx : "res/tileMap02.tmx",
    map_png : "res/map.png",
    
    runner_png : "res/runner.png",
    running_png : "res/running.png", 
    running_plist : "res/running.plist",
    background_png:"res/background.png",
    background_plist:"res/background.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}