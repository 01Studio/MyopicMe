/*
 * 游戏人物动作层
 * 
 */

var AnimationLayer=cc.Layer.extend({
	sprite:null,
	body:null,
	shape:null,
	spriteSheet:null,
	space:null,
	runningAction:null,
	jumpUpAction:null,
	jumpDownAction:null,
	stat:0,
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
		this.initAction();
		//debug使用
		this._debugNode=cc.PhysicsDebugNode.create(this.space);
		this.addChild(this._debugNode, 10);
	},
	//动作初始化
	init:function(){
		cc.spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheet);
		//添加物理绑定
		this.sprite=cc.PhysicsSprite.create(res.runner_png);
		var contentSize=this.sprite.getContentSize();
		this.body=new cp.Body(1,cp.momentForBox(1, contentSize.width, contentSize.height));
		this.body.p=cc.p(g_startX, g_groundHeight+contentSize.height/2);
		this.body.applyImpulse(cp.v(150, 0),cp.v(0, 0));
		this.space.addBody(this.body);
		this.spriteSheet.addChild(this.sprite);
		this.shape=new cp.BoxShape(this.body,contentSize.width-14,contentSize.height);
		this.space.addShape(this.shape);
		this.sprite.setBody(this.body);
		
		//设置监听
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan:this.onTouchBegan,
			onTouchMoved:this.onTouchMoved,
			onTouchEnded:this.onTouchEnded
		}, this);
		
		this.scheduleUpdate();
	},
	//触屏动作
	onTouchBegan:function(touch,event){
		event.getCurrentTarget().jump();
		return true;
	},
	//跳
	jump:function(){
		cc.log("jump");
		if(this.stat==RunnerStat.running||this.stat==RunnerStat.jumpDown){
			this.body.applyImpulse(cp.v(220,450),cp.v(0,0));
			//applyImpulse(cp.v(x轴冲力,y轴冲力),cp.v(角加速度,弹力));
			this.stat=RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	},
	//update
	update:function(){
		var vel=this.body.getVel();
		if(this.stat==RunnerStat.jumpUp){
			if(vel.y<0.1){
				this.stat=RunnerStat.jumpDown;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		}
		else if(this.stat==RunnerStat.jumpDown){
			if(vel.y==0){
				this.stat=RunnerStat.running;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}
	},
	//释放动作
	onExit:function(){
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
	},
	//初始化所有可能动作
	initAction:function(){
		//初始化动作：跑
		var frames=[];
		for(var i=0;i<8;i++){
			var str="runner"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		var animation=cc.Animation.create(frames, 0.1);
		this.runningAction=new cc.RepeatForever(new cc.Animate(animation));
		this.runningAction.retain();
		//初始化动作：跳
		frames=[];
		for(var i=0;i<4;i++){
			var str="runnerJumpUp"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		animation=cc.Animation.create(frames, 0.2);
		this.jumpUpAction=new cc.Animate(animation);
		this.jumpUpAction.retain();
		//初始化动作：跳下
		frames=[];
		for(var i=0;i<2;i++){
			var str="runnerJumpDown"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		animation=cc.Animation.create(frames, 0.4);
		this.jumpDownAction=new cc.Animate(animation);
		this.jumpDownAction.retain();
		
		this.stat=RunnerStat.running;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.runningAction);
	},
	//跟踪人物
	getEye:function(){
		var x=this.sprite.getPositionX()-g_startX;
		var y=this.sprite.getPositionY()-g_groundHeight;
		return cc.size(x, y);
	}
});