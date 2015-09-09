cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {    
        var res = GinaPlugin.GinaPluginImpl.getIMEI();
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    }
    
    lockOrientation : function(successCallback, errorCallback, orientation) {
        console.log('lock orientation ' + orientation);
    }
});