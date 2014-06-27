var ginaplugin = {
    
    /**
     * Get device IMEI
     * @param {function(string)} onSuccess Called with one param - string containing IMEI of the device
     * @param {function(string)} onError Called with one param - string containing error
     */                    
    getIMEI: function(onSuccess, onError) {
        console.log('GinaPlugin getIMEI');
        cordova.exec(onSuccess, onError, 'GinaPlugin', 'getIMEI', []);    
    },
    
    getImageFromZip: function(onSuccess, onError, zipPath, entryPath) {
    	cordova.exec(onSuccess, onError, 'GinaPlugin', 'getImageFromZip', [zipPath, entryPath]);
    },

    doNavigate: function(onSuccess, onError) {
        console.log('GinaPlugin doNavigate');
        if (device == nunll) {
            window.open("http://maps.google.com/maps?daddr=" + lat + "," + lon);
            onSuccess();
        }
        // Use a plugin to execute an Intent on Android.
        else if (device.platform === "Android")
            cordova.exec(onSuccess, onError, 'PhoneNavigator', 'doNavigate', [lat, lon]);
        else if (device.platform == "iOS") {
            window.location = "maps:daddr=" + lat + "," + lon;
            onSuccess();
        }
        else {
            console.log("Unknown platform.");
            window.location = "http://maps.google.com/maps?daddr=" + lat + "," + lon;
            onSuccess();
        }
    }
}


module.exports = ginaplugin;
