/*
 * @description: 缓存数据优化
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月29日
 * @lastDate: 2021年6月19日17:21:16 原来逻辑是在 uniapp 中使用, 现在做了 html5 兼容
 * 
 * 使用方法 【  
 *     一、设置缓存  
 *         string    cache.put('k', 'string你好啊');  
 *         json      cache.put('k', { "b": "3" }, 2);  
 *         array     cache.put('k', [1, 2, 3]);  
 *         boolean   cache.put('k', true);  
 *     二、读取缓存  
 *         默认值    cache.get('k')  
 *         string    cache.get('k', '你好')  
 *         json      cache.get('k', { "a": "1" })  
 *     三、移除/清理    
 *         移除: cache.remove('k');
 *         清理：cache.clear();   
 * 】  
 * @type {String}
 */


let cache = {
	base: {
		postfix: '_HzyaLogTimeCache', // 时间缓存后缀
		sysName: 'HzyaLog_', //* 缓存名前缀
	},
	/**  
	 * 设置缓存   
	 * @param  {[type]} k [键名]  
	 * @param  {[type]} v [键值]  
	 * @param  {[type]} t [过期时间、单位秒] 不设置则永不超时
	 */
	put: function (k, v, t) {
		if (k.length == false) {
			return console.error('请设置键名');
		}
		if (v.length == false) {
			return console.info('无数据不保存');
		}
		let obj = {
			type: typeof k
		}

		try {
			obj['data'] = JSON.stringify(v);
		} catch (error) {
			obj['data'] = '请设置规范的值';
		}

		localStorage.setItem(cache.base.sysName + k, JSON.stringify(obj));
		let seconds = parseInt(t);
		if (seconds > 0) {
			let timestamp = Date.parse(new Date());
			timestamp = timestamp / 1000 + seconds;
			localStorage.setItem(k + cache.base.postfix, timestamp + "");
		} else {
			localStorage.removeItem(k + cache.base.postfix);
		}
	},
	/**  
	 * 获取缓存   
	 * @param  {[type]} k   [键名]  
	 * @param  {[type]} def [获取为空时默认]  
	 */
	get: function (k, def) { //debugger
		/**
		 * TODO
		 * 超时是否删除
		 */
		let deadtime = parseInt(localStorage.getItem(k + cache.base.postfix)); //* 校验是否超时
		if (deadtime) {
			if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
				if (def) {
					return def;
				} else {
					console.info('数据已过期');
					this.remove(k);
					return false;
				}
			}
		}
		let res = localStorage.getItem(cache.base.sysName + k);
		if (res) {
			return JSON.parse(JSON.parse(res)['data']);
		} else {
			if (def == undefined || def == "") {
				def = false;
			}
			return def;
		}
	},
	/**
	 * 删除缓存
	 * @param {string} k [键名]
	 * */
	remove: function (k) {
		localStorage.removeItem(cache.base.sysName + k); //* 移除
		localStorage.removeItem(k + cache.base.postfix); //* 移除失效时间
	},
	//* 清空所有缓存
	clear: function () {
		localStorage.clear();
	},
	//* 获取当前用户信息
	getUserInfo: function () {
		return localStorage.removeItem(cache.base.sysName + 'userInfo');
	}
}