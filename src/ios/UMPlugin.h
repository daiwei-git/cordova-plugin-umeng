#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>

@interface UMPlugin : CDVPlugin

- (void)getDeviceId:(CDVInvokedUrlCommand*)command;
- (void)onEvent:(CDVInvokedUrlCommand*)command;
- (void)onEventWithLabel:(CDVInvokedUrlCommand*)command;
- (void)onEventWithParameters:(CDVInvokedUrlCommand*)command;
- (void)onEventWithCounter:(CDVInvokedUrlCommand*)command;
- (void)onPageBegin:(CDVInvokedUrlCommand*)command;
- (void)onPageEnd:(CDVInvokedUrlCommand*)command;
- (void)setLogEnabled:(CDVInvokedUrlCommand*)command;
- (void)profileSignInWithPUID:(CDVInvokedUrlCommand*)command;
- (void)profileSignInWithPUIDWithProvider:(CDVInvokedUrlCommand*)command;
- (void)profileSignOff:(NSArray *)arguments;

@end
