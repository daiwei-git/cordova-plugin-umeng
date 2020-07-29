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
import com.umeng.commonsdk.UMConfigure;

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
            // 初始化
            UMConfigure.init(mContext, appKey, channelId);
            // 页面采集模式
            MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.AUTO);
            // 普通模式
            MobclickAgent.setScenarioType(mContext, EScenarioType.E_UM_NORMAL);
            MobclickAgent.onResume(mContext);
            return true;
        } else if (action.equals("onEvent")) {
            return onEvent(args, mContext);
        } else if (action.equals("onEventWithLabel")) {
            return onEventWithLabel(args, mContext);
        } else if (action.equals("onEventWithParameters")) {
            return onEventWithParameters(args, mContext);
        } else if (action.equals("onEventWithCounter")) {
            return onEventWithCounter(args, mContext);
        } else if (action.equals("onPageBegin")) {
            return onPageBegin(args);
        } else if (action.equals("onPageEnd")) {
            return onPageEnd(args);
        } else if (action.equals("getDeviceId")) {
            try {
                String deviceId = getDeviceId(mContext);
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
            return setLogEnabled(args);
        } else if (action.equals("profileSignInWithPUID")) {
            return profileSignInWithPUID(args);
        } else if (action.equals("profileSignInWithPUIDWithProvider")) {
            return profileSignInWithPUIDWithProvider(args);
        } else if (action.equals("profileSignOff")) {
            return profileSignOff();
        }
        return false;
    }

    private boolean onEvent(JSONArray args, Context context) {
        String eventId = args.getString(0);
        MobclickAgent.onEvent(context, eventId);
        return true;
    }

    private boolean onEventWithLabel(JSONArray args, Context context) {
        String eventId = args.getString(0);
        String label = args.getString(1);
        MobclickAgent.onEvent(context, eventId, label);
        return true;
    }

    private boolean onEventWithParameters(JSONArray args, Context context) {
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
        MobclickAgent.onEvent(context, eventId, map);
        return true;
    }

    private boolean onEventWithCounter(JSONArray args, Context context) {
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
        MobclickAgent.onEventValue(context, eventId, map, value);
        return true;
    }

    private boolean onPageBegin(JSONArray args) {
        String pageName = args.getString(0);
        MobclickAgent.onPageStart(pageName);
        return true;
    }

    private boolean onPageEnd(JSONArray args) {
        String pageName = args.getString(0);
        MobclickAgent.onPageEnd(pageName);
        return true;
    }

    private boolean setLogEnabled(JSONArray args) {
        boolean enabled = args.getBoolean(0);
        UMConfigure.setLogEnabled(enabled);
        return true;
    }

    private boolean profileSignInWithPUID(JSONArray args) {
        String puid = args.getString(0);
        MobclickAgent.onProfileSignIn(puid);
        return true;
    }

    private boolean profileSignInWithPUIDWithProvider(JSONArray args) {
        String puid = args.getString(0);
        String provider = args.getString(1);
        MobclickAgent.onProfileSignIn(puid, provider);
        return true;
    }

    private boolean profileSignOff() {
        MobclickAgent.onProfileSignOff();
        return true;
    }

    private String getDeviceId(Context context) {
        android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) context
                        .getSystemService(Context.TELEPHONY_SERVICE);
        String deviceId = tm.getDeviceId();
        return deviceId;
    }

    private String getDeviceInfo(Context context) {
        try {
            org.json.JSONObject json = new org.json.JSONObject();
            String deviceId = getDeviceId(context);
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
            if (TextUtils.isEmpty(deviceId)) {
                deviceId = mac;
            }
            if (TextUtils.isEmpty(deviceId)) {
                deviceId = android.provider.Settings.Secure.getString(context.getContentResolver(),
                        android.provider.Settings.Secure.ANDROID_ID);
            }
            json.put("device_id", deviceId);
            return json.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
