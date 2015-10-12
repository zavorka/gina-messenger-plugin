cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {
	callback = function() { successCallback(request.responseText); }
    
        request = new XMLHttpRequest();
      	request.addEventListener("load", callback);
      	request.open("GET", "http://localhost:8888/action/getimei");
      	request.send();
    },
    
    lockOrientation : function(successCallback, errorCallback, orientation) {
        if (orientation == "landscape") {
            Windows.Graphics.Display.DisplayInformation.autoRotationPreferences = Windows.Graphics.Display.DisplayOrientations.landscape;
        } else if (orientation == "portrait") {
            Windows.Graphics.Display.DisplayInformation.autoRotationPreferences = Windows.Graphics.Display.DisplayOrientations.portrait;
        }

	successCallback();
    },
    
    preventSleep: function(successCallback, errorCallback) {
        var res = GinaPlugin.GinaPluginImpl.preventSleep();
        
        if (res == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    },
    
    openUrl: function(successCallback, errorCallback, Uri) {
        var res = GinaPlugin.GinaPluginImpl.openUrl(Uri);
        
        if (res == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    }
});