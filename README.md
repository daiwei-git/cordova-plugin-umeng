# 说明

友盟统计、友盟性能检测SDK、消息推送 Cordova 插件。由于隐私政策原因，默认自动收集已改为手动收集，请在适当的时候使用 init 函数初始化。

## SDK 版本

本插件已升级到最新版本，支持最新的友盟 SDK：

### Android 版本
- **友盟统计 (Analytics)**: 9.8.5
- **友盟性能监控 (APM)**: 2.0.4  
- **友盟消息推送 (Push)**: 6.7.4
- **ASMS**: 1.8.7.2

### iOS 版本
- **UMCommon**: 7.4.2
- **UMAPM**: 1.8.3
- **UMPush**: 4.8.0
- **UMCommonLog**: 2.0.0
- **UMDevice**: 2.2.3

## 新特性

### v4.0.0 更新内容

✨ **重大改进**：
- ✅ 升级到最新的友盟 SDK 版本
- ✅ Android 端使用 Maven 依赖管理，不再需要手动下载 SDK 文件
- ✅ iOS 端使用 CocoaPods 依赖管理，自动管理依赖
- ✅ 简化了安装过程，减少插件体积
- ✅ 更容易升级和维护
- ✅ 支持最新的 Android 和 iOS 系统

⚠️ **重要变更 (Breaking Changes)**：
- **Android 最低版本要求**: minSdkVersion 从 8 提升到 19 (Android 4.4+)
  - 如果您需要支持更旧的 Android 版本，请继续使用 3.x 版本
  - Android 4.4 以下的设备市场占有率已经非常低（< 1%）
- **首次构建时间**: iOS 首次构建需要下载 CocoaPods 依赖，可能需要几分钟
- **依赖管理**: 不再使用本地 SDK 文件，改用在线依赖下载

## 安装

### 前提条件

**Android**:
- 无需额外配置，Maven 会自动下载依赖

**iOS**:
- 确保已安装 CocoaPods: `sudo gem install cocoapods`
- Cordova iOS 平台需要支持 CocoaPods (Cordova 9.0.0+)

### 使用 npm 安装

```shell
npm i @daiweinpm/cordova-plugin-umengsdk
```

### 使用 Cordova CLI 安装

```shell
cordova plugin add @daiweinpm/cordova-plugin-umengsdk --variable APPKEY=YOUR_APPKEY
```

### 从 GitHub 安装

```shell
cordova plugin add https://github.com/daiwei-git/cordova-plugin-umeng.git --variable APPKEY=YOUR_APPKEY
```

### 构建项目

```shell
# 构建 iOS 项目
cordova build ios

# 构建 Android 项目
cordova build android
```

**注意**: iOS 首次构建时，CocoaPods 会自动下载依赖，可能需要较长时间，请耐心等待。

### 使用方式

```javascript
/**
 * 请在代码中引入这一句，或者从 window 中使用 window.UMSDK
 */
declare const UMSDK;

/**
 * 插件安装失败时此对象可能无法使用，所以需要加入判断
 */
if (UMSDK) {
    /**
     * 预初始化（可选）
     * 在某些情况下，您可能需要在 init 之前调用 preInit
     * @param appKey - 友盟 AppKey
     * @param channelId - 渠道 ID
     */
    UMSDK.preInit(appKey, channelId): Promise<any>;

    /**
     * 初始化友盟 SDK（必须）
     * 注意: 即使您已经在 AndroidManifest.xml 中配置过 appkey 和 channel 值，
     * 也需要在 App 代码中调用初始化接口。
     * 
     * @param appKey - 友盟 AppKey
     * @param channelId - 渠道 ID
     * @param deviceType - 设备类型，1 为手机、2 为盒子，默认为手机
     * @param pushSecret - 推送密钥 Push 推送业务的 secret
     */
    UMSDK.init(appKey, channelId, deviceType, pushSecret): Promise<any>;

    /**
     * 开启统计日志模式
     * @param isOpen - true 开启，false 关闭
     */
    UMSDK.setLogEnabled(isOpen): Promise<any>;

    /**
     * 用户登录
     * @param userId - 用户 ID
     * @param provider - 提供者（可选）
     */
    UMSDK.login(userId, provider): Promise<any>;

    /**
     * 用户登出
     * logout 调用后，不再发送账号内容
     */
    UMSDK.logout(): Promise<any>;
    
    /**
     * 设置页面采集模式
     * @param mode - 采集模式: "auto" = 自动（默认），"manual" = 手动
     */
    UMSDK.setPageCollectionMode(mode): Promise<any>;
    
    /**
     * 手动采集页面开始
     * 必须配对调用 onPageStart 和 onPageEnd 两个函数来完成统计
     * 若只调用某一个函数不会生成有效数据
     * 在该页面展示时调用 onPageStart，当退出该页面时调用 onPageEnd
     * 
     * @param pageName - 页面名称
     */
    UMSDK.onPageStart(pageName): Promise<any>;

    /**
     * 手动采集页面结束
     * 必须与 onPageStart 配对调用
     * 
     * @param pageName - 页面名称
     */
    UMSDK.onPageEnd(pageName): Promise<any>;

    /**
     * 自定义事件埋点
     * @param name - 事件名称
     * @param attributes - 自定义参数对象（可选）
     */
    UMSDK.onEvent(name, attributes: {}): Promise<any>;

    /**
     * 注册消息推送
     * @returns Promise 返回设备 token
     */
    UMSDK.registerPush(): Promise<any>;

    /**
     * 获取设备信息
     * @returns Promise 返回设备信息对象
     */
    UMSDK.getDeviceInfo(): Promise<any>;

    /**
     * 获取 OAID（仅 Android）
     * @returns Promise 返回 OAID
     */
    UMSDK.getOaid(): Promise<any>;

    /**
     * 程序退出时保存统计数据（仅 Android）
     * 在应用退出时调用此方法保存统计数据
     */
    UMSDK.onKillProcess(): Promise<any>;
}
```

## 使用示例

### 基本初始化

```javascript
// 在应用启动时初始化
document.addEventListener('deviceready', function() {
    if (typeof UMSDK !== 'undefined') {
        // 开启日志（开发阶段）
        UMSDK.setLogEnabled(true)
            .then(() => console.log('友盟日志已开启'))
            .catch(err => console.error('开启日志失败:', err));

        // 初始化 SDK
        UMSDK.init('YOUR_APPKEY', 'YOUR_CHANNEL', 1, 'YOUR_PUSH_SECRET')
            .then(() => {
                console.log('友盟 SDK 初始化成功');
            })
            .catch(err => {
                console.error('友盟 SDK 初始化失败:', err);
            });
    }
}, false);
```

### 用户登录登出

```javascript
// 用户登录
UMSDK.login('user123')
    .then(() => console.log('用户登录成功'))
    .catch(err => console.error('登录失败:', err));

// 用户登出
UMSDK.logout()
    .then(() => console.log('用户登出成功'))
    .catch(err => console.error('登出失败:', err));
```

### 页面统计

```javascript
// 方式1: 自动页面统计（推荐）
UMSDK.setPageCollectionMode('auto');

// 方式2: 手动页面统计
UMSDK.setPageCollectionMode('manual');

// 页面开始
UMSDK.onPageStart('HomePage')
    .then(() => console.log('页面统计开始'))
    .catch(err => console.error('页面统计失败:', err));

// 页面结束
UMSDK.onPageEnd('HomePage')
    .then(() => console.log('页面统计结束'))
    .catch(err => console.error('页面统计失败:', err));
```

### 自定义事件

```javascript
// 简单事件
UMSDK.onEvent('ButtonClick')
    .then(() => console.log('事件已记录'))
    .catch(err => console.error('事件记录失败:', err));

// 带参数的事件
UMSDK.onEvent('Purchase', {
    product: 'Premium',
    price: 99.99,
    currency: 'USD'
})
    .then(() => console.log('购买事件已记录'))
    .catch(err => console.error('事件记录失败:', err));
```

### 消息推送

```javascript
// 注册推送
UMSDK.registerPush()
    .then(deviceToken => {
        console.log('推送注册成功，设备 Token:', deviceToken);
        // 将 token 发送到您的服务器
    })
    .catch(err => {
        console.error('推送注册失败:', err);
    });
```

### 获取设备信息

```javascript
UMSDK.getDeviceInfo()
    .then(deviceInfo => {
        console.log('设备信息:', deviceInfo);
        // deviceInfo 包含: uuid, platform, model, version 等
    })
    .catch(err => {
        console.error('获取设备信息失败:', err);
    });
```

## 注意事项

1. **隐私政策**: 根据最新的隐私政策要求，必须在用户同意隐私政策后再调用 `init` 方法
2. **初始化时机**: 建议在 `deviceready` 事件触发后初始化 SDK
3. **页面统计**: 如果使用手动页面统计，必须配对调用 `onPageStart` 和 `onPageEnd`
4. **日志模式**: 生产环境请关闭日志模式 `setLogEnabled(false)`
5. **Android 权限**: 插件已自动添加必要的权限到 AndroidManifest.xml
6. **iOS 配置**: 如需使用推送功能，需要在 Xcode 中配置推送证书和 capabilities

## 版本兼容性

- **Cordova**: 9.0.0+
- **Cordova-Android**: 8.0.0+
- **Cordova-iOS**: 5.0.0+
- **Android**: API 19+ (Android 4.4+)
- **iOS**: 10.0+

## 迁移指南

### 从 3.x 升级到 4.0.0

1. **移除旧插件**:
   ```shell
   cordova plugin remove cordova-plugin-umengsdk
   ```

2. **安装新插件**:
   ```shell
   cordova plugin add @daiweinpm/cordova-plugin-umengsdk --variable APPKEY=YOUR_APPKEY
   ```

3. **iOS 额外步骤**:
   - 确保已安装 CocoaPods
   - 首次构建时，CocoaPods 会自动下载依赖
   - 如遇到问题，可以尝试 `pod repo update`

4. **API 变化**: 
   - API 接口保持不变，无需修改代码
   - 只是底层 SDK 版本升级

## 常见问题

### Q: iOS 构建失败，提示找不到 CocoaPods？
A: 请确保已安装 CocoaPods: `sudo gem install cocoapods`，然后运行 `pod setup`

### Q: Android 构建失败，提示找不到依赖？
A: 请确保网络连接正常，Maven 需要从网络下载依赖。如在中国大陆，可能需要配置 Maven 镜像。

### Q: 推送功能不工作？
A: 请确保：
- 正确配置了 pushSecret
- iOS 需在 Xcode 中配置推送证书
- Android 需在友盟后台配置推送

### Q: 统计数据不准确？
A: 请确保：
- 正确调用了 init 方法
- 页面统计使用了正确的模式（自动或手动）
- 手动模式下，onPageStart 和 onPageEnd 成对调用

## 技术支持

- **Issues**: https://github.com/daiwei-git/cordova-plugin-umeng/issues
- **友盟官方文档**: https://developer.umeng.com/
- **Email**: 通过 GitHub Issues 联系

## 许可证

MIT License

## 贡献

欢迎提交 Pull Request 和 Issue！

---

如有问题或建议，欢迎在 GitHub 上提 Issue。