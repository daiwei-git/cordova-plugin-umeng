#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>

@interface UMPlugin : CDVPlugin

- (void)preInit:(CDVInvokedUrlCommand*)command;
- (void)init:(CDVInvokedUrlCommand*)command;
- (void)setLogEnabled:(CDVInvokedUrlCommand*)command;
- (void)onKillProcess:(CDVInvokedUrlCommand*)command;
- (void)getOaid:(CDVInvokedUrlCommand*)command;
- (void)login:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;
- (void)setPageCollectionMode:(CDVInvokedUrlCommand*)command;
- (void)onPageStart:(CDVInvokedUrlCommand*)command;
- (void)onPageEnd:(CDVInvokedUrlCommand*)command;
- (void)onEvent:(CDVInvokedUrlCommand*)command;
- (void)registerPush:(CDVInvokedUrlCommand*)command;
- (void)getDeviceInfo:(CDVInvokedUrlCommand*)command;

@end
