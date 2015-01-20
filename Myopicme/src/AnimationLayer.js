/*
 * 游戏人物动作层
 * 
 */

var AnimationLayer=cc.Layer.extend({
	controller:null,
	
	sprite:null,
	body:null,
	shape:null,
	spriteSheetRunner:null,
	spriteSheetBullet:null,
	space:null,
	runningAction:null,
	jumpUpAction:null,
	jumpDownAction:null,
	stat:0,
	bullets:[],
	recognizer:null,
	//创建
	ctor:function(space){
		this._super();
		this.space=space;
		this.init();
		this.initAction();
		//debug使用
		this._debugNode=new cc.PhysicsDebugNode(this.space);
		this.addChild(this._debugNode, 10);
		cc.log("animationLayer inited");
	},
	onExit:function(){
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
		this._super();
	},
	
	//TODO 后期添加蹲下的动作
	//动作初始化
	init:function(){
		this.controller=Controller.getInstance();

		this.bullets=[];
		//载入人物动作缓存
		cc.spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheetRunner=new cc.SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheetRunner);
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
		this.spriteSheetRunner.addChild(this.sprite);
		//将物理计算与贴图结合
		this.shape=new cp.BoxShape(this.body,contentSize.width-14,contentSize.height);
		this.shape.setCollisionType(TagOfSprite.runner);
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

		cc.spriteFrameCache.addSpriteFrames(res.objects_plist);
		this.spriteSheetBullet=new cc.SpriteBatchNode(res.objects_png);
		this.addChild(this.spriteSheetBullet);
		
		this.recognizer=new SimpleRecognizer();
		
		this.scheduleUpdate();
	},
	
	//触屏动作
	onTouchBegan:function(touch,event){
		var pos=touch.getLocation();
		event.getCurrentTarget().recognizer.beginPoint(pos.x,pos.y);
		return true;
	},
	onTouchMoved:function(touch,event){
		var pos=touch.getLocation();
		event.getCurrentTarget().recognizer.movePoint(pos.x,pos.y)
	},
	onTouchEnded:function(touch,event){
		var rtn=event.getCurrentTarget().recognizer.endPoint();
		cc.log("rtn="+rtn);
		switch(rtn){
		case "left":
			event.getCurrentTarget().left();
			break;
		case "right":
			event.getCurrentTarget().right();
			break;
		case "up":
			event.getCurrentTarget().up();
			break;
		case "down":
			event.getCurrentTarget().down();
			break;
		case "jump":
			event.getCurrentTarget().jump();
			break;
		default:
			break;
		}
	},
	//加速
	left:function(){
		var vel=this.body.getVel();
		if(vel.x>max_speed+speed_step){
			this.body.applyImpulse(cp.v(-speed_step,0),cp.v(0,0));
		}
		else if(this.body.getVel().x>max_speed){
			vel.x=max_speed;
			this.body.setVel(vel);
		}
	},
	//加速
	right:function(){
		this.body.applyImpulse(cp.v(speed_step,0),cp.v(0,0));
	},
	//向上
	up:function(){
		//当人物为跑步或下降状态时可跳起
		if(this.stat==RunnerStat.running||this.stat==RunnerStat.jumpDown){
			this.body.applyImpulse(cp.v(0,jump_vel*2),cp.v(0,0));
			this.stat=RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
		else{
			this.body.applyImpulse(cp.v(0,jump_vel*2),cp.v(0,0));
		}
	},
	//下滑动作
	down:function(){
		this.body.applyImpulse(cp.v(0, -800),cp.v(0, 0));
	},
	//小跳
	jump:function(){
		//当人物为跑步或下降状态时可跳起
		if(this.stat==RunnerStat.running||this.stat==RunnerStat.jumpDown){
			this.body.applyImpulse(cp.v(0,jump_vel),cp.v(0,0));
			this.stat=RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	},
	//TODO 最好将此部分单独处理，AnimationLayer为人物动作处理层
	//发射激光
	fire:function(){
		
		var sprite=new cc.PhysicsSprite("#bullet.png");
		var contentSize=sprite.getContentSize();
		var body=new cp.Body(1,cp.momentForBox(1, contentSize.width, contentSize.height));
		body.p=cc.p(this.sprite.getPositionX(), this.sprite.getPositionY());
		//添加浮力
		body.applyForce(cp.v(0, -space_gravity),cp.v(0, 0));
		//添加子弹初始冲量
		body.applyImpulse(cp.v(bullet_speed+this.body.getVel().x, 0),cp.v(0, 0));
		this.space.addBody(body);
		this.spriteSheetBullet.addChild(sprite);
		var shape=new cp.BoxShape(body,contentSize.width,contentSize.height);
		//设置无相互作用力
		shape.setSensor(true);
		shape.setCollisionType(TagOfSprite.xray);
		this.space.addShape(shape);
		sprite.setBody(body);
		sprite.shape = shape;
		//将激光加入子弹数组
		this.bullets.push(sprite);
		
		return true;
	},
	
	//update
	update:function(){

		//改变shape,以适应图形大小的变化
		this.space.removeShape(this.shape);
		this.shape=new cp.BoxShape(this.body,this.sprite.getContentSize().width,this.sprite.getContentSize().height);
		this.space.addShape(this.shape);
		
		//设置最大速度
		var vel=this.body.getVel();
		//当人物速度小于50时（即人物碰撞），游戏结束
		if(vel.x<dead_speed){
			this.controller.askForGameOver(TagOfGameOver.hit);
		}
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
		if(vel.x<max_speed){
			vel.x+=1;
			this.body.setVel(vel);
			//cc.log("vel.x="+this.body.getVel().x);
		}
		//删除超出屏幕的子弹
		for (var i = 0; i < this.bullets.length; i++) {
			if (this.bullets[i].getPositionX()-this.sprite.getPositionX()>cc.director.getWinSize().width
					||this.sprite.getPositionX()-this.bullets[i].getPositionX()>cc.director.getWinSize().width) {
				this.space.removeShape(this.bullets[i].shape);
				this.bullets[i].removeFromParent();
				this.bullets.splice(i, 1);
			}
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
	//通过shape移除子弹
	removeObjectByShape:function (shape) {
		//利用Array对象的两个方法slice、concat来自定义删除数组的方法
//		Array.prototype.del=function(n) {//n表示第几项，从0开始算起。
//			//prototype为对象原型，注意这里为对象增加自定义方法的方法。
//			if(n<0)//如果n<0，则不进行任何操作。
//				return this;
//			else
//				return this.slice(0,n).concat(this.slice(n+1,this.length));
//			//concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
//			//　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
//			//　　　　　组成的新数组，这中间，刚好少了第n项。
//			//slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
//
//
//		}
		for (var i = 0; i < this.bullets.length; i++) {
			cc.log(this.bullets[i].shape + "------" + shape);
			if (this.bullets[i].shape == shape) {
				this.space.removeShape(shape);
				this.bullets[i].removeFromParent();
				//this.bullets.del(i);

				this.bullets.splice(i, 1);
				break;
			}
		}
	},
});