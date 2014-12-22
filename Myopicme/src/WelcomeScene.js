/*
 * 游戏欢迎界面
 * 
 */

var WelcomeScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		//欢迎界面
		var layer=new WelcomeLayer();
		this.addChild(layer);
	}
});