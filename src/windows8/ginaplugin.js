/*
 *
 * Licensed to the GINA Software Ltd.
 *
*/

var cordova = require('cordova');

module.exports = {

	getIMEI: function (onSuccess, onError) {
		console.log("getIMEI: Running on Windows 8 - hardware specific GUID instead of an IMEI will be returned.")
		
		var hardwareToken = Windows.System.Profile.HardwareIdentification.getPackageSpecificToken(null);
		var reader = Windows.Storage.Streams.DataReader.fromBuffer(hardwareToken.id);
		var guid = reader.readGuid();
		
		if guid?
			onSuccess(guid);
		else
			onError();
	}
};

require("cordova/exec/proxy").add("GinaPlugin", module.exports);
