/*
 * 控制中心
 */

var Controller=cc.Class.extend({

	//创建控制中心，各个Layer层
	AnimationLayer:null,
	BackgroundLayer:null,
	EnemyLayer:null,
	ForegroundLayer:null,
	GameLayer:null,
	GameScene:null,
	
	GameOverLayer:null,
	
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
	//分数值
	scoreIcon:null,
	baseScore:0,
	score:0,
	
	//其他
	fireIcon:null,
	//关卡
	level:5,
	//滤镜
	filter:null,
	
	ctor:function(){
		this.init();
	},
	init:function(){
		this.level=5;
		this.filter=new Filter();
	},

	//暂停与继续
	pause:function(){
		this.GameScene.unscheduleAllCallbacks();
		this.AnimationLayer.unscheduleAllCallbacks();
		this.BackgroundLayer.unscheduleAllCallbacks();
		this.EnemyLayer.unscheduleAllCallbacks();
		this.fireIcon.setEnabled(false);
		this.GameOverLayer=new GameOverLayer();
		this.GameScene.addChild(this.GameOverLayer);
	},
	resume:function(){
		//TODO 不完善 用于完成本关任务后开启无限模式
		this.GameScene.scheduleUpdate();
		this.AnimationLayer.scheduleUpdate();
		this.BackgroundLayer.scheduleUpdate();
		this.EnemyLayer.scheduleUpdate();
		this.fireIcon.setEnabled(true);
		this.GameScene.removeChild(this.GameOverLayer);
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
		if(this.glassIcon){//非重新进入
			this.glassIcon.setScaleX(1);
			this.timeIcon.setScaleX(1);
			this.bossIcon.setScaleX(1);
			this.filter.setBlurSize((this.glassAll-this.glassNow)*10);
		}
	},
	//设置图标
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
	setScoreIcon:function(icon){
		this.scoreIcon=icon;
	},
	setFireIcon:function(icon){
		this.fireIcon=icon;
	},
	/**
	 * 基础分数	总分=距离分+基础分
	 */
	setBaseScore:function(score){
		this.baseScore=score;
	},
	/**
	 * 加分
	 */
	addBaseScore:function(score){
		this.baseScore+=score;
	},
	
	/**
	 * 主角开火
	 */
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
		if(this.filter){
			this.filter.setBlurSize((this.glassAll-this.glassNow)*10);
		}
	},
	//修复
	repair:function(){
		if(this.glassNow<this.glassAll){
			this.glassNow++;
			this.glassIcon.setScaleX(this.glassNow/this.glassAll);
		}
		this.filter.setBlurSize((this.glassAll-this.glassNow)*10);
	},
	/**
	 * 击中Boss
	 */
	hitBoss:function(){
		if(this.bossNow>0){
			this.bossNow--;
			this.bossIcon.setScaleX(this.bossNow/this.bossAll);
			//杀死boss
			if(this.bossNow==0){
				this.askForNext();
			}
		}
	},
	/**
	 * 更新状态：时间，分数
	 * 调动更新函数：渲染更新
	 * @param distance
	 */
	update:function(distance){
		this.timeIcon.setScaleX(this.timeNow/this.timeAll);
		this.score=this.baseScore+distance;//分数
		this.scoreIcon.setString(this.score);
		if(this.filter){
			this.filter.update();
		}
	},
	//下一关
	askForNext:function(){
		this.level--;
		if(this.level!=0){
			this.initStatus(this.glassAll, this.timeAll, this.bossAll);
			this.EnemyLayer.changePlace();
		}
		else{
			this.askForGameOver();
		}
	},
	/**
	 * 游戏结束
	 */
	askForGameOver:function(key){
		
		this.pause();
		
		switch(key){//不同的结束情况
			case TagOfGameOver.win:
				break;
			case TagOfGameOver.hit:
				break;
			case TagOfGameOver.timeOver:
				break;
			case TagOfGameOver.glassBroken:
				break;
		}
		//数据存储
		var manager=new StorageManager();
		manager.updateHighestScore(this.GameScene.tagOfScene, this.score);
		this.filter.destory();
	}
	
});
/**
 * 获取实例化对象
 */
Controller.getInstance=function(){
	if (!this._instance) {
		this._instance = this._instance || new Controller();
	}
	return this._instance;
}
/**
 * 创建新实例
 */
Controller.getNewInstance=function(){
	this._instance=null;
	this._instance = this._instance || new Controller();
	return this._instance;
	
}
