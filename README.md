# cordova-plugin-umeng

cordova 集成友盟统计

# 安装
```shell
cordova plugin add @daiweinpm/cordova-plugin-umeng --variable UMENG_APPKEY_ANDROID=you android appkey --variable UMENG_CHANNEL_ANDROID=you android channel --variable UMENG_APPKEY_IOS=you is appkey --variable UMENG_CHANNEL_IOS=you ios channel
```

```shell
cordova build ios
cordova build android
```

### 使用方式
```Javascript

declare const Umeng;

if (Umeng) {
    /**
    * 注意: 即使您已经在AndroidManifest.xml中配置过appkey和channel值，也需要在App代码中调
    * 用初始化接口（如需要使用AndroidManifest.xml中配置好的appkey和channel值，
    * init调用中appkey和channel参数请置为null）。
    */
    Umeng.init();

    // debug 模式
    Umeng.setDebugMode(false);

    /**
     * 设置组件化的Log开关
     * 参数: boolean 默认为false，如需查看LOG设置为true
     */ 
    Umeng.setLogEnabled();
}
```