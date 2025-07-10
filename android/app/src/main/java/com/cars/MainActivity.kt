package com.cars

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.i18nmanager.I18nUtil
import com.facebook.react.modules.i18nmanager.I18nUtil
class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "cars"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }


override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(null)
  I18nUtil.getInstance().allowRTL(this, true)
  I18nUtil.getInstance().forceRTL(this, true)
}

  }




