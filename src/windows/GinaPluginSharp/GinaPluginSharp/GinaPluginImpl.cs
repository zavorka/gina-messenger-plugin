﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Windows.Devices.Usb;
using Windows.Storage.Streams;
using Windows.System;
using Windows.UI.ViewManagement;



namespace GinaPlugin
{
    [FlagsAttribute]
    public enum EXECUTION_STATE : uint
    {
        ES_AWAYMODE_REQUIRED = 0x00000040,
        ES_CONTINUOUS = 0x80000000,
        ES_DISPLAY_REQUIRED = 0x00000002,
        ES_SYSTEM_REQUIRED = 0x00000001
        // Legacy flag, should not be used.
        // ES_USER_PRESENT = 0x00000004
    }
  


    public sealed class GinaPluginImpl
    {
        [DllImport("kernel32.dll", SetLastError = true)]
        static extern EXECUTION_STATE SetThreadExecutionState(EXECUTION_STATE esFlags);


        public static bool preventSleep() {
            bool result; 

            // try this for vista, it will fail on XP
            if ((result = SetThreadExecutionState(EXECUTION_STATE.ES_CONTINUOUS | EXECUTION_STATE.ES_SYSTEM_REQUIRED | EXECUTION_STATE.ES_AWAYMODE_REQUIRED) != 0))
            {
                // try XP variant as well just to make sure 
                result = (SetThreadExecutionState(EXECUTION_STATE.ES_CONTINUOUS | EXECUTION_STATE.ES_SYSTEM_REQUIRED) != 0);
            }

            return result;
        }


        public static bool openUrl(string Uri) {
            var options = new LauncherOptions();
            // options.DesiredRemainingView = ViewSizePreference.UseHalf;

            Task<bool> t = Task.Run( async ()=>
            {
                return await Windows.System.Launcher.LaunchUriAsync(new Uri(Uri), options);
            }); 

            t.Wait();
            return t.Result;
        }
    }
}
