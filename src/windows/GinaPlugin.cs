using System;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class GinaPlugin : BaseCommand
    {
        public void getIMEI()
        {
            PluginResult result;           
            object uniqueId;
            var imei = string.Empty;
            
            if (DeviceExtendedProperties.TryGetValue("DeviceUniqueId", out uniqueId))
                imei = BitConverter.ToString((byte[]) uniqueId).Replace("-", string.Empty);
            
            if (upperCase != "")
            {
                result = new PluginResult(PluginResult.Status.OK, imei);
            } else
            {
                result = new PluginResult(PluginResult.Status.ERROR, imei);
            }

            DispatchCommandResult(result);
        }
    }
}