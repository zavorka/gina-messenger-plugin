package com.ginasystem.plugins;
 
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


public class GinaPlugin extends CordovaPlugin {
    private static final String LOG_TAG = "GinaPlugin";
    public static final String ACTION_GET_IMEI = "getIMEI";    
    public static final String ACTION_GET_ZIP = "getImageFromZip";
    
    
    
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
            if (ACTION_GET_ZIP.equals(action)) {
                String zipPath = args.get(0).toString();
                String entryPath = args.get(1).toString();
                this.getZipToBase64(zipPath, entryPath, callbackContext);
            }
            if ("doNavigate".equals(action)){                       
                return this.doNavigate(args.get(0).toString(), args.get(1).toString(), args.get(2).toString(), callbackContext);
            }

            
            callbackContext.error("Invalid action");
            return false;
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        } 
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
}
