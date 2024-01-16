/*
 * @description: 这个 js 主要提供 console 的便捷使用方法
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021年6月19日17:29:59
 * @FilePath: ViewApp/util/console.js
 */


$.log = {
  //* 普通的日志打印
  log: function(text) {
    console.info(text);
    return this;
  },
  //* 耗时计算开始, 耗时计算需要 time 与 timeEnd 一起使用
  time: function() {
    console.time('耗时计算: ');
    return this;
  },
  //* 耗时计算结束
  timeEnd: function() {
    console.time('耗时计算: ');
    return this;
  },
  //* 打印错误信息
  error: function(text) {
    console.error(text);
    return this;
  },
  /**
   * * 输出表格形态的数据(在动态绘制时的检查使用较多), 
   * * 第一个参数是必需的(array|object), 且对象类型需要是数组或对象, 多个参数请使用数组包裹;
   * * 第二个参数只能是对应的键名, 使用数组包裹;
   * * 使用示例:
   * i var site1 = { name : "Runoob", site : "www.runoob.com" }
   * i var site2 = { name : "Google", site : "www.google.com" }
   * i var site3 = { name : "Taobao", site : "www.taobao.com" }
   * i console.table([site1, site2, site3], ["site"]);
  */
  table: function(data, col) {
    console.table(data, col);
    return this;
  },
  //* 分组开始, 分组需要 group 与 groupEnd 一起使用
  group: function(text) {
    console.group(text);
    return this;
  },
  //* 分组结束
  groupEnd: function() {
    console.groupEnd();
    return this;
  },
  //* 追踪函数调用过程
  trace: function() {
    console.trace();
    return this;
  },
  //* 输出带有样式的日志
  style: function(text, style) {
    let obj = {
      text: text || '',
      style: style || 'color: #4db078; font-size: 14px;'
    }
    console.info('%c' + obj.text, obj.style);
    return this;
  }
  
}