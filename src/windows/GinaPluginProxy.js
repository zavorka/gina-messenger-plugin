cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {    
        var res = ginaplugin.ginapluginimpl.getIMEI();
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }

    }
});