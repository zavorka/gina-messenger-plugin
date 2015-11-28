cordova.commandProxy.add("GinaPlugin", {
    getIMEI : function(successCallback, errorCallback) {
	// callbacks
	loadCallback = function() { 
	    if (request.responseText !== "") {
	       successCallback(request.responseText);
            } else {
	       errorCallback("");
	    }
	}
		
	failCallback = function() {
	    errorCallback("");	    
	}  

	// request itself     
        request = new XMLHttpRequest();
      	request.addEventListener("load", loadCallback);
	request.addEventListener("error", failCallback);
	request.addEventListener("abort", failCallback);
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
        var uri = new Windows.Foundation.Uri(Uri);
        var options = new Windows.System.LauncherOptions();
	options.desiredRemainingView = Windows.UI.ViewManagement.ViewSizePreference.useHalf;

        Windows.System.Launcher.launchUriAsync(uri, options).then(
           function (success) {
              if (success) {
		  successCallback(true);                 
              } else {
                  errorCallback(false);
              }
           }
	);
    },

    getProcessId: function(successCallback, errorCallback) {
	var res = GinaPlugin.GinaPluginImpl.getProcessId();
        
        if (res == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    },

    runExecutable: function(successCallback, errorCallback) {
	var res = GinaPlugin.GinaPluginImpl.runExecutable();
        
        if (res == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }
    } 
});