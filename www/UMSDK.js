var cordova = require('cordova');

module.exports = {
    /**
     * 预初始化
     * @param {*} appKey 
     * @param {*} channelId 
     */
    preInit: function(appKey, channelId) {
      return new Promise(function(resolve, reject) {
			  cordova.exec((res) => {
				  resolve(res);
			  }, (res) => {
				  reject(res);
			  }, "UMSDK", "preInit", [
          appKey, channelId
        ]);
      });
    },

    /**
     * 初始化
     * @param {*} appKey 
     * @param {*} channelId 
     */
    init: function(appKey, channelId, deviceType, pushSecret) {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "init", [
            appKey, channelId, deviceType, pushSecret
          ]);
      });
    },

    /**
     * 打开日志
     * @param {*} isOpen 
     */
    setLogEnabled: function(isOpen) {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "setLogEnabled", [
            isOpen
          ]);
      });
    },

    /**
     * 程序退出时，用于保存统计数据的API
     */
    onKillProcess: function() {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "onKillProcess", []);
      });
    },
    
    /**
     * 获取oaid
     */
    getOaid: function() {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "getOaid", []);
      });
    },

    /**
     * 用户登录
     */
    login: function(userId, platformName) {
      return new Promise(function(resolve, reject) {
        if(platformName === undefined) {
          platformName = null
        }
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "login", [
            userId, platformName
          ]);
      });
    },

    /**
     * 用户登出
     */
    logout: function() {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "logout", []);
      });
    },

    /**
     * 设置页面采集模式
     * @param {*} mode auto 自动采集（默认），manual手动采集
     */
    setPageCollectionMode: function(mode) {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "setPageCollectionMode", [
            mode
          ]);
      });
    },

    /**
     * 手动采集页面开始
     * @param {*} pageName 
     */
    onPageStart: function(pageName) {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "onPageStart", [
            pageName
          ]);
      });
    },

    /**
     * 手动采集页面结束
     * @param {*} pageName 
     */
    onPageEnd: function(pageName) {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "onPageEnd", [
            pageName
          ]);
      });
    },


    /**
     * 埋点事件
     * @param {*} name 
     */
    onEvent: function(name, map) {
      return new Promise(function(resolve, reject) {
        if(map === undefined) {
          map = {}
        }
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "onEvent", [
            name, map
          ]);
      });
    },
    
    /**
     * 注册消息推送
     */
    registerPush: function() {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "registerPush", []);
      });
    },

    /**
     * 获取设备信息
     */
    getDeviceInfo: function() {
      return new Promise(function(resolve, reject) {
        cordova.exec((res) => {
            resolve(res);
          }, (res) => {
            reject(res);
          }, "UMSDK", "getDeviceInfo", []);
      });
    },
};
