/*
 * 游戏欢迎界面
 * 
 */
var WelcomeLayer=cc.Layer.extend({
	//create函数，创建一个WelcomeLayer
	ctor:function(){
		
	},
	//初始化函数，有ctor调用，对页面进行初始化
	init:function(){
		
	}
});

var WelcomeScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		//欢迎界面
		//var layer=new WelcomeLayer();
		//this.addChild(layer);
		var cityScene=new CityScene();
		cc.director.replaceScene(cityScene);
	}
});