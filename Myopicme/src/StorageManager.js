/**
 * 数据存储
 * @returns {StorageManager}
 */
StorageManager=function(){
},
StorageManager.prototype={
	constructor:StorageManager,
	ls:cc.sys.localStorage,	//本地存储
	init:function(){
		this.ls.setItem("unlocked",1);//开启关卡
	},
	unlock:function(){//解锁下一关
		var num=this.unlocked();
		num++;
		this.ls.setItem("unlocked",num);
	},
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
	 * @param {Number} level
	 * @param {Number} score
	 * @returns {Boolean}
	 */
	updateHighestScore:function(level,score){
		var scored=this.getHightestScore(level);
		if(scored>=score){
			return false;
		}
		else{
			this.ls.setItem(level,score);
			return true;
		}
	},
	getHightestScore:function(level){
		var scoredString=this.ls.getItem(level);
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
	glassRepair:function(key,num){
		var repaired=this.glassRepaired(key);
		repaired+=num;
		if(repaired>key.repaired){
			repaired=key.repaired;
		}
		cc.log("re="+key.repaired+" r="+repaired);
		this.ls.setItem(key.name,repaired);
	},
	glassRepaired:function(key){
		var lock=this.ls.getItem(key.name);
		var num=parseInt(lock);
		if("NaN"==num.toString()){
			num=1;
			this.ls.setItem(key.name,num);
		}
		return num;
	},
	/**
	 * 当前正在使用的眼镜
	 * @returns {string}
	 */
	glassUsing:function(){
		var name=this.ls.getItem("glassUsing");
		if(""==name){
			this.ls.setItem("glassUsing",TagOfGlass.Def.name);
			name=TagOfGlass.Def.name;
		}
		return name;
	},
	changeGlass:function(key){
		this.ls.setItem("glassUsing",key.name);
	}
}