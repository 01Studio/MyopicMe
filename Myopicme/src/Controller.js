/*
 * 控制中心
 */

var Controller=cc.Class.extend({

	_initialized: false,
	//创建控制中心，各个Layer层
	AnimationLayer:null,
	BackgroundLayer:null,
	EnemyLayer:null,
	ForegroundLayer:null,
	GameLayer:null,
	GameScene:null,
	
	//状态记录：英雄状态，眼镜状态，时间状态，Boss生命值
	//英雄状态
	heroIcon:null,
	//眼镜状态
	glassIcon:null,
	glassAll:0,
	glassNow:0,
	//时间状态
	timeIcon:null,
	timeAll:0,
	timeNow:0,
	//Boss生命值
	bossIcon:null,
	bossAll:0,
	bossNow:0,
	
	//其他
	fireIcon:null,
	
	ctor:function(){
		Filter.initShader();
	},

	initialize:function(){
		this._initialized=true;
	},
	
	/**
	 * 初始化游戏状态
	 * @param {Number} glass
	 * @param {Number} time
	 * @param {Number} boss
	 */
	initStatus:function(glass,time,boss){
		this.glassAll=glass;
		this.glassNow=this.glassAll;
		this.timeAll=time;
		this.timeNow=this.timeAll;
		this.bossAll=boss;
		this.bossNow=this.bossAll;
	},
	addToBlurList:function(sprite){
		Filter.setBlurSprite(sprite);
	},
	//设置头像
	setHeroIcon:function(icon){
		this.heroIcon=icon;
	},
	setGlassIcon:function(icon){
		this.glassIcon=icon;
	},
	setTimeIcon:function(icon){
		this.timeIcon=icon;
	},
	setBossIcon:function(icon){
		this.bossIcon=icon;
	},
	setFireIcon:function(icon){
		this.fireIcon=icon;
	},
	
	//主角开火
	fire:function(){
		this.AnimationLayer.fire();
		this.damaged();
	},
	//对眼镜造成伤害
	damaged:function(){
		this.glassNow--;
		if(this.glassNow==0){
			this.askForGameOver();
		}
		this.glassIcon.setScaleX(this.glassNow/this.glassAll);
		this.blur((this.glassAll-this.glassNow)*10);
	},
	//修复
	repair:function(){
		if(this.glassNow<this.glassAll){
			this.glassNow++;
			this.glassIcon.setScaleX(this.glassNow/this.glassAll);
			this.blur((this.glassAll-this.glassNow)*10);
		}
	},
	//击中Boss
	hitBoss:function(){
		if(this.bossNow>0){
			this.bossNow--;
			this.bossIcon.setScaleX(this.bossNow/this.bossAll);
			if(this.bossNow==0){
				this.askForGameOver();
			}
		}
		else{//杀死boss
			
		}
	},
	//模糊处理
	blur:function(num){
		//TODO 渲染效率低下，每次渲染导致画面停滞，需要修改
//		Filter.blurSprite(this.GameLayer, num);
//		var maps=this.BackgroundLayer.closedMap;
//		for(var i=0;i<maps.length;i++){
//			Filter.blurSprite(maps[i], num);
//		}
		Filter.setBlurSize(num);
	},
	clock:function(){
		if(this.timeNow>0){
			this.timeIcon.setScaleX((this.timeAll-this.timeNow)/this.timeAll);
		}
	},
	//游戏结束
	askForGameOver:function(){
		cc.director.pause();
		this.fireIcon.setEnabled(false);
		this.GameScene.addChild(new GameOverLayer());
	}
	
});
/*
 * 获取实例化对象
 */
Controller.getInstance=function(){
	if (!this._instance) {
		this._instance = this._instance || new Controller();
		this._instance.initialize();
	}
	return this._instance;
}
/*
 * 创建新实例
 */
Controller.getNewInstance=function(){
	this._instance=null;
	this._instance = this._instance || new Controller();
	this._instance.initialize();
	return this._instance;
	
}
