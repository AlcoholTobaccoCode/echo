/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li 		狗头保命
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:		如果工具没能达到预期
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri 	那肯定是使用者的错
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur: 	我的代码没问题
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::  /doge
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 * 
 * @description: 工具类
 * @Maintainer: duqings@foxmail.com
 * @Date: 2021年3月29日
 * @use: import { moduleName } '@/common/js/util'
 */

let _debounceTimeout = null, //* 防抖定时器对象
  _throttleRunning = false //* 节流

$.utils = {
  /**
   * 防抖
   * @param {Function} 执行函数
   * @param {Number} delay 延时ms   
   */
  debounce: function (fn, delay = 500) {
    clearTimeout(_debounceTimeout);
    _debounceTimeout = setTimeout(function () {
      fn();
    }, delay);
  },

  /**
   * 节流
   * @param {Function} 执行函数
   * @param {Number} delay 延时ms  
   */
  throttle: function (fn, delay = 500) {
    if (_throttleRunning) {
      return;
    }
    _throttleRunning = true;
    fn();
    setTimeout(function () {
      _throttleRunning = false;
    }, delay);
  },
  /**
   * 消息提示
   * @param {string} 提示文本
   * @param {param} 配置参数 {
   * 	duration: 延迟时间(ms), 默认 1500ms
   * 	mask: 是否显示透明蒙层, 默认关闭
   *  icon: 是否显示图标 (详细说明: {
   * 		success: 显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值,
   * 		loading: 显示加载图标，此时 title 文本最多显示 7 个汉字长度。,
   * 		none: 不显示图标，此时 title 文本在小程序最多可显示两行，App仅支持单行显示。
   * 	})
   * }
   */
  msg: function (title = '', param = {}) {
    if (!title) return;
    //TODO 判断数字 0
    /* uni.showToast({
      title,
      duration: param.duration || 1500,
      mask: param.mask || false,
      icon: param.icon || 'none'
    }); */
  },
  /**
   * @param {string} [title=''] 提示文字
   * @param {object} [param={}] 配置: 失败、成功、完成回调, 暂时没配置
   * 
   * 使用:
   * 	开启: this.$util.loading.show(this, 'xx');
   * 	关闭: this.$util.loading.hide(this, 'xx');
   * @returns
   */
  loading: {
    show(vm, title = '') {
      vm.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: title || '请求中...',
      });
    },
    hide(vm) {
      // uni.hideLoading();
      vm.$toast.clear();
    }
  },

  /**
   * 格式化时间戳 Y-m-d H:i:s
   * @param {String} format Y-m-d H:i:s
   * @param {Number} timestamp 时间戳   
   * @return {String}
   */
  dateFormat: function (format, timeStamp) {
    if ('' + timeStamp.length <= 10) {
      timeStamp = +timeStamp * 1000;
    } else {
      timeStamp = +timeStamp;
    }
    let _date = new Date(timeStamp),
      Y = _date.getFullYear(),
      m = _date.getMonth() + 1,
      d = _date.getDate(),
      H = _date.getHours(),
      i = _date.getMinutes(),
      s = _date.getSeconds();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    H = H < 10 ? '0' + H : H;
    i = i < 10 ? '0' + i : i;
    s = s < 10 ? '0' + s : s;

    return format.replace(/[YmdHis]/g, key => {
      return {
        Y,
        m,
        d,
        H,
        i,
        s
      } [key];
    });
  },
  /**
   * 获取上周起始时间结束时间、下周起始时间结束时间开始时间和本周起始时间结束时间;(西方时间为基础)
   * @param {number} n 时间偏移基数
   * 上周的开始时间: n == 7
   * 上周的结束时间: n == 1
   * 本周的开始时间: n == 0
   * 本周的结束时间: n == -6
   * 下周的开始时间: n == -7
   * 下周结束时间: n == -13
   * 
   */
  getWeekStartEndTime(n) {
    var now = new Date();
    var year = now.getFullYear();
    //因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if (day !== 0) {
      n = n + (day - 1);
    } else {
      n = n + day;
    }
    if (day) {
      //这个判断是为了解决跨年的问题
      if (month > 1) {
        month = month;
      }
      //这个判断是为了解决跨年的问题,月份是从0开始的
      else {
        year = year - 1;
        month = 12;
      }
    }
    now.setDate(now.getDate() - n);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
    return s;
  },
  /**
   * 获取上周起始时间结束时间、下周起始时间结束时间开始时间和本周起始时间结束时间;(西方时间为基础)
   * @param {number} n 时间偏移基数
   * 上周的时间段: n == -1
   * 本周的时间段: n == 0
   * 下周的时间段: n == 1
   * 
   */
  getWeekStartEndTimeCN(n) {
     //起止日期数组
     var startStop = new Array(); 
     //一天的毫秒数
     var millisecond = 1000 * 60 * 60 * 24; 
     //获取当前时间
     var currentDate = new Date();
     //相对于当前日期 n 个周的日期
     currentDate = new Date(currentDate.getTime() + (millisecond * 7 * n));
     //返回date是一周中的某一天
     var week = currentDate.getDay(); 
     //返回date是一个月中的某一天
     var month = currentDate.getDate();
     //减去的天数
     var minusDay = week != 0 ? week - 1 : 6; 
     //获得当前周的第一天
     var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay)); 
     //获得当前周的最后一天
      var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
     //添加至数组
     startStop.push($.utils.dateFormat('Y-m-d', currentWeekFirstDay)); 
     startStop.push($.utils.dateFormat('Y-m-d', currentWeekLastDay)); 
     return startStop; 
  },
  /**
   * 获取中文的星期
   * @param {string/object} date 传入日期时, 返回该日期代表的星期, 需要至少精确到天
   * 不传时按照当前系统返回
   * 
   */
  getWeek(date) {
    let inDate = date || new Date(),
      now = new Date(inDate),
      day = now.getDay(),
      weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
      week = weeks[day];
    return week;
  },
  //* 参数非空校验
  assert: function (obj, info) {
    if (!obj) { //* 如果传入对象为空
      if (info) { //* 如果有自定义提示信息
        throw (info);
      } else {
        throw ('参数异常');
      }
    }
  },
  isdingding: function () {
    let ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("dingtalk") >= 0;
  },
  /**
   * 获取 url query 传参
   * @param {string} [paramName=''] 参数名
   * @param {string} [url=''] 地址, 选填 默认当前窗口地址
   * @returns
   */
  getUrlQuery: function (paramName = '', url) {

    if (paramName == null) {
      console.error("paramName is null");
      console.error("请输入想要获取的参数名");
      return null;
    }
    var pageUrl = url || window.location.href;
    if (pageUrl.indexOf("?") == -1) { // 没有参数的情况
      return null;
    } else {
      pageUrl = pageUrl.split("?")[1];
      if (pageUrl.indexOf("&") == -1) {
        /*一个参数的情况*/
        /*判断是一个参数还是1+个参数*/
        if (paramName != pageUrl.split("=")[0]) {
          /*参数名是否是传入的参数名相同*/
          // console.error("参数名不相同！");
          return null;
        } else {
          return pageUrl.split("=")[1];
        }
      } else {
        /*多个参数的情况*/
        let paramArray = pageUrl.split("&");
        if (paramArray == null) {
          console.error("paramArray is null");
          return;
        }
        for (let i = 0; i < paramArray.length; i++) {
          let param = paramArray[i].split("=")[0];
          let value = paramArray[i].split("=")[1];
          if (param == null || value == null) {
            console.error("(param||value) is null");
            return;
          }
          if (param == paramName) {
            return value;
          }
        }
      }
      return null;
    }
  },
  /**
   * 判断传入的第一个时间是否小于第二个时间 
   * @param {String} time0 开始时间
   * @param {String} time1 结束时间
   * @return {String} equal: 相等
   */
  dateCompare: function (time0 = '', time1 = '') {
    if (!time0 || time0.length == '' || !time1 || time1.length == '') {
      console.error('请输入开始/结束时间');
      return false;
    }
    let start = new Date(Date.parse(time0));
    let end = new Date(Date.parse(time1));
    if (JSON.stringify(start) == JSON.stringify(end)) {
      return 'equal';
    }
    return start < end;
  },
  /**
   * 数组对象按照 key 排序
   * @param {string} filed 排序字段
   * @param {string} rev 是否倒叙
   * @param {string} primer 数据类型转换
   */
  sortByKey: function (filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
      a = a[filed];
      b = b[filed];
      if (typeof (primer) != 'undefined') {
        a = primer(a);
        b = primer(b);
      }
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 1;
    }
  },
  /**
   * 数组对象去重
   * @param {Array} arr 数组对象
   * @param {string} key 主键 
   */
  listRmDuplicate: function (arr, key) {
    if (arr && arr.length != false && key && key.length != false) {
      let obj = {};
      arr = arr.reduce(function (a, b) {
        obj[b[key]] ? '' : obj[b[key]] = true && a.push(b);
        return a;
      }, []);

      return arr;
    } else {
      return '请传入数组对象和参照 key'
    }

  },
  //* 判断类型集合
  checkStr: function (str, type) {
    switch (type) {
      case 'mobile': //手机号码
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
      case 'tel': //座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card': //身份证
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
      case 'mobileCode': //6位数字验证码
        return /^[0-9]{6}$/.test(str)
      case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^([a-zA-Z0-9_]){6,18}$/.test(str)
      case 'payPwd': //支付密码 6位纯数字
        return /^[0-9]{6}$/.test(str)
      case 'postal': //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'QQ': //QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email': //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money': //金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'URL': //网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
      case 'IP': //IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case 'date': //日期时间
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
          .test(str)
      case 'number': //数字
        return /^[0-9]$/.test(str);
      case 'english': //英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': //中文
        return /^[\\u4E00-\\u9FA5]+$/.test(str);
      case 'lower': //小写
        return /^[a-z]+$/.test(str);
      case 'upper': //大写
        return /^[A-Z]+$/.test(str);
      case 'HTML': //HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  }
}