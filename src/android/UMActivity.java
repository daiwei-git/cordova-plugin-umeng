package com.ihealthlabs.plugins;

import android.os.Bundle;
import org.apache.cordova.*;

import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.MobclickAgent.EScenarioType;

public class UMActivity extends CordovaActivity {
  @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
        initUmengSDK();
    }

    /********************** 集成友盟SDK方式2,建议使用 Begin **********************/
    /**
     * onCreate中调用
     */
    private void initUmengSDK() {
        MobclickAgent.setScenarioType(this, EScenarioType.E_UM_NORMAL);
        MobclickAgent.setDebugMode(true);
        MobclickAgent.openActivityDurationTrack(false);
        // MobclickAgent.setSessionContinueMillis(1000);
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }
    /********************** 集成友盟SDK方式2,建议使用 End **********************/

}
