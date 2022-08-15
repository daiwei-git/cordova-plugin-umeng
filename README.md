# 说明
友盟统计，友盟性能检测SDK，消息推送，由于隐私政策原因，默认自动收集已改为手动收集，请在适当的时候使用init函数初始化

友盟统计 9.5.1
友盟性能监控 1.7.0
友盟消息推送 6.5.4

# 安装

```shell
npm i @daiweinpm/cordova-plugin-umengsdk
```

```shell
cordova plugin add @daiweinpm/cordova-plugin-umengsdk  --variable APPKEY=YOU_APPKEY
```

```shell
cordova build ios
cordova build android
```

### 使用方式
```Javascript

/**
 * 请在代码中引入这一句 或者从window中使用 window.UMSDK
 */
declare const UMSDK;

/**
 * 插件安装失败时此对象可能无法使用 所以需要加入判断
 */
if (UMSDK) {
    /**
    * 注意: 即使您已经在AndroidManifest.xml中配置过appkey和channel值，也需要在App代码中调
    * 用初始化接口（如需要使用AndroidManifest.xml中配置好的appkey和channel值，
    * init调用中appkey和channel参数请置为null，IOS 的参数 deviceType 和 pushSecret 暂不生效。
    * appKey 友盟appkey
    * channelId 渠道ID
    * deviceType 设备类型，1 为手机、2 为盒子，默认为手机
    * pushSecret 推送密钥 Push 推送业务的secret
    */
    UMSDK.init(appKey, channelId, deviceType, pushSecret): Promise<any>;

    /**
     * 打开统计日志模式
     */
    UMSDK.setLogEnabled(isOpen): Promise<any>;

    /**
     * logout 调用后，不再发送账号内容
     * userId 用户ID
     * provider 提供者（可选）
     */
    UMSDK.login(userId, provider): Promise<any>;

    /**
     * logout 调用后，不再发送账号内容
     */
    UMSDK.logout(): Promise<any>;
    
    /**
     * 设置采集模式
     * mode auto = 自动（默认），manual = 手动
     */
    UMSDK.setPageCollectionMode(mode): Promise<any>;
    
    /**
     * 手动采集页面开始
     * 必须配对调用onPageStart:和onPageEnd:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据；
     * 在该页面展示时调用onPageStart:，当退出该页面时调用onPageEnd。
     */
    UMSDK.onPageStart(Pagename): Promise<any>;

    /**
     * 手动采集页面开始
     * 必须配对调用beginLogPageView:和onPageEnd:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据；
     * 在该页面展示时调用beginLogPageView:，当退出该页面时调用onPageEnd。
     */
    UMSDK.onPageEnd(Pagename): Promise<any>;

    /**
     * 事件埋点
     * name 事件名
     * attributes 自定义参数
     */
    UMSDK.onEvent(name, attributes: {}): Promise<any>;

    /**
     * 注册消息推送
     */
    UMSDK.registerPush(): Promise<any>;

    /**
     * 获取设备信息
     * callBack 回调函数
     */
    UMSDK.getDeviceInfo(callBack): Promise<any>;
}
```