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
		
		
		//当前眼镜
		var key=manager.getGlassUsingKey();
		var str="Glass:Using\n"
			+GlassMaps.find(key).find("name")
			+"\n repaired:"+manager.getGlassRepaired(key)+"/"+GlassMaps.find(key).find("fixed")
			+"\n attack:"+GlassMaps.find(key).find("attack");
		var glassMenuFont=new cc.MenuItemFont(str,null,null);
		var glassMenu=new cc.Menu(glassMenuFont);
		glassMenu.setEnabled(false);
		glassMenu.setColor(new cc.Color(255, 255, 0, 255));
		centerPos=new cc.p(winSize.width/2+300,winSize.height/2);
		glassMenu.setPosition(centerPos);
		this.addChild(glassMenu);
		
		
		menuFont=new cc.MenuItemFont("before",
		function(){
			key=(key-1)<0?TagOfGlass.Gold:key-1;
			manager.setGlassUsing(key);

			var str="Glass:Using\n"
				+GlassMaps.find(key).find("name")
				+"\n repaired:"+manager.getGlassRepaired(key)+"/"+GlassMaps.find(key).find("fixed")
				+"\n attack:"+GlassMaps.find(key).find("attack");
			glassMenuFont.setString(str);
		}
		,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/2+200,winSize.height/2-100);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		//////
		//exit
		menuFont=new cc.MenuItemFont("Back",this.BackUp,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/4*3,winSize.height/4);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		
		this._super();
	},
	//城市
	CityScene:function(){
		cc.director.runScene(new PlayingScene(TagOfScene.CityScene));
	},
	//郊区
	CountryScene:function(){
		cc.director.runScene(new PlayingScene(TagOfScene.CountryScene));
	},
	//外太空
	OutSpaceScene:function(){
		cc.director.runScene(new PlayingScene(TagOfScene.OutSpaceScene));
	},
	//回退
	BackUp:function(){
		cc.director.runScene(new WelcomeScene());
		var d=new StorageManager();
	}
});