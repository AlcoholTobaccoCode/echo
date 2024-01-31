/*
 * @description: 这个js主要提供将所有页面公共的css、js依赖便捷导入的方法
 * @Author: duQings duqings@foxmail.com
 * @Date: 2020年12月12日17:00:27
 * @FilePath: assets/js/common.js
 */

// TODO 区域
/**
 * ?
 * 
 */

//* 系统根目录
var $rootPath = './';

//* 通用js和css
;
(function () {

    //* 页面预设置 区域
    document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no" />');

    /**
     * 通用 css、js 依赖集合
     * type: 类型
     * url: 地址
     * remark: 说明, 备注
     * ps: 注意引用关系
     */
    var relyOnGather = [{
        type: 'js',
        url: $rootPath + 'util/rem.js',
        remark: 'rem 移动端响应式 JS 支持'
    }, {
        type: 'js',
        url: $rootPath + 'common/js/jquery@2.1.4.min.js',
        remark: 'jq 支持'
    }, {
        type: 'js',
        url: $rootPath + 'common/js/vue@2.6.14.min.js',
        remark: 'vue 依赖'
    }, {
        type: 'js',
        url: $rootPath + 'common/http/index.js',
        remark: '网络请求统一管理'
    }, {
        type: 'js',
        url: $rootPath + 'util/plugins/vant/vant@2.14.min.js',
        remark: 'vant js 依赖'
    }, {
        type: 'js',
        url: $rootPath + 'util/console.js',
        remark: 'console 简易封装'
    }, {
        type: 'js',
        url: $rootPath + 'util/vconsole.min.js',
        remark: 'console 简易封装'
    }, {
        type: 'js',
        url: $rootPath + 'util/util.js',
        remark: '工具类'
    }, {
        type: 'js',
        url: $rootPath + 'common/js/common.js',
        remark: '公共 js'
    }, {
        type: 'js',
        url: $rootPath + 'common/js/cache.js',
        remark: '工具类'
    }, {
        type: 'js',
        url: $rootPath + 'util/plugins/html2canvas/html2canvas.min.js',
        remark: ' html2canvas'
    }, {
        type: 'css',
        url: $rootPath + 'util/plugins/vant/index.min.css',
        remark: 'vant css 依赖'
    }, {
        type: 'css',
        url: $rootPath + 'common/css/common.min.css',
        remark: '公共 css 样式'
    }];

    //* link 标签拼接
    var cssHeader = '<link rel="stylesheet" type="text/css" href="';
    var cssFooter = '" />';

    //* script 标签拼接
    var jsHeader = '<script type="text/javascript" src="';
    var jsFooter = '"></script>';

    //	js依赖引入
    //* 公共 js 依赖
    for (var i = 0; i < relyOnGather.length; i++) {
        var item = relyOnGather[i];
        switch (item.type.toLowerCase()) {
            case 'css':
            case 'style':
                document.write(cssHeader + item.url + cssFooter);
                break;
            case 'js':
            case 'javascript':
                document.write(jsHeader + item.url + jsFooter);
                break;
            default:
                console.warn('依赖类型异常, 请检查: ' + item.type + '; ' + item.remark);
                break;
        }
    }
})();