package com.ihealthlabs.plugins;

import android.os.Bundle;
import org.apache.cordova.*;

import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.MobclickAgent.EScenarioType;

public class UMActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadUrl(launchUrl);
        initUmengSDK();
    }
    
    private void initUmengSDK() {
        MobclickAgent.setScenarioType(this, EScenarioType.E_UM_NORMAL);
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

}
