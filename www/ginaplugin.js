module.exports = {
    
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

    lockOrientation: function(orientation) {
        cordova.exec(null, null, 'GinaPlugin', 'lockOrientation', [orientation]);
    },

    doNavigate: function(onSuccess, onError, lat, lon, label) {
        console.log('GinaPlugin doNavigate');
        if (device == null) {
            window.open("http://maps.google.com/maps?daddr=" + lat + "," + lon);
            onSuccess();
        }
        // Use a plugin to execute an Intent on Android.
        else if (device.platform === "Android")
            cordova.exec(onSuccess, onError, 'GinaPlugin', 'doNavigate', [lat, lon, label]);
        else if (device.platform === "iOS") {
            window.location = "maps:daddr=" + lat + "," + lon;
            onSuccess();
        }
        else {
            console.log("Unknown platform.");
            window.location = "http://maps.google.com/maps?daddr=" + lat + "," + lon;
            onSuccess();
        }
    },

    launchAirNavigation: function(onSuccess, onError, lat, lon, label) {
        if (device == null) {
            window.open("http://maps.google.com/maps?daddr=" + lat + "," + lon);
            onSuccess();
        }
        else if (device.platform === "iOS") {
            window.location = "airnavpro://direct-to?coordinates=wgs84-decimal&location=" + lat + "_" + lon + ",0.0," + label;
            onSuccess();
        }
        else {
            console.log("Unknown platform.");
            window.location = "http://maps.google.com/maps?daddr=" + lat + "," + lon;
            onSuccess();
        }
    }
};
