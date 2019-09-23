# cordova-plugin-umeng

// 友盟数据埋点统计
const umeng = (<any>window).Umeng;
if (umeng) {
    umeng.init();
    umeng.setDebugMode(false);
}