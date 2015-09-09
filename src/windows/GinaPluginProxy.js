cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback, str) {    
        var res = GinaPlugin.GinaPluginImpl.getIMEI(str);
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }

    }
});