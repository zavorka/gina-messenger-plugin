package com.ginasystem.plugins;
 
import android.os.Environment;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.net.Uri;
import android.util.Log;

import android.app.Activity;
import android.content.Intent;

// for IMEI
import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Base64;

import android.content.pm.ActivityInfo;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

// for turnOnDisplay
import android.view.WindowManager;
import android.view.Window;
import android.os.PowerManager;
import android.content.ComponentName;


public class GinaPlugin extends CordovaPlugin {
    private static final String LOG_TAG = "GinaPlugin";
    public static final String ACTION_GET_IMEI = "getIMEI";    
    public static final String ACTION_GET_ZIP = "getImageFromZip";
    public static final String ACTION_LOCK_ORIENTATION = "lockOrientation";
    public static final String ACTION_UNLOCK_ORIENTATION = "unlockOrientation";
    public static final String ACTION_DO_NAVIGATE = "doNavigate";
    public static final String ACTION_WAKE_UP_AND_BRING_TO_FRONT = "wakeUpAndBringToFront";
    public static final String ACTION_OPEN_URL = "openUrl";
    
    
    
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (ACTION_GET_IMEI.equals(action)) {
                Log.d(LOG_TAG, "getIMEI");
                TelephonyManager telephonyManager = (TelephonyManager) this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
                String IMEI = telephonyManager.getDeviceId();
                Log.d(LOG_TAG, "getIMEI success: " + IMEI);
                callbackContext.success(IMEI);                            
            }

            else if (ACTION_GET_ZIP.equals(action)) {
                String zipPath = args.get(0).toString();
                String entryPath = args.get(1).toString();
                this.getZipToBase64(zipPath, entryPath, callbackContext);
            }

            else if (ACTION_DO_NAVIGATE.equals(action)){                       
                return this.doNavigate(args.get(0).toString(), args.get(1).toString(), args.get(2).toString(), callbackContext);
            }

            else if (ACTION_LOCK_ORIENTATION.equals(action)) {
                this.lockOrientation(args.get(0).toString());
                
            }

            else if (ACTION_UNLOCK_ORIENTATION.equals(action)) {
                this.unlockOrientation();
                callbackContext.success();        
            }

            else if (ACTION_WAKE_UP_AND_BRING_TO_FRONT.equals(action)) {
                this.wakeUpAndBringToFront();
                callbackContext.success();        
            }

            else if (ACTION_OPEN_URL.equals(action)) {
                this.openUrl(callbackContext, args.get(0).toString());
            }
            
            else {
                callbackContext.error("Invalid action");
                return false;
            }
            
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        } 

        return true;
    }

    private boolean doNavigate(String lat, String lon, String label, CallbackContext callbackContext){
        boolean result;
        
        try {            
            if (lat != null && lat.length() > 0 && lon != null && lon.length() > 0) {
                Log.d(LOG_TAG, "Navigating to lat="+lat+", lon="+lon);
                Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:" + lat +","+ lon + "?q=" + lat + "," + lon)); 
                this.cordova.getActivity().startActivity(i);
                result = true;
                callbackContext.success();
            } else {                
                callbackContext.error("Expected two non-empty string arguments for lat and lon.");
                result = false;
            }           
        }catch( Exception e ) {
            callbackContext.error(e.getMessage());
            result = false;
        }        
        return result;
    }

    private void getZipToBase64(String zipPath,String entryPath, CallbackContext callbackContext)  
    {   
        /*
        DeviceInfo di = new DeviceInfo();
        
        //if zip does not exists
        if( !di.existsFile(zipPath) ) {
            callbackContext.success("");
            return;
        }
        */
        
        ZipFile zipFile = null;     
        ZipEntry entry;
        BufferedInputStream bis = null;
        
        
        try {
            zipFile = new ZipFile(zipPath);
            entry = zipFile.getEntry(entryPath);
            
            //there is not such part in the zip file
            if(entry==null ) {
                callbackContext.success("");
                zipFile.close();
                return;
            }
            
            
            int entrySize = (int)entry.getSize();
            bis = new BufferedInputStream( zipFile.getInputStream(entry) );
            byte[] finalByteArray = new byte[entrySize];
    
            
            int bufferSize = 2048;
            byte[] buffer = new byte[2048];
            int chunkSize = 0;
            int bytesRead = 0;
    
            while(true) {
                //Read chunk to buffer
                chunkSize = bis.read(buffer, 0, bufferSize); //read() returns the number of bytes read
                if(chunkSize == -1) {
                    //read() returns -1 if the end of the stream has been reached
                    break;
                }
    
                //Write that chunk to the finalByteArray             
                System.arraycopy(buffer, 0, finalByteArray, bytesRead, chunkSize);
                bytesRead += chunkSize;
            }
            
            bis.close();
            zipFile.close();
            
            byte[] encodedBytes = Base64.encode(finalByteArray,Base64.DEFAULT); //Android definition
            String output = new String(encodedBytes);          
           
            callbackContext.success(output);
        } 
        catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.err.println("Exception: " + e.getMessage());
            callbackContext.error(e.getMessage());
            
        }
        finally {
             
        }
    } 

    private void unlockOrientation() {
        this.cordova.getActivity().setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
    }

    private void lockOrientation(String orientation) {
        if (orientation.equals("portrait"))
            this.cordova.getActivity().setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        else if (orientation.equals("landscape"))
            this.cordova.getActivity().setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    }  

    

    private void wakeUp(Activity activity) {
            PowerManager pm = (PowerManager) activity.getApplicationContext().getSystemService(Context.POWER_SERVICE);
            PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.SCREEN_BRIGHT_WAKE_LOCK | PowerManager.FULL_WAKE_LOCK, "GinaPlugin Wake");
            // we acquire the wakelock just for wake up (ACQUIRE_CAUSES_WAKEUP flag)... then we immediatly release
            wl.acquire();
            wl.release();
    }

    private void turnOnDisplay(Activity activity) {
        Window window = activity.getWindow();

        window.addFlags(WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        WindowManager.LayoutParams params = window.getAttributes();
        params.screenBrightness = 1.0f;
        window.setAttributes(params);   
    }
    private void bringToFront(Activity activity) {
        Intent it = new Intent("intent.my.action");
        it.setComponent(  new ComponentName( activity.getPackageName(), activity.getClass().getName() )  );
        it.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.getApplicationContext().startActivity(it);               
    }

    public void wakeUpAndBringToFront() 
    {

        this.cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                Activity activity = cordova.getActivity();                
                wakeUp(activity);
                turnOnDisplay(activity);
                bringToFront(activity);
            }       
        });
    }

    /**
     * Display a new browser with the specified URL.
     *
     * @param url           The url to load.
     * @param usePhoneGap   Load url in PhoneGap webview
     * @return              "" if ok, or error message.
     */
    public void openUrl(CallbackContext callbackContext, String url) {
        try {
            Intent intent = null;
            intent = new Intent(Intent.ACTION_VIEW);
            // Omitting the MIME type for file: URLs causes "No Activity found to handle Intent".
            // Adding the MIME type to http: URLs causes them to not be handled by the downloader.
            Uri uri = Uri.parse(url);
            if ("file".equals(uri.getScheme())) {
                intent.setDataAndType(uri, webView.getResourceApi().getMimeType(uri));
            } else {
                intent.setData(uri);
            }
            this.cordova.getActivity().startActivity(intent);
            callbackContext.success();
        } catch (android.content.ActivityNotFoundException e) {
            Log.d(LOG_TAG, "InAppBrowser: Error loading url "+url+":"+ e.toString());
            callbackContext.error(e.getMessage());
        }
    }
}
