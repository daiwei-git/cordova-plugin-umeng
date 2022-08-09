var exec = require('cordova/exec');

module.exports = {
    init: function(appKey, channelId, deviceType, pushSecret) {
        exec(null, null, "Umeng", "init", [ 
            appKey, channelId, deviceType, pushSecret
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
    getDeviceInfo: function(callBack) {
        exec(callBack, null, "Umeng", "getDeviceInfo", []);
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
    profileSignInWithPUIDWithProvider: function(UID, provider) {
        exec(null, null, "Umeng", "profileSignInWithPUIDWithProvider", [ 
            UID, provider 
        ]);
    },
    profileSignOff: function() {
        exec(null, null, "Umeng", "profileSignOff", []);
    }
};
