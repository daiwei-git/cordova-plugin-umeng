#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>

@interface UMPlugin : CDVPlugin

- (void)getDeviceId:(CDVInvokedUrlCommand*)command;
- (void)onCCEvent:(CDVInvokedUrlCommand*)command;
- (void)onEvent:(CDVInvokedUrlCommand*)command;
- (void)onEventWithLabel:(CDVInvokedUrlCommand*)command;
- (void)onEventWithParameters:(CDVInvokedUrlCommand*)command;
- (void)onEventWithCounter:(CDVInvokedUrlCommand*)command;
- (void)onPageBegin:(CDVInvokedUrlCommand*)command;
- (void)onPageEnd:(CDVInvokedUrlCommand*)command;

@end
