#import "UMPlugin.h"
#import <UMCommon/UMCommon.h>
#import <UMCommon/MobClick.h>
#import <UMCommonLog/UMCommonLogHeaders.h>

@interface UMPlugin ()

#if __has_feature(objc_arc)
@property (nonatomic, strong) NSString *currPageName;
#else
@property (nonatomic, retain) NSString *currPageName;
#endif

@end

@implementation UMPlugin

#if __has_feature(objc_arc)
#else
- (void)dealloc {
    [super dealloc];
}
#endif

- (void)pluginInitialize {
    NSString* appKey = [[self.commandDelegate settings] objectForKey:@"umeng_appkey"];
    NSString* channelId = [[self.commandDelegate settings] objectForKey:@"umeng_channel"];
    [UMConfigure initWithAppkey: appKey channel: channelId];
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
}

- (void)getDeviceId:(CDVInvokedUrlCommand*)command {
    NSString *deviceId = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:deviceId];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)onEvent:(CDVInvokedUrlCommand*)command {
    NSString *eventId = [command.arguments objectAtIndex:0];
    if (eventId == nil || [eventId isKindOfClass:[NSNull class]]) {
        return;
    }
    [MobClick event:eventId];
}

- (void)onEventWithLabel:(CDVInvokedUrlCommand*)command{
    NSString *eventId = [command.arguments objectAtIndex:0];
    if (eventId == nil || [eventId isKindOfClass:[NSNull class]]) {
        return;
    }
    NSString *eventLabel = [command.arguments objectAtIndex:1];
    if ([eventLabel isKindOfClass:[NSNull class]]) {
        eventLabel = nil;
    }
    [MobClick event:eventId label:eventLabel];
}

- (void)onEventWithParameters:(CDVInvokedUrlCommand*)command {
    NSString *eventId = [command.arguments objectAtIndex:0];
    if (eventId == nil || [eventId isKindOfClass:[NSNull class]]) {
        return;
    }
    NSDictionary *parameters = [command.arguments objectAtIndex:1];
    if (parameters == nil && [parameters isKindOfClass:[NSNull class]]) {
        parameters = nil;
    }
    [MobClick event:eventId attributes:parameters];
}

- (void)onEventWithCounter:(CDVInvokedUrlCommand*)command {
    NSString *eventId = [command.arguments objectAtIndex:0];
    if (eventId == nil || [eventId isKindOfClass:[NSNull class]]) {
        return;
    }
    NSDictionary *parameters = [command.arguments objectAtIndex:1];
    if (parameters == nil && [parameters isKindOfClass:[NSNull class]]) {
        parameters = nil;
    }
    NSString *eventNum = [command.arguments objectAtIndex:2];
    if (eventNum == nil && [eventNum isKindOfClass:[NSNull class]]) {
        eventNum = nil;
    }
    int num = [eventNum intValue];
    [MobClick event:eventId attributes:parameters counter:num];
}

- (void)onPageBegin:(CDVInvokedUrlCommand*)command {
    NSString *pageName = [command.arguments objectAtIndex:0];
    if (pageName == nil || [pageName isKindOfClass:[NSNull class]]) {
        return;
    }
    [MobClick beginLogPageView:pageName];
}

- (void)onPageEnd:(CDVInvokedUrlCommand*)command {
    NSString *pageName = [command.arguments objectAtIndex:0];
    if (pageName == nil || [pageName isKindOfClass:[NSNull class]]) {
        return;
    }
    [MobClick endLogPageView:pageName];
}

- (void)setLogEnabled:(CDVInvokedUrlCommand*)command {
    NSString *arg0 = [command.arguments objectAtIndex:0];
    if (arg0 == nil || [arg0 isKindOfClass:[NSNull class]]) {
        return;
    }
    BOOL enabled = [arg0 boolValue];
    [UMConfigure setLogEnabled:enabled];
}

- (void)profileSignInWithPUID:(CDVInvokedUrlCommand*)command  {
    NSString *puid = [command.arguments objectAtIndex:0];
    if (puid == nil || [puid isKindOfClass:[NSNull class]]) {
        return;
    }
    [MobClick profileSignInWithPUID:puid];
}

- (void)profileSignInWithPUIDWithProvider:(CDVInvokedUrlCommand*)command {
    NSString *puid = [command.arguments objectAtIndex:0];
    if (puid == nil || [puid isKindOfClass:[NSNull class]]) {
        return;
    }
    NSString *provider = [command.arguments objectAtIndex:1];
    if (provider == nil && [provider isKindOfClass:[NSNull class]]) {
        provider = nil;
    }
    [MobClick profileSignInWithPUID:puid provider:provider];
}

- (void)profileSignOff:(NSArray *)arguments {
    [MobClick profileSignOff];
}

@end
