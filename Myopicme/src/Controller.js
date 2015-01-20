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
	GameOverLayer:null,
	//游戏场景
	GameScene:null,
	
	//英雄状态
	heroIcon:null,//卖萌，显示眼镜种类
	//眼镜状态
	glassesIcon:null,
	glassesAll:null,
	glassesNow:null,
	//时间状态
	timeIcon:null,
	timeAll:null,
	timeNow:null,
	//分数值
	scoreIcon:null,
	scoreAddIcon:null,
	baseScore:null,
	score:null,
	//其他
	fireIcon:null,
	//滤镜
	filter:null,
	//添加的reward
	rewards:[],
	//
	level:null,
	attack:null,
	
	ctor:function(){
		this.init();
	},
	init:function(){
		this.baseScore=0;
		this.filter=new Filter();
	},
	//暂停与继续
	pause:function(){
		this.GameScene.unscheduleAllCallbacks();
		cc.eventManager.pauseTarget(this.AnimationLayer, false);
		this.AnimationLayer.sprite.pause();
		this.EnemyLayer.sprite.pause();
		this.fireIcon.setEnabled(false);
	},
	resume:function(){
		this.GameScene.scheduleUpdate();
		cc.eventManager.resumeTarget(this.AnimationLayer, false);
		this.AnimationLayer.sprite.resume();
		this.EnemyLayer.sprite.resume();
		this.fireIcon.setEnabled(true);
	},
	/**
	 * 初始化游戏状态
	 * @param {Number} glasses
	 * @param {Number} time
	 * @param {Number} level
	 * @param {Number} attack
	 */
	initStatus:function(glasses,time,level,attack){
		this.glassesAll=glasses;
		this.glassesNow=this.glassesAll;
		this.timeAll=time;
		this.timeNow=this.timeAll;
		//TODO 尽量独立开
		this.level=level;
		this.attack=attack;
	},
	//设置图标
	setHeroIcon:function(icon){
		this.heroIcon=icon;
	},
	setGlassesIcon:function(icon){
		this.glassesIcon=icon;
	},
	setTimeIcon:function(icon){
		this.timeIcon=icon;
	},
	setScoreIcon:function(icon){
		this.scoreIcon=icon;
	},
	setScoreAddIcon:function(icon){
		this.scoreAddIcon=icon;
	},
	setFireIcon:function(icon){
		this.fireIcon=icon;
	},
	/**
	 * 加分
	 */
	addBaseScore:function(score){
		this.baseScore+=score;
		this.scoreAddIcon.setString("+"+score);
		this.scoreAddIcon.setVisible(true);
		this.scoreAddIcon.runAction(cc.sequence(cc.fadeIn(0.01),cc.fadeOut(0.5)));
	},
	
	/**
	 * 主角开火
	 */
	fire:function(){
		if(this.glassesNow>0){
			this.glassesNow--;
			this.glassesIcon.setPercent((this.glassesNow/this.glassesAll)*100);
			this.filter.setBlurSize((this.glassesAll-this.glassesNow)/this.glassesAll*100);
			this.AnimationLayer.fire();
			//audioEngine.playEffect(res.xrayEffect, false);
		}
	},
	/**
	 * 修复
	 */
	repair:function(){
		if(this.glassesNow<this.glassesAll){
			this.glassesNow++;
			this.glassesIcon.setPercent((this.glassesNow/this.glassesAll)*100);
		}
		this.filter.setBlurSize((this.glassesAll-this.glassesNow)/this.glassesAll*100);
	},
	/**
	 * 击中Boss
	 */
	hitBoss:function(){
		this.timeNow+=this.attack;
		if(this.timeNow>this.timeAll){
			this.timeNow=this.timeAll;
		}
		this.EnemyLayer.postHited();
	},
	/**
	 * 掉落装备
	 * @param pos
	 * @param type
	 * @param odds
	 */
	leftEquipment:function(pos){
		//TODO 随机公式
		var random=Math.random();
		var odds=0.0;
		if(random<odds){//60%机会
			var rewardAttr={};
			rewardAttr.pos=pos;
			rewardAttr.type=TagOfSprite.repair;
			this.rewards.push(rewardAttr);
		}
		else if(random<(odds+1)/2){//20%机会
			var rewardAttr={};
			rewardAttr.pos=pos;
			rewardAttr.type=TagOfSprite.glasses;
			this.rewards.push(rewardAttr);
		}
	},
	/**
	 * 更新状态：时间，分数
	 * 调动更新函数：渲染更新
	 * @param distance
	 */
	update:function(distance){
		//分数
		this.timeIcon.setPercent((this.timeNow/this.timeAll)*100);
		this.score=this.baseScore+distance;
		this.scoreIcon.setString(this.score);
		//rewards实现
		while(this.rewards.length>0){
			var rewardAttr=this.rewards.pop();
			var pos=rewardAttr.pos;
			var type=rewardAttr.type;
			var name=null;
			if(type==TagOfSprite.glasses){
				name=GlassesMaps.find(this.GameScene.tagOfScene).find("name");
			}
			else{
				name="#repair.png";
			}
			var backgroundLayer=this.BackgroundLayer;
			var reward=new Reward(backgroundLayer.spriteSheet,
					backgroundLayer.space,
					pos,
					name);
			reward._mapIndex=backgroundLayer.mapIndex+1;
			backgroundLayer.objects.push(reward);
		}
		//渲染
		if(this.filter){
			this.filter.update();
		}
	},
	/**
	 * 游戏结束
	 */
	askForGameOver:function(tagOfGameOver){
		
		this.pause();

		if(!this.GameOverLayer){
			this.GameOverLayer=new GameOverLayer(tagOfGameOver);
			this.GameScene.addChild(this.GameOverLayer);
		}
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
