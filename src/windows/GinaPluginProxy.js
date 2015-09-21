cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {    
        var res = GinaPlugin.GinaPluginImpl.getIMEI();
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    },
    
    lockOrientation : function(successCallback, errorCallback, orientation) {
        if (orientation == "landscape") {
            Windows.Graphics.Display.DisplayInformation.autoRotationPreferences = Windows.Graphics.Display.DisplayOrientations.landscape;
        } else if (orientation == "portrait") {
            Windows.Graphics.Display.DisplayInformation.autoRotationPreferences = Windows.Graphics.Display.DisplayOrientations.portrait;
        }
    },
    
    preventSleep: function() {
        var res = GinaPlugin.GinaPluginImpl.preventSleep();
        
        if (res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    }
});