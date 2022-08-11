var exec = require('cordova/exec');

module.exports = {
    init: function(appKey, channelId, deviceType, pushSecret) {
        exec(null, null, "UMSDK", "init", [ 
            appKey, channelId, deviceType, pushSecret
        ]);
    },
    onEvent: function(eventId) {
        exec(null, null, "UMSDK", "onEvent", [ 
            eventId 
        ]);
    },
    onEventWithLabel: function(eventId, eventLabel) {
        exec(null, null, "UMSDK", "onEventWithLabel", [ 
            eventId, eventLabel 
        ]);
    },
    onEventWithParameters: function(eventId, eventData) {
        exec(null, null, "UMSDK", "onEventWithParameters", [ 
            eventId, eventData 
        ]);
    },
    onEventWithCounter: function(eventId, eventData, eventNum) {
        exec(null, null, "UMSDK", "onEventWithCounter", [ 
            eventId, eventData, eventNum 
        ]);
    },
    onPageBegin: function(pageName) {
        exec(null, null, "UMSDK", "onPageBegin", [ 
            pageName 
        ]);
    },
    onPageEnd: function(pageName) {
        exec(null, null, "UMSDK", "onPageEnd", [ 
            pageName 
        ]);
    },
    getDeviceId: function(callBack) {
        exec(callBack, null, "UMSDK", "getDeviceId", []);
    },
    getDeviceInfo: function(callBack) {
        exec(callBack, null, "UMSDK", "getDeviceInfo", []);
    },
    setLogEnabled: function(enabled) {
        exec(null, null, "UMSDK", "setLogEnabled", [ 
            enabled 
        ]);
    },
    profileSignInWithPUID: function(UID) {
        exec(null, null, "UMSDK", "profileSignInWithPUID", [ 
            UID
        ]);
    },
    profileSignInWithPUIDWithProvider: function(UID, provider) {
        exec(null, null, "UMSDK", "profileSignInWithPUIDWithProvider", [ 
            UID, provider 
        ]);
    },
    profileSignOff: function() {
        exec(null, null, "UMSDK", "profileSignOff", []);
    }
};
