package com.daiwei.umsdk.cdv;

import java.util.Map;
import java.util.TimeZone;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.commonsdk.listener.OnGetOaidListener;
import com.umeng.message.PushAgent;
import com.umeng.message.api.UPushRegisterCallback;

import android.content.Context;
import android.util.Log;
import android.provider.Settings;

public class UMPlugin extends CordovaPlugin {

    private Context mContext = null;
    private CallbackContext callbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.mContext = cordova.getActivity().getApplicationContext();
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        MobclickAgent.onResume(mContext);
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
        MobclickAgent.onPause(mContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if (action.equals("preInit")) {
            return preInit(args);
        } else if (action.equals("init")) {
            return init(args);
        } else if (action.equals("getOaid")) {
            return getOaid(args);
        } else if (action.equals("onKillProcess")) {
            return onKillProcess(args);
        } else if(action.equals("getDeviceInfo")) {
            return getDeviceInfo(args);
        } else if (action.equals("setLogEnabled")) {
            return setLogEnabled(args);
        } else if (action.equals("login")) {
            return login(args);
        } else if (action.equals("logout")) {
            return logout(args);
        } else if (action.equals("setPageCollectionMode")) {
            return setPageCollectionMode(args);
        } else if (action.equals("onPageStart")) {
            return onPageStart(args);
        } else if (action.equals("onPageEnd")) {
            return onPageEnd(args);
        } else if (action.equals("onEvent")) {
            return onEvent(args);
        } else if (action.equals("registerPush")) {
            return registerPush(args);
        }
        return false;
    }

    /**
    预初始化
     */
    private boolean preInit(JSONArray args) {
        try {
            String appKey = args.getString(0);
            String channelId = args.getString(1);
            UMConfigure.preInit(mContext, appKey, channelId);
//            PushHelper.preInit(mContext);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    初始化
     */
    private boolean init(JSONArray args) {
        try {
            String appKey = args.getString(0);
            String channelId = args.getString(1);
            Integer deviceType = args.getInt(2);
            String pushSecret = args.getString(3);
            // 初始化
            UMConfigure.init(mContext, appKey, channelId, deviceType, pushSecret);
            // 页面采集模式
            MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.AUTO);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    获得oaid
     */
    private boolean getOaid(JSONArray args) {
        try {
            UMConfigure.getOaid(mContext,new OnGetOaidListener() {
                @Override
                public void onGetOaid(String oaid) {
                    callbackContext.success(oaid);
                }
            });
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    程序退出时，用于保存统计数据的API
    */
    private boolean onKillProcess(JSONArray args) {
        try {
            MobclickAgent.onKillProcess(mContext);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    设置日志模式
     */
    private boolean setLogEnabled(JSONArray args) {
        try {
            boolean enabled = args.getBoolean(0);
            UMConfigure.setLogEnabled(enabled);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    用户登录
     */
    private boolean login(JSONArray args) {
        try {
            String userId = args.getString(0);
            String platform = args.getString(1);
            if (platform.length() == 0) {
                MobclickAgent.onProfileSignIn(userId);
            } else {
                MobclickAgent.onProfileSignIn(platform, userId);
            }
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    用户登出
     */
    private boolean logout(JSONArray args) {
        try {
            MobclickAgent.onProfileSignOff();
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    设置页面采集模式
     */
    private boolean setPageCollectionMode(JSONArray args) {
        try {
            String mode = args.getString(0);
            if (mode.equals("auto")) {
                // 自动采集选择
                MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.AUTO);
            } else if (mode.equals("manual")) {
                // 手动采集选择
                MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.MANUAL);
            }
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    手动采集页面开始
     */
    private boolean onPageStart(JSONArray args) {
        try {
            String pageName = args.getString(0);
            MobclickAgent.onPageStart(pageName);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    手动采集页面结束
     */
    private boolean onPageEnd(JSONArray args) {
        try {
            String pageName = args.getString(0);
            MobclickAgent.onPageEnd(pageName);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    手动采集页面结束
     */
    private boolean onEvent(JSONArray args) {
        try {
            String name = args.getString(0);
            Map<String, Object> map = (Map) args.getJSONObject(1);
            MobclickAgent.onEventObject(mContext, name, map);
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
    注册推送获得推送设备token
     */
    private boolean registerPush(JSONArray args) {
        try {
            PushAgent.getInstance(mContext).register(new UPushRegisterCallback() {
                @Override
                public void onSuccess(String deviceToken) {
                    callbackContext.success(deviceToken);
                }
                @Override
                public void onFailure(String errCode, String errDesc) {
                    callbackContext.error(errDesc);
                }
            });
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
    获取设备基本信息
     */
    private boolean getDeviceInfo(JSONArray args) {
        try {
            String uuid = Settings.Secure.getString(this.cordova.getActivity().getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
            String model = android.os.Build.MODEL;
//            String productname = android.os.Build.PRODUCT;
            String manufacturer = android.os.Build.MANUFACTURER;
            String serial = android.os.Build.SERIAL;
            String osversion = android.os.Build.VERSION.RELEASE;
//            String sdkversion = android.os.Build.VERSION.SDK;
            TimeZone tz = TimeZone.getDefault();
            Boolean isVirtual = android.os.Build.FINGERPRINT.contains("generic") || android.os.Build.PRODUCT.contains("sdk");
            String platform = android.os.Build.MANUFACTURER.equals("Amazon") ? "amazon-fireos" : "Android";
            JSONObject json = new JSONObject();
            json.put("uuid", uuid);
            json.put("version", osversion);
            json.put("platform", platform);
            json.put("model", model);
            json.put("manufacturer", manufacturer);
	          json.put("isVirtual", isVirtual);
            json.put("serial", serial);
            this.callbackContext.success(json);
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
        return true;
    }
}