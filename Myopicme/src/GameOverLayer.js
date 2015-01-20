/*
 * 游戏结束层
 * 
 */

var GameOverLayer=cc.LayerColor.extend({
	tagOfGameOver:null,
	controller:null,
	//TODO
	ctor:function(tagOfGameOver){
		this.controller=Controller.getInstance();
		this.controller.filter.destory();
		this._super(cc.color(0,0,0,180));
		this.tagOfGameOver=tagOfGameOver;
		this.saveData();
		this.init();
	},
	saveData:function(){
		this.controller.GameScene.glassesRepair.each(
			function(num,key){
				var manager=new StorageManager();
				manager.repairGlasses(key, num);
			}
		);
		var manager=new StorageManager();
		var repaired=manager.getGlassesRepaired(this.controller.GameScene.tagOfScene);
		if(GlassesMaps.find(this.controller.GameScene.tagOfScene).find("fixed")==repaired){
			manager.unlockNext(this.controller.GameScene.tagOfScene);
		}
		
	},
	init:function(){
		var winSize=cc.director.getWinSize();
		
		//重新开始
		var menuFont=new cc.MenuItemFont("Restart",this.onRestart,null);
		var menuRestart=new cc.Menu(menuFont);
		menuRestart.setColor(new cc.Color(255, 0, 0, 255));
		centerPos=new cc.p(winSize.width/2,winSize.height/3*2);
		menuRestart.setPosition(centerPos);
		this.addChild(menuRestart);
		//回到菜单
		menuFont=new cc.MenuItemFont("Back to menu",this.onBack,null);
		var menuBack=new cc.Menu(menuFont);
		menuBack.setColor(new cc.Color(255, 0, 0, 255));
		centerPos=new cc.p(winSize.width/2,winSize.height/2);
		menuBack.setPosition(centerPos);
		this.addChild(menuBack);
		//继续闯关
		menuFont=new cc.MenuItemFont("Continue",this.onContinue,null);
		var menuContinue=new cc.Menu(menuFont);
		menuContinue.setColor(new cc.Color(255, 0, 0, 255));
		centerPos=new cc.p(winSize.width/2,winSize.height/3);
		menuContinue.setPosition(centerPos);
		this.addChild(menuContinue);
		
		switch(this.tagOfGameOver){
			case TagOfGameOver.win:
				menuRestart.setColor(cc.color(0, 0, 0, 255));
				menuRestart.setEnabled(false);
				break;
			case TagOfGameOver.hit:
				menuContinue.setColor(cc.color(0, 0, 0, 255));
				menuContinue.setEnabled(false);
				break;
			case TagOfGameOver.timeOver:
				menuContinue.setColor(cc.color(0, 0, 0, 255));
				menuContinue.setEnabled(false);
				break;
		}

		//数据存储
		var manager=new StorageManager();
		var newScore=manager.updateHighestScore(this.controller.GameScene.tagOfScene, this.controller.score);
		
		//分数
		var str="Your Score:"+this.controller.score+"\n"
		+"HeightScore:"+manager.getHightestScore(this.controller.GameScene.tagOfScene)+"\n"
		+(newScore?"new record!!!":"work hard")+"\n"
		+((this.tagOfGameOver==TagOfGameOver.win)?"glasses Of This Level is ok":"");
		menuFont=new cc.MenuItemFont(str,null,null);
		var menu=new cc.Menu(menuFont);
		menu.setEnabled(false);
		menu.setColor(new cc.Color(255, 255, 0, 255));
		centerPos=new cc.p(winSize.width/2,winSize.height/5*4);
		menu.setPosition(centerPos);
		this.addChild(menu);

	},
	
	onRestart:function(){
		cc.director.runScene(new PlayingScene(Controller.getInstance().GameScene.tagOfScene));
	},
	onBack:function(){
		cc.director.runScene(new LevelSelectScene());
	},
	onContinue:function(){
		Controller.getInstance().GameOverLayer.removeFromParent();
		Controller.getInstance().GameOverLayer=null;
		Controller.getInstance().resume();
		
	}
});