cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {    
        var res = ginaplugin.GinaPluginImpl.getIMEI();
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }

    }
});