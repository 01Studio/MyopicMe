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
		
		//pageview 大场景转换
		var pageView = new ccui.PageView();
		pageView.setTouchEnabled(true);
		pageView.setContentSize(winSize);
		pageView.x = 0;
		pageView.y = 0;


		var imageSize=new cc.size(winSize.width/6, winSize.height/5);
		for (var j = 0; j < 5; j++) {
			var layout = new ccui.Layout();
			layout.setContentSize(winSize);
			for(var i=0;i<3;i++){
				if(j*3+i>13)break;
				var imageView = new ccui.ImageView();
				imageView.setScale9Enabled(true);
				imageView.loadTexture(res.timeIcon);
				imageView.setContentSize(imageSize);
				imageView.tagOfScene=j*3+i;
				if(unlocked<imageView.tagOfScene){
					imageView.setTouchEnabled(false);
					imageView.setFlippedX(true);
				}
				else{
					imageView.setTouchEnabled(true);
				}
				imageView.addClickEventListener(this.RunScene);
				imageView.x = imageSize.width*(i*2+1);
				imageView.y = imageSize.height;
				layout.addChild(imageView);

				var text = new ccui.Text();
				text.string = SceneMaps.find(j*3+i).find("name")+"\n"
					+manager.getHightestScore(imageView.tagOfScene);
				text.font = "30px 'Marker Felt'";
				text.color = cc.color(192, 192, 192);
				text.x = imageSize.width*(i*2+1);
				text.y = imageSize.height*2;
				layout.addChild(text);
			}
			
			pageView.addPage(layout);
		}
		this.addChild(pageView);
		
		
		//当前眼镜状态
		var key=manager.getGlassesUsingKey();
		var str="Glasses:Using\n"
			+GlassesMaps.find(key).find("name")
			+"\n repaired:"+manager.getGlassesRepaired(key)+"/"+GlassesMaps.find(key).find("fixed")
			+"\n attack:"+GlassesMaps.find(key).find("attack");
		var glassesMenuFont=new cc.MenuItemFont(str,null,null);
		var glassesMenu=new cc.Menu(glassesMenuFont);
		glassesMenu.setEnabled(false);
		glassesMenu.setColor(new cc.Color(255, 255, 0, 255));
		centerPos=new cc.p(winSize.width/2+300,winSize.height/10*9);
		glassesMenu.setPosition(centerPos);
		this.addChild(glassesMenu);
		
		
		menuFont=new cc.MenuItemFont("before",
		function(){
			key=(key-1)<0?TagOfGlasses.SolarSystem:(key-1);
			manager.setGlassesUsing(key);

			var str="Glasses:Using\n"
				+GlassesMaps.find(key).find("name")
				+"\n repaired:"+manager.getGlassesRepaired(key)+"/"+GlassesMaps.find(key).find("fixed")
				+"\n attack:"+GlassesMaps.find(key).find("attack");
			glassesMenuFont.setString(str);
		}
		,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/2+200,winSize.height/10*9-100);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		menuFont=new cc.MenuItemFont("next",
				function(){
			key=(key+1)>TagOfGlasses.SolarSystem?0:(key+1);
			manager.setGlassesUsing(key);

			var str="Glasses:Using\n"
				+GlassesMaps.find(key).find("name")
				+"\n repaired:"+manager.getGlassesRepaired(key)+"/"+GlassesMaps.find(key).find("fixed")
				+"\n attack:"+GlassesMaps.find(key).find("attack");
			glassesMenuFont.setString(str);
		}
		,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/2+300,winSize.height/10*9-100);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		//////
		//exit
		menuFont=new cc.MenuItemFont("Back",this.BackUp,null);
		menu=new cc.Menu(menuFont);
		centerPos=new cc.p(winSize.width/2+400,winSize.height/10*9-100);
		menu.setPosition(centerPos);
		this.addChild(menu);
		
		this._super();
	},
	//运行游戏
	RunScene:function(_this){
		var action=new cc.Sequence(cc.rotateBy(0.3, 180, 0),
				new cc.CallFunc(function(){cc.director.runScene(new PlayingScene(_this.tagOfScene))}));
		_this.runAction(action);
	},
	//回退
	BackUp:function(){
		cc.director.runScene(new WelcomeScene());
	}
});