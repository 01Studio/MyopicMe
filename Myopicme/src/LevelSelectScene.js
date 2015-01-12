/**
 * 游戏关卡选择
 * 
 */
var LevelSelectScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		//欢迎界面
		var layer=new LevelSelectLayer();
		this.addChild(layer);
	}
});