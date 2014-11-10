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
	xRays:[],
	
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
		//载入人物动作缓存
		cc.spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheet=new cc.SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheet);
		//添加物理绑定
		this.sprite=cc.PhysicsSprite.create("#runner0.png");
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
		if(this.stat==RunnerStat.running||this.stat==RunnerStat.jumpDown){
			this.body.applyImpulse(cp.v(0,jump_vel),cp.v(0,0));
			this.stat=RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
			this.fire();
		}
	},
	//激光
	fire:function(){
		cc.log("fashe");
		this.bullet=new cc.Sprite("#runner0.png");
		this.bullet.setPosition(this.sprite.getPosition());
		this.addChild(this.bullet);
		this.bullet.stopAllActions();
		
		var vel=this.body.getVel().x+1000;
		var time=g_winwidth/vel;
		cc.log(vel+"--"+time);
		
		this.bullet.runAction(cc.moveBy(time, cc.p(g_winwidth+600,0)));
		this.xRays.push(this.bullet);
		
		
//		var sprite=cc.PhysicsSprite.create("#runner0.png");
//		var contentSize=sprite.getContentSize();
//		var body=new cp.Body(1,cp.momentForBox(1, contentSize.width, contentSize.height));
//		body.p=cc.p(this.sprite.getPositionX(), this.sprite.getPositionY());
//		body.applyImpulse(cp.v(450, 0),cp.v(0, 0));
//		this.space.addBody(body);
//		this.spriteSheet.addChild(sprite);
//		shape=new cp.BoxShape(body,contentSize.width-14,contentSize.height);
//		this.space.addShape(shape);
//		sprite.setBody(body);
		

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
		//倾斜角设置，防止侧翻
		var angle=this.body.getAngle();
		if(angle<-0.5)this.body.setAngle(-0.5);
		if(angle>0.5)this.body.setAngle(0.5);
		
		var BackgourndLayer = this.getParent().getChildByTag(TagOfLayer.Background);
		var objects = BackgourndLayer.objects;
		var xRay = null;
		var object = null;
		var i = 0;
		var j = 0;
		var xRayPosX = null;
		var objectPosX = null;
		var xRayPosY = null;
		var objectPosY = null;
		var distanceX = null;
		var distanceY = null;
		var movR = [];
		var movO = [];
		if(this.xRays.length >0){
			for(i = 0; i < this.xRays.length; i++ ){
				xRay = this.xRays[i];
				xRayPosX = xRay.getPositionX();
				xRayPosY = xRay.getPositionY();
				cc.log(xRayPosX+"--"+this.sprite.getPositionX());
				if((xRayPosX - this.sprite.getPositionX()) > (g_winwidth - g_startX)){
					movR.push(i);
				}else if(objects.length > 0){
					for(j = 0; j < objects.length; j++){
						object = objects[j];
						cc.log(xRay+"xray");
						cc.log(object + "boject");
						objectPosX = object.sprite.getPositionX();
						distanceX = xRay.getContentSize().width;
						objectPosY = object.sprite.getPositionY();
						distanceY = object.sprite.getContentSize().height;
						if((objectPosX - xRayPosX)<=distanceX && (objectPosY - xRayPosY)<=distanceY){
							movO.push(j);
							movR.push(i);
							cc.log('BOOM!');
						}
					}
				}
			}
		}
		cc.log(g_winwidth+"--"+g_startX);
		for(i = 0; i < movO.length; i++ ){
			BackgourndLayer.removeOne(movO[i]);
			cc.log('BOOM!!!!');
		}
		for(i = 0; i < movO.length; i++ ){
			BackgourndLayer.spliceOne(movO[i]-i);
			cc.log('BOOM!');
		}
		for(i = 0; i < movR.length; i++ ){
			this.xRays[movR[i]].removeFromParent();
			cc.log('XU!!!!');
		}
		for(i = 0; i < movR.length; i++ ){
			this.xRays.splice(movR[i]-i,1);
			cc.log('XU!!!!');
		}
		
		this.sprite.no
	},
	//释放动作
	onExit:function(){
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
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
	},
	removeOneRay:function(i){
		cc.log(i);
		this.xRays[i].removeFromParent();
	}
});