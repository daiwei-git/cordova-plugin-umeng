var exec = require('cordova/exec');

var MobclickAgent = {

    init : function(appKey, channelId) {
        cordova.exec(null, null, "Umeng", "init", [ appKey, channelId ]);
    },
    onCCEvent : function(evenArray, evenValue, eventLabel) {
        cordova.exec(null, null, "Umeng", "onCCEvent", [ evenArray, evenValue, eventLabel ]);

    },
    onEvent : function(eventId) {
        cordova.exec(null, null, "Umeng", "onEvent", [ eventId ]);

    },
    onEventWithLabel : function(eventId, eventLabel) {
        cordova.exec(null, null, "Umeng", "onEventWithLabel", [ eventId, eventLabel ]);

    },
    onEventWithParameters : function(eventId, eventData) {
        cordova.exec(null, null, "Umeng", "onEventWithParameters", [ eventId, eventData ]);

    },
    onEventWithCounter : function(eventId, eventData, eventNum) {
        cordova.exec(null, null, "Umeng", "onEventWithCounter", [ eventId, eventData, eventNum ]);

    },
    onPageBegin : function(pageName) {
        cordova.exec(null, null, "Umeng", "onPageBegin", [ pageName ]);

    },
    onPageEnd : function(pageName) {
        cordova.exec(null, null, "Umeng", "onPageEnd", [ pageName ]);

    },
    getDeviceId : function(callBack) {
        cordova.exec(callBack, null, "Umeng", "getDeviceId", []);

    },
    getDeviceInfo : function(callBack) {
        cordova.exec(callBack, null, "Umeng", "getDeviceInfo", []);

    },
    setLogEnabled : function(enabled) {
        cordova.exec(null, null, "Umeng", "setLogEnabled", [ enabled ]);
    },
    profileSignInWithPUID : function(UID) {
        cordova.exec(null, null, "Umeng", "profileSignInWithPUID", [ UID ]);
    },
    profileSignInWithPUIDWithProvider : function(provider, UID) {
        cordova.exec(null, null, "Umeng", "profileSignInWithPUIDWithProvider", [ provider, UID ]);

    },
    profileSignOff : function() {
        cordova.exec(null, null, "Umeng", "profileSignOff", []);

    },
    setUserLevelId : function(level) {
        cordova.exec(null, null, "Umeng", "setUserLevelId", [ level ]);

    },
    startLevel : function(level) {
        cordova.exec(null, null, "Umeng", "startLevel", [ level ]);

    },
    finishLevel : function(level) {
        cordova.exec(null, null, "Umeng", "finishLevel", [ level ]);

    },
    failLevel : function(level) {
        cordova.exec(null, null, "Umeng", "failLevel", [ level ]);

    },
    exchange : function(currencyAmount, currencyType, virtualAmount, channel, orderId) {
        cordova.exec(null, null, "Umeng", "exchange", [ currencyAmount, currencyType, virtualAmount, channel,
                orderId ]);

    },
    pay : function(money, coin, source) {
        cordova.exec(null, null, "Umeng", "pay", [ money, coin, source ]);

    },
    payWithItem : function(money, item, number, price, source) {
        cordova.exec(null, null, "Umeng", "payWithItem", [ money, item, number, price, source ]);

    },
    buy : function(item, number, price) {
        cordova.exec(null, null, "Umeng", "buy", [ item, number, price ]);

    },
    use : function(item, number, price) {
        cordova.exec(null, null, "Umeng", "use", [ item, number, price ]);

    },
    bonus : function(coin, source) {
        cordova.exec(null, null, "Umeng", "bonus", [ coin, source ]);

    },
    bonusWithItem : function(item, number, price, source) {
        cordova.exec(null, null, "Umeng", "bonusWithItem", [ item, number, price, source ]);

    }
};

module.exports = MobclickAgent;
