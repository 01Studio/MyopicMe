/*
 * 游戏关卡选择
 * 
 */
var LevelSelectLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		var manager=new StorageManager();
		var unlocked=manager.unlocked();

		var winSize=cc.director.getWinSize();
		
		//CityScene
		var menuFont=new cc.MenuItemFont("CityScene",this.CityScene,null);
		var menu=new cc.Menu(menuFont);
		var centerPos=new cc.p(winSize.width/2,winSize.height/2+100);
		menu.setPosition(centerPos);
		//设置是否可以玩耍
		if(unlocked<TagOfScene.CityScene){
			menu.setEnabled(false);
			menu.setColor(new cc.Color(255, 0, 0, 255));
		}
		this.addChild(menu);
		
		//CountryScene
		menuFont=new cc.MenuItemFont("CountryScene",this.CountryScene,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/2,winSize.height/2);
		menu.setPosition(centerPos);
		//设置是否可以玩耍
		if(unlocked<TagOfScene.CountryScene){
			menu.setEnabled(false);
			menu.setColor(new cc.Color(255, 0, 0, 255));
		}
		this.addChild(menu);
		
		//OutSpaceScene
		menuFont=new cc.MenuItemFont("OutSpaceScene",this.OutSpaceScene,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/2,winSize.height/2-100);
		menu.setPosition(centerPos);
		//设置是否可以玩耍
		if(unlocked<TagOfScene.OutSpaceScene){
			menu.setEnabled(false);
			menu.setColor(new cc.Color(255, 0, 0, 255));
		}
		this.addChild(menu);

		///// TODO 数据展示，解锁关卡
		var str="Score\n"
			+"city:"+manager.getHightestScore(TagOfScene.CityScene)+"\n"
			+"country:"+manager.getHightestScore(TagOfScene.CountryScene)+"\n"
			+"outspace:"+manager.getHightestScore(TagOfScene.OutSpaceScene)+"\n"
			menuFont=new cc.MenuItemFont(str,null,null);
		menu=new cc.Menu(menuFont);
		menu.setEnabled(false);
		menu.setColor(new cc.Color(255, 255, 0, 255));
		centerPos=new cc.p(winSize.width/2-200,winSize.height/2);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		manager.unlock();//实验阶段，每次进入解锁一关
		//////
		this._super();
	},
	//城市
	CityScene:function(){
		cc.director.runScene(new CityScene());
	},
	//郊区
	CountryScene:function(){
		cc.director.runScene(new CountryScene());
	},
	//外太空
	OutSpaceScene:function(){
		cc.director.runScene(new OutSpaceScene());
	}
});