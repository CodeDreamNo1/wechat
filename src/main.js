import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import langs from 'vue-i18n'
import store from './store/store'
import $axios from 'axios'
import $wx from 'weixin-js-sdk'
// import VueWechatTitle from 'vue-wechat-title'
// import $ from 'assets/scripts/zepto.min'
Vue.config.productionTip = false;
Vue.prototype.$axios = $axios;
Vue.use(langs);
Vue.use(Vant);
// Vue.use(VueWechatTitle);
const i18n = new langs({
  locale: store.state.language === 'zh_cn' ? 'zh_cn' : 'en',    // 语言标识
  messages: {
    'zh_cn': require('./assets/lang/cn'),   // 中文语言包
    'en': require('./assets/lang/en')    // 英文语言包
  },
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store, //状态管理
  i18n,
  beforeCreate:function () {
    Vue.prototype.SDKRegister = (url, callback) => {
      // 接入微信JSSDK
      // 获取微信JSSDK配置
      $axios.get(url).then(res => {
        let Res = res.data.data;
      $wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: Res.appId, // 必填，公众号的唯一标识
        timestamp: Res.timestamp, // 必填，生成签名的时间戳
        nonceStr: Res.nonceStr, // 必填，生成签名的随机串
        signature: Res.signature, // 必填，签名，见附录1
        jsApiList: Res.jsApiList,
        jsApiList: [
          'checkJsApi',
          'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    })
      $wx.ready((res) => {
        $wx.hideOptionMenu();
      if(typeof callback === 'function'){
        callback();
      }
    })
    }
    Vue.prototype.SDKRegister('/wx/backend/api/wechat/getJsParam');
    this.$i18n.locale = store.state.language === 'zh_cn' ? 'zh_cn' : 'en';
  },
  render: h => h(App)
})
//////////处理多语言中

