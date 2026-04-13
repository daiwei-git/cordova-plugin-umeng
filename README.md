# cordova-plugin-umeng

[![npm version](https://img.shields.io/npm/v/@daiweinpm/cordova-plugin-umengsdk.svg?style=flat-square)](https://www.npmjs.com/package/@daiweinpm/cordova-plugin-umengsdk)
[![license](https://img.shields.io/npm/l/@daiweinpm/cordova-plugin-umengsdk.svg?style=flat-square)](https://github.com/daiwei-git/cordova-plugin-umeng/blob/main/LICENSE)
[![platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-brightgreen?style=flat-square)](#版本兼容性)

> 友盟统计 · 友盟性能监控 (APM) · 友盟消息推送 — Cordova / Ionic 插件

由于隐私政策原因，默认自动采集已改为手动采集，请在用户同意隐私协议后调用 `init` 完成初始化。

---

## 目录

- [SDK 版本](#sdk-版本)
- [v4.0.0 新特性](#v400-新特性)
- [安装](#安装)
- [快速开始](#快速开始)
- [API 参考](#api-参考)
- [使用示例](#使用示例)
- [注意事项](#注意事项)
- [版本兼容性](#版本兼容性)
- [迁移指南](#迁移指南)
- [常见问题](#常见问题)
- [技术支持](#技术支持)
- [许可证](#许可证)

---

## SDK 版本

| 平台 | 组件 | 版本 |
|------|------|------|
| **Android** | 友盟统计 (Analytics) | 9.8.5 |
| | 友盟性能监控 (APM) | 2.0.4 |
| | 友盟消息推送 (Push) | 6.7.4 |
| | ASMS | 1.8.7.2 |
| **iOS** | UMCommon | 7.4.2 |
| | UMAPM | 1.8.3 |
| | UMPush | 4.8.0 |
| | UMCommonLog | 2.0.0 |
| | UMDevice | 2.2.3 |

---

## v4.0.0 新特性

### ✨ 重大改进

- Android 端使用 **Maven** 依赖管理，不再需要手动下载 SDK 文件
- iOS 端使用 **CocoaPods** 依赖管理，自动管理依赖
- 插件体积从 ~50 MB 降至 ~50 KB（减少 99%）
- 升级到最新友盟 SDK，支持最新 Android / iOS 系统

### ⚠️ 破坏性变更 (Breaking Changes)

| 变更项 | 说明 |
|--------|------|
| Android minSdkVersion | 从 **8** 提升到 **19**（Android 4.4+）；如需支持更旧版本请使用 3.x |
| 首次构建时间 | iOS 首次构建需下载 CocoaPods 依赖，可能需要几分钟 |
| 依赖管理 | 不再使用本地 SDK 文件，改为在线下载 |

> 详细变更请查看 [CHANGELOG.md](CHANGELOG.md)，迁移步骤请查看 [MIGRATION.md](MIGRATION.md)。

---

## 安装

### 前提条件

- **Android**: 无需额外配置，Maven 会自动下载依赖
- **iOS**: 需安装 CocoaPods — `sudo gem install cocoapods`；Cordova iOS ≥ 9.0.0

### 通过 npm

```shell
npm i @daiweinpm/cordova-plugin-umengsdk
```

### 通过 Cordova CLI

```shell
cordova plugin add @daiweinpm/cordova-plugin-umengsdk --variable APPKEY=YOUR_APPKEY
```

### 从 GitHub

```shell
cordova plugin add https://github.com/daiwei-git/cordova-plugin-umeng.git --variable APPKEY=YOUR_APPKEY
```

### 构建

```shell
cordova build android
cordova build ios    # 首次构建 CocoaPods 会自动下载依赖，请耐心等待
```

---

## 快速开始

```javascript
document.addEventListener('deviceready', async () => {
  if (typeof UMSDK === 'undefined') return;

  // 1. 开启日志（仅开发阶段）
  await UMSDK.setLogEnabled(true);

  // 2. 初始化（必须在用户同意隐私协议之后）
  await UMSDK.init('YOUR_APPKEY', 'YOUR_CHANNEL', 1, 'YOUR_PUSH_SECRET');

  // 3. 注册推送（可选）
  const token = await UMSDK.registerPush();
  console.log('Device Token:', token);
}, false);
```

---

## API 参考

所有方法均返回 `Promise`，可通过 `window.UMSDK` 或直接使用全局变量 `UMSDK` 调用。

### 初始化

| 方法 | 参数 | 说明 |
|------|------|------|
| `preInit(appKey, channelId)` | `appKey`: string, `channelId`: string | 预初始化（可选），在某些场景下需先于 `init` 调用 |
| `init(appKey, channelId, deviceType, pushSecret)` | `appKey`: string, `channelId`: string, `deviceType`: number (1=手机, 2=盒子), `pushSecret`: string | **必须调用**。初始化友盟 SDK，即使已在 AndroidManifest.xml 中配置也需要调用 |
| `setLogEnabled(isOpen)` | `isOpen`: boolean | 开启 / 关闭统计日志，生产环境请设为 `false` |

### 用户账号

| 方法 | 参数 | 说明 |
|------|------|------|
| `login(userId, provider?)` | `userId`: string, `provider`: string (可选) | 用户登录 |
| `logout()` | — | 用户登出，调用后不再发送账号内容 |

### 页面统计

| 方法 | 参数 | 说明 |
|------|------|------|
| `setPageCollectionMode(mode)` | `mode`: `"auto"` \| `"manual"` | 设置页面采集模式，默认 `"auto"` |
| `onPageStart(pageName)` | `pageName`: string | 手动模式下，页面展示时调用 |
| `onPageEnd(pageName)` | `pageName`: string | 手动模式下，退出页面时调用；必须与 `onPageStart` 配对 |

### 事件埋点

| 方法 | 参数 | 说明 |
|------|------|------|
| `onEvent(name, attributes?)` | `name`: string, `attributes`: object (可选) | 自定义事件埋点 |

### 推送与设备

| 方法 | 参数 | 说明 |
|------|------|------|
| `registerPush()` | — | 注册消息推送，返回设备 token |
| `getDeviceInfo()` | — | 获取设备信息对象（uuid, platform, model 等） |
| `getOaid()` | — | 获取 OAID（仅 Android） |
| `onKillProcess()` | — | 程序退出时保存统计数据（仅 Android） |

---

## 使用示例

### 用户登录 / 登出

```javascript
// 登录
await UMSDK.login('user123');
// 带平台参数登录
await UMSDK.login('user123', 'wechat');
// 登出
await UMSDK.logout();
```

### 页面统计

```javascript
// 方式 1: 自动（推荐）
await UMSDK.setPageCollectionMode('auto');

// 方式 2: 手动
await UMSDK.setPageCollectionMode('manual');
await UMSDK.onPageStart('HomePage');
// ... 用户浏览页面 ...
await UMSDK.onPageEnd('HomePage');
```

### 自定义事件

```javascript
// 简单事件
await UMSDK.onEvent('ButtonClick');

// 带参数
await UMSDK.onEvent('Purchase', {
  product: 'Premium',
  price: 99.99,
  currency: 'CNY'
});
```

### 消息推送

```javascript
try {
  const deviceToken = await UMSDK.registerPush();
  console.log('Device Token:', deviceToken);
  // 将 token 上传到您的服务器
} catch (err) {
  console.error('推送注册失败:', err);
}
```

### 获取设备信息

```javascript
const info = await UMSDK.getDeviceInfo();
console.log(info); // { uuid, platform, model, version, ... }
```

---

## 注意事项

| # | 说明 |
|---|------|
| 1 | **隐私政策**：必须在用户同意隐私政策后再调用 `init` |
| 2 | **初始化时机**：在 `deviceready` 事件触发后初始化 |
| 3 | **页面统计**：手动模式下 `onPageStart` 和 `onPageEnd` 必须成对调用 |
| 4 | **日志**：生产环境请关闭 `setLogEnabled(false)` |
| 5 | **Android 权限**：插件已自动添加所需权限到 AndroidManifest.xml |
| 6 | **iOS 推送**：需在 Xcode 中配置推送证书与 Capabilities |

---

## 版本兼容性

| 依赖 | 最低版本 |
|------|---------|
| Cordova | 9.0.0+ |
| Cordova-Android | 8.0.0+ |
| Cordova-iOS | 5.0.0+ |
| Android API | 19 (Android 4.4+) |
| iOS | 10.0+ |

---

## 迁移指南

### 从 3.x 升级到 4.0.0

```shell
# 1. 移除旧插件
cordova plugin remove cordova-plugin-umengsdk

# 2. 安装新版本
cordova plugin add @daiweinpm/cordova-plugin-umengsdk --variable APPKEY=YOUR_APPKEY

# 3. 重新构建
cordova build
```

- **iOS 额外步骤**：确保已安装 CocoaPods；如遇问题执行 `pod repo update`
- **API 无变化**：JavaScript API 完全兼容，无需修改业务代码

> 完整迁移指南请查看 [MIGRATION.md](MIGRATION.md)。

---

## 常见问题

<details>
<summary><b>iOS 构建失败，提示找不到 CocoaPods？</b></summary>

请确保已安装 CocoaPods：

```shell
sudo gem install cocoapods
pod setup
```
</details>

<details>
<summary><b>Android 构建失败，提示找不到依赖？</b></summary>

请确保网络连接正常。如在中国大陆，可在 `build-extras.gradle` 中配置阿里云 Maven 镜像：

```gradle
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/google/' }
    }
}
```
</details>

<details>
<summary><b>推送功能不工作？</b></summary>

- 检查 `pushSecret` 是否正确
- iOS 需在 Xcode 中配置推送证书
- Android 需在友盟后台配置推送参数
</details>

<details>
<summary><b>统计数据不准确？</b></summary>

- 确认已正确调用 `init`
- 检查页面统计模式（自动 / 手动）
- 手动模式下确保 `onPageStart` 和 `onPageEnd` 成对调用
</details>

---

## 技术支持

- 🐛 **Issues**: [GitHub Issues](https://github.com/daiwei-git/cordova-plugin-umeng/issues)
- 📖 **友盟官方文档**: [developer.umeng.com](https://developer.umeng.com/)

---

## 许可证

[MIT](LICENSE) © daiwei

## 贡献

欢迎提交 Pull Request 和 Issue！