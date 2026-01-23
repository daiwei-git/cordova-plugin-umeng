# 更新日志 (Changelog)

## [4.0.0] - 2026-01-23

### 🔴 重大破坏性变更 (Breaking Changes)

⚠️ **请仔细阅读以下内容再决定是否升级！**

1. **Android 最低版本要求提升**
   - minSdkVersion: 8 (Android 2.2+) → 19 (Android 4.4+)
   - **如果您需要支持 Android 4.4 以下的设备，请不要升级到此版本**
   - Android 4.4 以下设备市场占有率 < 1%（2024 年数据）

2. **依赖管理方式改变**
   - Android: 使用 Maven 依赖管理（需要网络下载）
   - iOS: 使用 CocoaPods 依赖管理（需要网络下载）
   - 首次构建时间会变长（需要下载依赖）

3. **iOS CocoaPods 依赖版本固定**
   - 使用精确版本号（=）而非兼容版本（~>）
   - 确保生产环境稳定性，避免意外的版本升级

### 🎉 SDK 版本升级 (SDK Version Upgrades)

- **升级到最新的友盟 SDK 版本**
  - Android: Umeng Common 9.5.1 → 9.8.5
  - Android: Umeng APM 1.7.0 → 2.0.4
  - Android: Umeng Push 6.5.4 → 6.7.4
  - Android: Umeng ASMS 1.6.3 → 1.8.7.2
  - iOS: UMCommon 7.3.7 → 7.4.2
  - iOS: UMAPM 1.7.0 → 1.8.3
  - iOS: UMPush 4.0.3 → 4.8.0

### ✨ 新特性 (Features)

- **Android 依赖管理现代化**
  - 使用 Maven Central 依赖管理替代手动打包的 SDK 文件
  - 自动下载和更新依赖
  - 减小插件体积

- **iOS 依赖管理现代化**
  - 使用 CocoaPods 依赖管理替代手动打包的 Framework
  - 自动管理依赖版本
  - 更好的版本兼容性

### 📝 文档改进 (Documentation)

- 完全重写 README.md，提供更详细的使用指南
- 添加完整的 API 文档和使用示例
- 添加常见问题解答 (FAQ)
- 添加迁移指南
- 添加版本兼容性说明

### 🔧 技术改进 (Technical Improvements)

- 简化安装流程
- 提高构建速度
- 减少插件体积
- 更好的错误处理

### 📦 依赖更新 (Dependency Updates)

#### Android
- com.umeng.umsdk:common: 9.5.1 → 9.8.5
- com.umeng.umsdk:asms: 1.6.3 → 1.8.7.2
- com.umeng.umsdk:apm: 1.7.0 → 2.0.4
- com.umeng.umsdk:push: 6.5.4 → 6.7.4
- com.umeng.umsdk:alicloud-httpdns: 1.3.2.3.1 → 1.3.13
- com.umeng.umsdk:alicloud_beacon: 1.0.5 → 1.0.8
- com.umeng.umsdk:alicloud-utils: 2.0.0.1 → 2.0.5
- com.umeng.umsdk:agoo-accs: 3.4.2.7.4 → 3.5.1.10
- com.umeng.umsdk:agoo_networksdk: 3.5.8.4 → 4.0.0.2
- com.umeng.umsdk:agoo_tnet4android: 3.1.14.10.2 → 3.1.14.13
- com.umeng.umsdk:umdid: 1.0.0 → 1.5.4

#### iOS
- UMCCommon: 7.3.7 → 7.4.2
- UMAPM: 1.7.0 → 1.8.3
- UMPush: 4.0.3 → 4.8.0
- UMCommonLog: 2.0.0 (保持)
- UMDevice: → 2.2.3 (新增)

### 🚨 注意事项 (Notes)

1. **iOS 用户**: 首次构建需要较长时间，因为 CocoaPods 需要下载依赖
2. **Android 用户**: 确保网络连接正常，Maven 需要从互联网下载依赖
3. **升级用户**: 建议先移除旧版本插件，再安装新版本

### 🔄 迁移指南 (Migration Guide)

从 3.x 升级到 4.0.0:

1. 移除旧插件:
   ```bash
   cordova plugin remove cordova-plugin-umengsdk
   ```

2. 安装新插件:
   ```bash
   cordova plugin add @daiweinpm/cordova-plugin-umengsdk --variable APPKEY=YOUR_APPKEY
   ```

3. iOS 额外步骤:
   - 确保已安装 CocoaPods: `sudo gem install cocoapods`
   - 如遇问题，运行: `pod repo update`

4. API 保持不变，无需修改代码

---

## [3.0.1] - 之前版本

### 特性
- 友盟统计 9.5.1
- 友盟性能监控 1.7.0
- 友盟消息推送 6.5.4
- 基本的统计、推送功能
- 手动页面统计
- 自定义事件埋点

---

详细的版本历史请参考 [GitHub Releases](https://github.com/daiwei-git/cordova-plugin-umeng/releases)
