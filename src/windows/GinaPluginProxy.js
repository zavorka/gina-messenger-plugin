cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {
        console.log(GinaPlugin);
    
        var res = GinaPlugin.GinaPluginImpl.getIMEI();
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }

    }
});