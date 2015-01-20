/**
 * 数据存储
 * @returns {StorageManager}
 */
StorageManager=function(){
},
StorageManager.prototype={
	constructor:StorageManager,
	ls:cc.sys.localStorage,	//本地存储
	//数据初始化
	reset:function(){
		this.ls.setItem("unlocked",0);
		this.ls.setItem("GlassesUsing",TagOfGlasses.House);
		GlassesMaps.each(this.resetRepaired);
		SceneMaps.each(this.resetHeightScore);
	},
	resetRepaired:function(num,key){
		cc.sys.localStorage.setItem(GlassesMaps.find(key).find("name"),1);
	},
	resetHeightScore:function(num,key){
		cc.sys.localStorage.setItem(SceneMaps.find(key).find("name"),0);
	},
	//解锁下一关
	unlockNext:function(key){
		key=key+1;
		var num=this.unlocked();
		if(key>num){
			this.ls.setItem("unlocked",key);
		}
	},
	//已解锁最大关卡
	unlocked:function(){
		var lock=this.ls.getItem("unlocked");
		var num=parseInt(lock);
		if("NaN"==num.toString()){
			num=0;
			this.ls.setItem("unlocked",num);
		}
		return num;
	},
	/**
	 * 更新最高分
	 * @param key
	 * @param score
	 * @returns {Boolean}
	 */
	updateHighestScore:function(key,score){
		var scored=this.getHightestScore(key);
		if(scored>=score){
			return false;
		}
		else{
			this.ls.setItem(SceneMaps.find(key).find("name"),score);
			return true;
		}
	},
	getHightestScore:function(key){
		var scoredString=this.ls.getItem(SceneMaps.find(key).find("name"));
		var scored=parseInt(scoredString);
		if("NaN"==scored.toString()){
			scored=0;
		}
		return scored;
	},
	/**
	 * 修复眼镜
	 * @param key
	 * @param num
	 */
	repairGlasses:function(key,num){
		var repaired=this.getGlassesRepaired(key);
		repaired+=num;
		if(repaired>GlassesMaps.find(key).find("fixed")){
			repaired=GlassesMaps.find(key).find("fixed");
		}
		this.ls.setItem(GlassesMaps.find(key).find("name"),repaired);
	},
	getGlassesRepaired:function(key){
		var name=GlassesMaps.find(key).find("name");
		var value=this.ls.getItem(name);
		var num=parseInt(value);
		if("NaN"==num.toString()){
			num=1;
			this.ls.setItem(name,num);
		}
		return num;
	},
	/**
	 * 当前正使用眼镜的索引
	 * @returns
	 */
	getGlassesUsingKey:function(){
		var keyString=this.ls.getItem("GlassesUsing");
		var key=parseInt(keyString);
		if("NaN"==key.toString()){
			//cc.log(key.toString());
			key=0;
		}
		return key;
	},
	setGlassesUsing:function(key){
		this.ls.setItem("GlassesUsing",key);
	}
}