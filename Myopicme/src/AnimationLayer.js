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
	//创建
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
		this.initAction();
		//debug使用
		this._debugNode=new cc.PhysicsDebugNode(this.space);
		this.addChild(this._debugNode, 10);
	},
	//动作初始化
	init:function(){
		//载入人物动作缓存
		cc.spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheet);
		//添加物理绑定
		this.sprite=new cc.PhysicsSprite("#runner0.png");
		var contentSize=this.sprite.getContentSize();
		//cp.Body(质量,cp.momentForBox(转动惯量,宽,高)); Infinity无限大，使人物无法旋转
		this.body=new cp.Body(1,cp.momentForBox(Infinity, contentSize.width, contentSize.height));
		this.body.p=cc.p(g_startX, g_groundHeight+contentSize.height/2);
		//添加冲量
		//applyImpulse(cp.v(x轴冲力,y轴冲力),cp.v(角加速度,弹力));
		this.body.applyImpulse(cp.v(start_speed, 0),cp.v(0, 0));
		this.space.addBody(this.body);
		this.spriteSheet.addChild(this.sprite);
		//将物理计算与贴图结合
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
		//当人物为跑步或下降状态时可跳起
		if(this.stat==RunnerStat.running||this.stat==RunnerStat.jumpDown){
			this.body.applyImpulse(cp.v(0,jump_vel),cp.v(0,0));
			this.stat=RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
			this.getParent().getParent().getChildByTag(TagOfLayer.Foreground).repair();
		}
	},
	//TODO 最好将此部分单独处理，AnimationLayer为人物动作处理层
	//发射激光
	fire:function(){
		cc.log("fire");
		
		var sprite=new cc.PhysicsSprite("#runner0.png");
		var contentSize=sprite.getContentSize();
		var body=new cp.Body(1,cp.momentForBox(1, contentSize.width, contentSize.height));
		body.p=cc.p(this.sprite.getPositionX(), this.sprite.getPositionY());
		//添加浮力
		body.applyForce(cp.v(0, -space_grivaty),cp.v(0, 0));
		//添加子弹初始冲量
		body.applyImpulse(cp.v(450, 0),cp.v(0, 0));
		this.space.addBody(body);
		this.spriteSheet.addChild(sprite);
		var shape=new cp.BoxShape(body,contentSize.width-14,contentSize.height);
		//设置无相互作用力
		shape.setSensor(true);
		this.space.addShape(shape);
		sprite.setBody(body);
				
		this.getParent().getParent().BlurCityScene(60);
		
		return true;
	},
	
	//update
	update:function(){
		//设置最大速度
		var vel=this.body.getVel();
//		//当人物速度小于100时（即人物碰撞），游戏结束
//		if(vel.x<100){
//			cc.director.pause();
//		}
		//下降动作
		if(this.stat==RunnerStat.jumpUp){
			if(vel.y<0.1){
				this.stat=RunnerStat.jumpDown;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		}
		//恢复跑步动作
		else if(this.stat==RunnerStat.jumpDown){
			if(vel.y>=0){
				this.stat=RunnerStat.running;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}
		//限制最大速度
		else if(vel.x<max_speed){
			vel.x+=1;
			this.body.setVel(vel);
			//cc.log("vel.x="+this.body.getVel().x);
		}
	},
	//跟踪人物
	getEye:function(){
		var x=this.sprite.getPositionX()-g_startX;
		var y=this.sprite.getPositionY()-g_groundHeight;
		return cc.size(x, y);
	},
	//TODO 初始化所有可能动作  改进：将所有数值设为全局变量
	initAction:function(){
		//初始化动作：跑
		var frames=[];
		for(var i=0;i<8;i++){
			var str="runner"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		var animation=new cc.Animation(frames, 0.1);
		this.runningAction=new cc.RepeatForever(new cc.Animate(animation));
		this.runningAction.retain();
		//初始化动作：跳
		frames=[];
		for(var i=0;i<4;i++){
			var str="runnerJumpUp"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		animation=new cc.Animation(frames, 0.2);
		this.jumpUpAction=new cc.Animate(animation);
		this.jumpUpAction.retain();
		//初始化动作：跳下
		frames=[];
		for(var i=0;i<2;i++){
			var str="runnerJumpDown"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		animation=new cc.Animation(frames, 0.4);
		this.jumpDownAction=new cc.Animate(animation);
		this.jumpDownAction.retain();

		this.stat=RunnerStat.running;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.runningAction);
	},
	//释放动作
	onExit:function(){
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
	}
});