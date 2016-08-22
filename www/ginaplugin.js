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
    
    preventSleep: function() {
        cordova.exec(null, null, 'GinaPlugin', 'preventSleep', []);
    },

    openUrl: function(onSuccess, onError, url) {
        if (device !== null) {
            cordova.exec(onSuccess, onError, 'GinaPlugin', 'openUrl', [url]);
        }
        else {
            window.open(url, '_blank');
            if (onSuccess !== null)
                onSuccess();
        }

    },

    isDebug: function(onSuccess, onError, url) {
        if (device.platform.toLowerCase() === 'ios') {
            cordova.exec(onSuccess, onError, 'GinaPlugin', 'isDebug', []);
        }
        else {
            if (onSuccess !== null)
               onSuccess(false);
        }
    },

    canOpen: function (onSuccess, onError, app) {
        cordova.exec(onSuccess, onError, 'GinaPlugin', 'appCanOpen', [app]);
    },

    doNavigate: function(onSuccess, onError, lat, lon, label) {

        var appleMapsNav = function() {
            return "maps:daddr=" + lat + "," + lon;
        };

        var googleMapsNav = function() {
           return "comgooglemaps-x-callback://?daddr=" + lat + "," + lon + "&x-success=com.ginasystem.messenger.hzssmart://&x-source=HZS+Smart";
        };

        var sygicNav = function() {
            return "com.sygic.aura://coordinate|" + lon + "|" + lat + "|drive";
        };

        var wazeNav = function() {
            return "waze://?ll=" + lat + "," + lon + "&navigate=yes";
        };

        var tomTomNav = function() {
            return "tomtomhome:geo:action=navigateto&lat=" + lat + "&long=" + lon + "&name=" + label;
        };

        var navigonNav = function() {
            return "navigon://coordinate/" + label + "/" + lon + "/" + lat;
        };

        var urlSchemes = [

            
            {
                app: "com.sygic.aura",
                urlFn: sygicNav
            },
            {
                app: "tomtomhome",
                urlFn: tomTomNav
            },
            {
                app: "navigon",
                urlFn: navigonNav
            },
            {
                app: "waze",
                urlFn: wazeNav
            },
            {
                app: "comgooglemaps-x-callback",
                urlFn: googleMapsNav
            },
            {
                app: "maps",
                urlFn: appleMapsNav
            }

        ];

        var findNavAppIos = function(schemes) {
            
            if (schemes.length < 1) {
                console.log("fail");
                if (onError != null)
                    onError();
                return;
            }

            var scheme = schemes.shift();
            console.log(scheme.app);
            cordova.exec(function(canOpen) {
                if (canOpen) {
                    cordova.exec(onSuccess, onError, 'GinaPlugin', 'openUrl', [scheme.urlFn()]);
                }
                else {
                    findNavAppIos(schemes);
                }
            }, null, 'GinaPlugin', 'appCanOpen', [scheme.app + '://']);
        };

        console.log('GinaPlugin doNavigate');
        if (device === null) {
            window.location = "http://maps.google.com/maps?daddr=" + lat + "," + lon;
            if (onSuccess !== null)
                onSuccess();
        }
        // Use a plugin to execute an Intent on Android.
        else if (device.platform === "Android")
            cordova.exec(onSuccess, onError, 'GinaPlugin', 'doNavigate', [lat, lon, label]);
        else if (device.platform === "iOS") {
            findNavAppIos(urlSchemes);
        }
        else {
            window.location = "http://maps.google.com/maps?daddr=" + lat + "," + lon;
            if (onSuccess !== null)
                onSuccess();
        }
    },

    launchAirNavigation: function(onSuccess, onError, lat, lon, label) {
        if (device == null) {
            window.open("http://maps.google.com/maps?daddr=" + lat + "," + lon);
            onSuccess();
        }
        else if (device.platform === "iOS") {
            cordova.exec(
                onSuccess, onError, 'GinaPlugin', 'openUrl', 
                ["airnavpro://direct-to?coordinates=wgs84-decimal&location=" 
                    + lat + "_" + lon + ",0.0," + label]
            );
        }
        else {
            window.location = "http://maps.google.com/maps?daddr=" + lat + "," + lon;
            if (onSuccess !== null)
                onSuccess();
        }
    },

    turnOnDisplay: function() {
        if (device.platform.toLowerCase() === 'android')
        {
            cordova.exec(null, null, 'GinaPlugin', 'wakeUpAndBringToFront', []);
        }
    },

    getProcessId: function(onSuccess, onError) {
        if (device.platform.toLowerCase() === 'windows') {
            cordova.exec(onSuccess, onError, 'GinaPlugin', 'getProcessId', []);
        }
    },

    runExecutable: function(onSuccess, onError) {
        if (device.platform.toLowerCase() === 'windows') {
            cordova.exec(onSuccess, onError, 'GinaPlugin', 'runExecutable', []);
        }
    }
};
