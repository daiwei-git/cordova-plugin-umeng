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
    }
};
