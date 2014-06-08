var deviceinfo = {
    
    /**
     * Get device IMEI
     * @param {function(string)} onSuccess Called with one param - string containing IMEI of the device
     * @param {function(string)} onError Called with one param - string containing error
     */                    
    getIMEI: function(onSuccess, onError) {
        cordova.exec(onSuccess, onError, 'DeviceInfo', 'getIMEI', []);    
    },
    
    getImageFromZip: function(onSuccess, onError, zipPath, entryPath) {
    	cordova.exec(onSuccess, onError, 'DeviceInfo', 'getImageFromZip', [zipPath, entryPath]);
    }
}


module.exports = deviceinfo;
