
/*
 * 控制中心
 */
var Controller=cc.Class.extend({
	//创建控制中心
	AnimationLayer:null,
	BackgroundLayer:null,
	EnemyLayer:null,
	ForegroundLayer:null,
	GameOverLayer:null,
	ctor:function(){

	}
});
//获取实例化对象
Controller.getInstance=function(){
	if (!this._instance) {
		this._instance = this._instance || new Controller();
	}
	return this._instance;
}
