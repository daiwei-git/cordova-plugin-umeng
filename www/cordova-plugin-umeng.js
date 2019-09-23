var exec = require('cordova/exec');

module.exports = {
    init: function(appKey, channelId) {
        exec(null, null, "Umeng", "init", [ 
            appKey, channelId 
        ]);
    },
    onCCEvent: function(evenArray, evenValue, eventLabel) {
        exec(null, null, "Umeng", "onCCEvent", [ 
            evenArray, evenValue, eventLabel 
        ]);
    },
    onEvent: function(eventId) {
        exec(null, null, "Umeng", "onEvent", [ 
            eventId 
        ]);
    },
    onEventWithLabel: function(eventId, eventLabel) {
        exec(null, null, "Umeng", "onEventWithLabel", [ 
            eventId, eventLabel 
        ]);
    },
    onEventWithParameters: function(eventId, eventData) {
        exec(null, null, "Umeng", "onEventWithParameters", [ 
            eventId, eventData 
        ]);
    },
    onEventWithCounter: function(eventId, eventData, eventNum) {
        exec(null, null, "Umeng", "onEventWithCounter", [ 
            eventId, eventData, eventNum 
        ]);
    },
    onPageBegin: function(pageName) {
        exec(null, null, "Umeng", "onPageBegin", [ 
            pageName 
        ]);
    },
    onPageEnd: function(pageName) {
        exec(null, null, "Umeng", "onPageEnd", [ 
            pageName 
        ]);
    },
    getDeviceId: function(callBack) {
        exec(callBack, null, "Umeng", "getDeviceId", []);
    },
    setLogEnabled: function(enabled) {
        exec(null, null, "Umeng", "setLogEnabled", [ 
            enabled 
        ]);
    },
    profileSignInWithPUID: function(UID) {
        exec(null, null, "Umeng", "profileSignInWithPUID", [ 
            UID
        ]);
    },
    profileSignInWithPUIDWithProvider: function(provider, UID) {
        exec(null, null, "Umeng", "profileSignInWithPUIDWithProvider", [ 
            provider, UID 
        ]);
    },
    profileSignOff: function() {
        exec(null, null, "Umeng", "profileSignOff", []);
    },
    setUserLevelId: function(level) {
        exec(null, null, "Umeng", "setUserLevelId", [ 
            level 
        ]);
    },
    startLevel: function(level) {
        exec(null, null, "Umeng", "startLevel", [ 
            level 
        ]);
    },
    finishLevel: function(level) {
        exec(null, null, "Umeng", "finishLevel", [
            level
        ]);
    },
    failLevel: function(level) {
        exec(null, null, "Umeng", "failLevel", [ 
            level 
        ]);
    },
    exchange: function(currencyAmount, currencyType, virtualAmount, channel, orderId) {
        exec(null, null, "Umeng", "exchange", [ 
            currencyAmount, currencyType, virtualAmount, channel, orderId 
        ]);
    },
    pay: function(money, coin, source) {
        exec(null, null, "Umeng", "pay", [ 
            money, coin, source 
        ]);
    },
    payWithItem: function(money, item, number, price, source) {
        exec(null, null, "Umeng", "payWithItem", [ 
            money, item, number, price, source 
        ]);
    },
    buy: function(item, number, price) {
        exec(null, null, "Umeng", "buy", [ 
            item, number, price 
        ]);
    },
    use: function(item, number, price) {
        exec(null, null, "Umeng", "use", [ 
            item, number, price 
        ]);
    },
    bonus: function(coin, source) {
        exec(null, null, "Umeng", "bonus", [ 
            coin, source 
        ]);
    },
    bonusWithItem: function(item, number, price, source) {
        exec(null, null, "Umeng", "bonusWithItem", [ 
            item, number, price, source 
        ]);
    }
};
