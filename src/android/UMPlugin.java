package com.umeng.plugin;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.MobclickAgent.EScenarioType;
import com.umeng.analytics.MobclickAgent.UMAnalyticsConfig;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

public class UMPlugin extends CordovaPlugin {

    private Context mContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.mContext = cordova.getActivity().getApplicationContext();
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        Log.d("UMPlugin", "onResume");
        MobclickAgent.onResume(mContext);
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
        Log.d("UMPlugin", "onPause");
        MobclickAgent.onPause(mContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d("UMPlugin", "execute action:" + action);
        if (action.equals("init")) {
            String appKey = args.getString(0);
            String channelId = args.getString(1);
            MobclickAgent.startWithConfigure(new UMAnalyticsConfig(mContext, appKey, channelId));
            MobclickAgent.setScenarioType(mContext, EScenarioType.E_UM_NORMAL);
            MobclickAgent.onResume(mContext);
            return true;
        } else if (action.equals("onCCEvent")) {
            JSONArray array = args.getJSONArray(0);
            List<String> ck = new ArrayList<String>();
            for (int i = 0; i < array.length(); i++) {
                ck.add(array.getString(i));
            }
            int value = args.getInt(1);
            String label = args.getString(2);
            MobclickAgent.onEvent(mContext, ck, value, label);
            return true;
        } else if (action.equals("onEvent")) {
            String eventId = args.getString(0);
            MobclickAgent.onEvent(mContext, eventId);
            return true;
        } else if (action.equals("onEventWithLabel")) {
            String eventId = args.getString(0);
            String label = args.getString(1);
            MobclickAgent.onEvent(mContext, eventId, label);
            return true;
        } else if (action.equals("onEventWithParameters")) {
            String eventId = args.getString(0);
            JSONObject obj = args.getJSONObject(1);
            Map<String, String> map = new HashMap<String, String>();
            Iterator<String> it = obj.keys();
            while (it.hasNext()) {
                String key = String.valueOf(it.next());
                Object o = obj.get(key);
                if (o instanceof Integer) {
                    String value = String.valueOf(o);
                    map.put(key, value);
                } else if (o instanceof String) {
                    String strValue = (String) o;
                    map.put(key, strValue);
                }
            }
            MobclickAgent.onEvent(mContext, eventId, map);
            return true;
        } else if (action.equals("onEventWithCounter")) {
            String eventId = args.getString(0);
            JSONObject obj = args.getJSONObject(1);
            Map<String, String> map = new HashMap<String, String>();
            Iterator<String> it = obj.keys();
            while (it.hasNext()) {
                String key = String.valueOf(it.next());
                Object o = obj.get(key);
                if (o instanceof Integer) {
                    String value = String.valueOf(o);
                    map.put(key, value);
                } else if (o instanceof String) {
                    String strValue = (String) o;
                    map.put(key, strValue);
                }
            }
            int value = args.getInt(2);
            MobclickAgent.onEventValue(mContext, eventId, map, value);
            return true;
        } else if (action.equals("onPageBegin")) {
            String pageName = args.getString(0);
            MobclickAgent.onPageStart(pageName);
            return true;
        } else if (action.equals("onPageEnd")) {
            String pageName = args.getString(0);
            MobclickAgent.onPageEnd(pageName);
            return true;
        } else if (action.equals("getDeviceId")) {
            try {
                android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) mContext
                        .getSystemService(Context.TELEPHONY_SERVICE);
                String deviceId = tm.getDeviceId();
                callbackContext.success(deviceId);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return true;
        } else if(action.equals("getDeviceInfo")) {
          try {
              String deviceInfo = getDeviceInfo(mContext);
              callbackContext.success(deviceInfo);
          } catch (Exception e) {
              e.printStackTrace();
          }
          return true;
        } else if (action.equals("setLogEnabled")) {
            boolean enabled = args.getBoolean(0);
            MobclickAgent.setDebugMode(enabled);
            return true;
        } else if (action.equals("profileSignInWithPUID")) {
            String puid = args.getString(0);
            MobclickAgent.onProfileSignIn(puid);
            return true;
        } else if (action.equals("profileSignInWithPUIDWithProvider")) {
            String puid = args.getString(0);
            String provider = args.getString(1);
            MobclickAgent.onProfileSignIn(puid, provider);
            return true;
        } else if (action.equals("profileSignOff")) {
            MobclickAgent.onProfileSignOff();
            return true;
        }
        return false;
    }

    private String getDeviceInfo(Context context) {
        try {
            org.json.JSONObject json = new org.json.JSONObject();
            android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) context
                    .getSystemService(Context.TELEPHONY_SERVICE);
            String device_id = tm.getDeviceId();
            String mac = null;
            FileReader fstream = null;
            try {
                fstream = new FileReader("/sys/class/net/wlan0/address");
            } catch (FileNotFoundException e) {
                fstream = new FileReader("/sys/class/net/eth0/address");
            }
            BufferedReader in = null;
            if (fstream != null) {
                try {
                    in = new BufferedReader(fstream, 1024);
                    mac = in.readLine();
                } catch (IOException e) {
                } finally {
                    if (fstream != null) {
                        try {
                            fstream.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (in != null) {
                        try {
                            in.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            json.put("mac", mac);
            if (TextUtils.isEmpty(device_id)) {
                device_id = mac;
            }
            if (TextUtils.isEmpty(device_id)) {
                device_id = android.provider.Settings.Secure.getString(context.getContentResolver(),
                        android.provider.Settings.Secure.ANDROID_ID);
            }
            json.put("device_id", device_id);
            return json.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
