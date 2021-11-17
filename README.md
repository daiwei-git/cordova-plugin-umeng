# cordova-plugin-umeng

cordova 集成友盟统计安卓SDK 9.4+ IOS SDK 7.3+

# 新版说明
新增友盟自动化测试SDK，友盟性能检测SDK，由于隐私政策原因，默认自动收集已改为手动收集，请在适当的时候使用init函数初始化

# 安装

```shell
npm i @daiweinpm/cordova-plugin-umeng
```

```shell
cordova plugin add @daiweinpm/cordova-plugin-umeng
```

```shell
cordova build ios
cordova build android
```

### 使用方式
```Javascript

/**
 * 请在代码中引入这一句 或者从window中使用 window.Umeng，
 */
declare const Umeng;

/**
 * 插件安装失败时此对象可能无法使用 所以需要加入判断
 */
if (Umeng) {
    /**
    * 注意: 即使您已经在AndroidManifest.xml中配置过appkey和channel值，也需要在App代码中调
    * 用初始化接口（如需要使用AndroidManifest.xml中配置好的appkey和channel值，
    * init调用中appkey和channel参数请置为null，IOS 的参数 deviceType 和 pushSecret 暂不生效。
    * appKey 友盟appkey
    * channelId 渠道ID
    * deviceType 设备类型，1 为手机、2 为盒子，默认为手机
    * pushSecret 推送密钥 Push 推送业务的secret
    */
    Umeng.init(appKey, channelId, deviceType, pushSecret);

    /**
     * eventId 统计微博应用中”转发”事件发生的次数，那么在转发的函数里调用
     */
    Umeng.onEvent(eventId);
    
    /**
     * eventId 统计微博应用中”转发”事件发生的次数，那么在转发的函数里调用
     * label 不同的标签会分别进行统计，方便同一事件的不同标签的对比,为nil或空字符串时后台会生成和eventId同的标签。
     */
    Umeng.onEventWithLabel(eventId, label);

    /**
     * eventId 统计微博应用中”转发”事件发生的次数，那么在转发的函数里调用
     * attributes 属性中的key－value必须为String类型, 每个应用至多添加500个自定义事件，key不能超过100个 
     */
    Umeng.onEventWithParameters(eventId, attributes);

    /**
     * eventId 统计微博应用中”转发”事件发生的次数，那么在转发的函数里调用
     * attributes 属性中的key－value必须为String类型, 每个应用至多添加500个自定义事件，key不能超过100个
     * counter 自定义数值
     */
    Umeng.onEventWithCounter(eventId, attributes, counter);

    /**
     * 必须配对调用onPageBegin:和onPageEnd:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据；
     * 在该页面展示时调用onPageBegin:，当退出该页面时调用onPageEnd。
     */
    Umeng.onPageBegin(Pagename);

    /**
     * 必须配对调用beginLogPageView:和onPageEnd:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据；
     * 在该页面展示时调用beginLogPageView:，当退出该页面时调用onPageEnd。
     */
    Umeng.onPageEnd(Pagename);

    /**
     * 获取设备ID
     * callBack 回调函数
     */
    Umeng.getDeviceId(callBack);

    /**
     * 获取设备信息
     * callBack 回调函数
     */
    Umeng.getDeviceInfo(callBack);

    /**
     * 【友盟+】在统计用户时以设备为标准，如果需要统计应用自身的账号，可以使用此功能
     * UserID 用户ID
     */
    Umeng.profileSignInWithPUID(UserID);

    /**
     * 【友盟+】在统计用户时以设备为标准，如果需要统计应用自身的账号，可以使用此功能
     * UserID 用户ID
     * provider 不能以下划线”_”开头，使用大写字母和数字标识; 如果是上市公司，建议使用股票代码。
     */
    Umeng.profileSignInWithPUIDWithProvider(UserID, provider);

    /**
     * Signoff调用后，不再发送账号内容
     */
    Umeng.profileSignOff(); 

    /**
     * 打开统计SDK调试模式
     */
    Umeng.setLogEnabled(true); 
}
```