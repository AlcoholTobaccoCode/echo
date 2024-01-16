/*
 * @description: 这个js主要提供 ajax 统一管理支持
 * @Author: 关键代码取自 `银都项目 PC 端`
 * @Date: 2021年6月19日16:52:17
 * @FilePath: ViewApp/common/http/index.js
 */

/**
 * TODO
 * 请求前 loading
 * 制作状态管理
 * code: 0 请求成功
 * 
 * 
 */
var config = {
  /** 运行环境：dev/test/pro */
  env: "dev",
  /** 系统路径定义 */
  dev: {
    sys: '',
    web: ''
  },
  test: {
    sys: '',
    web: ''
  },
  pro: {
    sys: 'http://hzya.ufyct.com:9090/',
    web: ''
  }
};

config.model = {
  rootPath: function () {
    if ("dev" == config.env) {
      return config.dev;
    } else if ("test" == config.env) {
      return config.test;
    } else {
      return config.pro;
    }
  }
};

config.ajax = {
  /**
   * post异步请求
   * @param {object} vm 当前 vue 对象
   * @param {string} url 接口地址
   * @param {JSON} params  JSON参数
   * @param {function} callback  回调方法
   */
  post: function (url, params, success, error, vm) {
    if (!params) {
      params = {};
    }
    $.ajax({
      url: url,
      data: JSON.stringify(params),
      type: "POST",
      // dataType: "JSON",
      dataType: "text",
      timeout: 10000, //* 超时时间
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      cache: false,
      async: true,
      beforeSend: function (xhr) {
        return false;
        if (vm) {
          $.utils.loading.show(vm);
        }
      },
      complete: function (xhr, ts) {
        if (ts == 'timeout') { //超时,status还有success,error等值的情况
          if (vm) {
            vm.$toast.fail('请求超时');
          } else {
            alert('请求超时');
          }
        }
      },
      success: function (result, textStatus, xhr) {
        if (vm) {
          $.utils.loading.hide(vm);
        }
        if (success) {
          success(result);
        }
        return this;
      },
      error: function (xhr, errorMsg, errorObj) {
        if (vm) {
          $.utils.loading.hide(vm);
          vm.$toast.fail(errorObj);
        } else {
          alert(errorObj);
        }
        if (error) {
          error(errorObj);
        }
        $.log.error('请求失败, 请联系管理员').error(errorObj);
        return this;
      }
    });
  },
  /**
   * post同步请求并返回结果
   * @param {string} url 接口地址
   * @param {JSON} params  JSON参数
   */
  postback: function (url, params) {
    if (!params) {
      params = {};
    }
    var resultJson = null;
    $.ajax({
      url: url,
      data: JSON.stringify(params),
      type: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      cache: false,
      async: false,
      beforeSend: function (xhr) {

      },
      complete: function (xhr, ts) {

      },
      success: function (result, textStatus, xhr) {

      },
      error: function (xhr, errorMsg, errorObj) {

      }
    });
    return resultJson;
  },
  /**
   * post异步请求
   * @param {object} vm 当前 vue 对象
   * @param {string} url 接口地址
   * @param {JSON} params  JSON参数
   * @param {function} success  成功时回调
   * @param {function} error  失败时回调
   * @param {object} vm  vue 实例
   * @param {object} config  额外配置
   */
  custom: function (url, params, success, error, vm, config) {
    if (!params) {
      params = {};
    }

    let obj = {
      url: url,
      data: JSON.stringify(params),
      type: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      cache: false,
      async: true,
      beforeSend: function (xhr) {
        if (vm) {
          $.utils.loading.show(vm);
        }
      },
      complete: function (xhr, ts) {

      },
      success: function (result, textStatus, xhr) {
        if (vm) {
          $.utils.loading.hide(vm);
        }
        if (success) {
          success(result);
        }
        return this;
      },
      error: function (xhr, errorMsg, errorObj) {
        if (vm) {
          $.utils.loading.hide(vm);
        }
        if (error) {
          error(errorObj);
        }
        $.log.error('请求失败, 请联系管理员').error(errorObj);
        return this;
      }
    };

    if (config) {
      for (let i in config) {
        obj[i] = config[i];
      }
    }

    $.ajax(obj);
  },
};