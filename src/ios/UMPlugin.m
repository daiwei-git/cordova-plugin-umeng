#include <sys/types.h>
#include <sys/sysctl.h>
#include "TargetConditionals.h"

#import "UMPlugin.h"
// COMMON
#import <UMCommon/UMCommon.h>
#import <UMCommon/MobClick.h>
// APM
#import <UMAPM/UMLaunch.h>
#import <UMAPM/UMCrashConfigure.h>
#import <UMAPM/UMAPMConfig.h>
// LOG
#import <UMCommonLog/UMCommonLogHeaders.h>
// DEVICE
#import <UMDevice/UMZid.h>
// UMRemoteConfig
#import <UMRemoteConfig/UMRemoteConfig.h>
#import <UMRemoteConfig/UMRemoteConfigSettings.h>
// UTDID
#import <UTDID/UTDevice.h>

@implementation UIDevice (ModelVersion)
- (NSString*)modelVersion
{
#if TARGET_IPHONE_SIMULATOR
    NSString* platform = NSProcessInfo.processInfo.environment[@"SIMULATOR_MODEL_IDENTIFIER"];
#else
    size_t size;

    sysctlbyname("hw.machine", NULL, &size, NULL, 0);
    char* machine = malloc(size);
    sysctlbyname("hw.machine", machine, &size, NULL, 0);
    NSString* platform = [NSString stringWithUTF8String:machine];
    free(machine);
#endif
    return platform;
}
@end

@implementation UMPlugin

- (void)pluginInitialize {

}

- (void)preInit:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)init:(CDVInvokedUrlCommand*)command {
    NSString *appKey = [command.arguments objectAtIndex:0];
    if (appKey == nil || [appKey isKindOfClass:[NSNull class]]) {
        return;
    }
    NSString *channelId = [command.arguments objectAtIndex:1];
    if ([channelId isKindOfClass:[NSNull class]]) {
        channelId = nil;
    }
    [UMConfigure initWithAppkey: appKey channel: channelId];
    [UMCommonLogManager setUpUMCommonLogManager];
    [UMConfigure setEncryptEnabled:YES];//打开加密传输
    [MobClick setAutoPageEnabled:YES];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setLogEnabled:(CDVInvokedUrlCommand*)command {
    NSString *arg0 = [command.arguments objectAtIndex:0];
    if (arg0 == nil || [arg0 isKindOfClass:[NSNull class]]) {
        return;
    }
    BOOL enabled = [arg0 boolValue];
    [UMConfigure setLogEnabled:enabled];//设置打开日志
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)onKillProcess:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getOaid:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)login:(CDVInvokedUrlCommand*)command  {
    NSString *puid = [command.arguments objectAtIndex:0];
    if (puid == nil || [puid isKindOfClass:[NSNull class]]) {
        return;
    }
    NSString *platformName = [command.arguments objectAtIndex:1];
    if (platformName == nil) {
        [MobClick profileSignInWithPUID: puid];
    } else {
        [MobClick profileSignInWithPUID:puid provider:platformName];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)logout:(CDVInvokedUrlCommand*)command  {
    [MobClick profileSignOff];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setPageCollectionMode:(CDVInvokedUrlCommand*)command  {
    NSString *mode = [command.arguments objectAtIndex:0];
    if ([mode isEqualToString: @"auto"]) {
        [MobClick setAutoPageEnabled:YES];
    } else {
        [MobClick setAutoPageEnabled:NO];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)onPageStart:(CDVInvokedUrlCommand*)command  {
    NSString *pageName = [command.arguments objectAtIndex:0];
    [MobClick beginLogPageView: pageName]; //("Pagename"为页面名称，可自定义)
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)onPageEnd:(CDVInvokedUrlCommand*)command  {
    NSString *pageName = [command.arguments objectAtIndex:0];
    [MobClick endLogPageView: pageName]; //("Pagename"为页面名称，可自定义)
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)onEvent:(CDVInvokedUrlCommand*)command {
    NSString *name = [command.arguments objectAtIndex:0];
    NSDictionary *data = [command.arguments objectAtIndex:1];
    if ([data count] == 0) {
        [MobClick event: name];
    } else {
        [MobClick event: name attributes: data];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)registerPush:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getDeviceInfo:(CDVInvokedUrlCommand*)command {
    UIDevice* device = [UIDevice currentDevice];

    int isVirtual = 0;
    #if TARGET_OS_SIMULATOR
        isVirtual = 1;
    #elif TARGET_IPHONE_SIMULATOR
        isVirtual = 1;
    #endif

    NSUserDefaults* userDefaults = [NSUserDefaults standardUserDefaults];
    NSString* app_uuid = [userDefaults stringForKey:@"CDVUUID"];
    if (app_uuid == nil) {
        if ([device respondsToSelector:@selector(identifierForVendor)]) {
            app_uuid = [[device identifierForVendor] UUIDString];
        } else {
            CFUUIDRef uuid = CFUUIDCreate(NULL);
            app_uuid = (__bridge_transfer NSString *)CFUUIDCreateString(NULL, uuid);
            CFRelease(uuid);
        }
        [userDefaults setObject:app_uuid forKey:@"CDVUUID"];
        [userDefaults synchronize];
    }

    NSDictionary *deviceInfo = @{
        @"manufacturer": @"Apple",
        @"model": [device modelVersion],
        @"platform": @"iOS",
        @"version": [device systemVersion],
        @"uuid": app_uuid,
        @"cordova": CDV_VERSION,
        @"isVirtual": [NSNumber numberWithInt: isVirtual]
    };
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:deviceInfo];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
