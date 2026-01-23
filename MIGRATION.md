# 迁移指南 (Migration Guide)

## 从 3.x 升级到 4.0.0

### ⚠️ 重要提示 (Important Notice)

**在升级之前，请务必阅读以下内容！**

### 概述

版本 4.0.0 是一个重大更新，包含**破坏性变更**：

#### 🔴 破坏性变更 (Breaking Changes)

1. **Android 最低版本要求提升**
   - **旧版本**: minSdkVersion = 8 (Android 2.2+)
   - **新版本**: minSdkVersion = 19 (Android 4.4+)
   - **影响**: 如果您的应用需要支持 Android 4.4 以下的设备，请不要升级
   - **统计数据**: Android 4.4 以下设备市场占有率 < 1%（2024 年数据）

2. **依赖管理方式改变**
   - **Android**: 从手动打包的 SDK 文件迁移到 Maven 依赖管理
   - **iOS**: 从手动打包的 Framework 迁移到 CocoaPods 依赖管理
   - **影响**: 首次构建需要从网络下载依赖

3. **SDK 版本大幅升级**
   - 所有 SDK 都升级到了最新版本
   - API 保持兼容，但底层实现有变化

#### 📋 兼容性检查清单

在升级之前，请确认：

- [ ] 您的应用不需要支持 Android 4.4 以下的设备
- [ ] 您的构建环境可以访问互联网（用于下载依赖）
- [ ] iOS 开发环境已安装 CocoaPods
- [ ] 您有时间测试升级后的应用功能

如果以上任何一项不满足，建议继续使用 3.x 版本。

### 主要优势

✅ **更小的插件体积**: 不再包含 SDK 二进制文件  
✅ **自动依赖管理**: Maven/CocoaPods 自动处理依赖关系  
✅ **更容易升级**: 未来只需要修改版本号即可升级  
✅ **更好的兼容性**: 使用最新的 SDK 版本  
✅ **更快的构建**: 依赖缓存加速后续构建  

### 升级步骤

#### 1. 备份项目（推荐）

在开始升级之前，建议先备份您的项目：

```bash
# 提交当前更改
git add .
git commit -m "Before upgrading umeng plugin"

# 或创建备份
cp -r your-project your-project-backup
```

#### 2. 移除旧版本插件

```bash
cordova plugin remove cordova-plugin-umengsdk
```

或者如果使用 npm 包名：

```bash
cordova plugin remove @daiweinpm/cordova-plugin-umengsdk
```

#### 3. 安装新版本

```bash
cordova plugin add @daiweinpm/cordova-plugin-umengsdk@4.0.0 --variable APPKEY=YOUR_APPKEY
```

或从 GitHub 安装：

```bash
cordova plugin add https://github.com/daiwei-git/cordova-plugin-umeng.git#copilot/update-umeng-compatibility --variable APPKEY=YOUR_APPKEY
```

#### 4. 平台特定配置

##### Android

**无需额外配置**，Maven 会自动下载依赖。

如果在中国大陆网络环境下构建较慢，可以配置阿里云 Maven 镜像：

在项目根目录创建或修改 `build-extras.gradle`:

```gradle
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/google/' }
    }
}
```

##### iOS

**确保已安装 CocoaPods**:

```bash
# 检查是否已安装
pod --version

# 如果未安装，运行：
sudo gem install cocoapods
pod setup
```

**首次构建需要时间**：

首次构建 iOS 项目时，CocoaPods 需要下载依赖，这可能需要几分钟时间，请耐心等待。

```bash
# 构建 iOS 项目
cordova build ios
```

如果遇到 CocoaPods 相关问题，可以尝试：

```bash
# 更新 CocoaPods 仓库
pod repo update

# 清理并重新安装
cd platforms/ios
pod deintegrate
pod install
cd ../..
```

#### 5. 构建项目

```bash
# 构建两个平台
cordova build

# 或单独构建
cordova build android
cordova build ios
```

#### 6. 测试应用

升级后，请测试以下功能：

- [ ] SDK 初始化
- [ ] 用户登录/登出
- [ ] 页面统计
- [ ] 自定义事件
- [ ] 消息推送注册
- [ ] 设备信息获取

### API 变化

**好消息**: API 接口**完全兼容**，无需修改您的代码！

所有的 JavaScript API 保持不变：

```javascript
// 这些 API 仍然可以正常使用
UMSDK.init(appKey, channelId, deviceType, pushSecret)
UMSDK.setLogEnabled(true)
UMSDK.login(userId)
UMSDK.logout()
UMSDK.onPageStart(pageName)
UMSDK.onPageEnd(pageName)
UMSDK.onEvent(name, attributes)
UMSDK.registerPush()
UMSDK.getDeviceInfo()
// ... 等等
```

### 常见问题

#### Q: 升级后 Android 构建失败，提示找不到依赖？

A: 可能的原因和解决方案：

1. **网络问题**: 确保可以访问 Maven Central
   ```bash
   # 测试连接
   curl -I https://repo1.maven.org/maven2/
   ```

2. **配置阿里云镜像**（如果在中国大陆）:
   创建 `build-extras.gradle` 文件配置镜像

3. **清理构建缓存**:
   ```bash
   cordova clean
   cordova build android
   ```

#### Q: 升级后 iOS 构建失败，CocoaPods 相关错误？

A: 可能的原因和解决方案：

1. **未安装 CocoaPods**:
   ```bash
   sudo gem install cocoapods
   pod setup
   ```

2. **CocoaPods 版本过旧**:
   ```bash
   sudo gem update cocoapods
   ```

3. **仓库缓存问题**:
   ```bash
   pod repo update
   ```

4. **手动重新安装 Pods**:
   ```bash
   cd platforms/ios
   rm -rf Pods Podfile.lock
   pod install
   cd ../..
   ```

#### Q: 构建时间变长了？

A: 这是正常的，因为：

- **首次构建**: 需要下载依赖，会比较慢
- **后续构建**: 依赖会被缓存，构建速度会恢复正常

**优化建议**:
- 使用 SSD 硬盘
- 配置本地 Maven 镜像（Android）
- 使用 CocoaPods CDN 加速（iOS）

#### Q: 旧版本的 SDK 文件需要删除吗？

A: 不需要手动删除。新版本插件不再使用这些文件。如果您想清理它们：

```bash
# 这些目录不再被使用，可以安全删除（如果存在）
rm -rf plugins/cordova-plugin-umengsdk/src/android/apm
rm -rf plugins/cordova-plugin-umengsdk/src/android/common
rm -rf plugins/cordova-plugin-umengsdk/src/android/push
rm -rf plugins/cordova-plugin-umengsdk/src/ios/apm
rm -rf plugins/cordova-plugin-umengsdk/src/ios/common
rm -rf plugins/cordova-plugin-umengsdk/src/ios/push
```

#### Q: 升级后推送功能不工作？

A: 请检查：

1. **重新配置推送密钥**: 确保 `pushSecret` 参数正确
2. **iOS 推送证书**: 在 Xcode 中重新配置推送证书
3. **Android 推送配置**: 在友盟后台检查推送配置

#### Q: 如何回滚到旧版本？

A: 如果遇到问题需要回滚：

```bash
# 移除新版本
cordova plugin remove cordova-plugin-umengsdk

# 安装旧版本
cordova plugin add @daiweinpm/cordova-plugin-umengsdk@3.0.1 --variable APPKEY=YOUR_APPKEY
```

### 性能对比

| 指标 | 3.x 版本 | 4.0.0 版本 | 改进 |
|------|---------|-----------|------|
| 插件体积 | ~50MB | ~50KB | 99% ⬇️ |
| 首次构建时间 | 快速 | 慢（需下载依赖） | - |
| 后续构建时间 | 快速 | 快速（使用缓存） | ✅ |
| 依赖管理 | 手动 | 自动 | ✅ |
| 升级难度 | 困难 | 容易 | ✅ |
| SDK 版本 | 旧版本 | 最新版本 | ✅ |

### 升级检查清单

在部署到生产环境之前，请确保：

- [ ] 插件已成功安装
- [ ] Android 和 iOS 都能成功构建
- [ ] SDK 初始化成功
- [ ] 统计功能正常工作
- [ ] 推送功能正常工作（如果使用）
- [ ] 在真机上测试过
- [ ] 检查友盟后台数据是否正常上报

### 获取帮助

如果在升级过程中遇到问题：

1. **查看文档**: 阅读 [README.md](README.md) 和 [CHANGELOG.md](CHANGELOG.md)
2. **搜索 Issues**: 在 [GitHub Issues](https://github.com/daiwei-git/cordova-plugin-umeng/issues) 中搜索类似问题
3. **提交 Issue**: 如果找不到解决方案，请提交新的 Issue，包含：
   - 详细的错误信息
   - 环境信息（Cordova 版本、平台版本等）
   - 复现步骤

### 建议

- ✅ 在开发环境中先测试升级
- ✅ 逐步推进，不要一次性升级所有项目
- ✅ 保持良好的版本控制习惯
- ✅ 定期更新到最新版本以获得最佳体验

---

**祝升级顺利！** 🎉

如果您觉得这个插件有用，欢迎在 GitHub 上给我们 Star ⭐
