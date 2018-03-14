import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store';
import login from '@/components/login'
import index from '@/components/index'
import feedback from '@/components/feedback'
import information from '@/components/information'
import success from '@/components/success'
import exceptionGuide from '@/components/exceptionGuide'
Vue.use(Router);
let getlang = () => {
  let url = location.hash.split('?').pop(); //获取url中"?"符后的字串
  let theRequest = Object.create(null);
  if (url.indexOf("&") != -1) {
   let urlparams = url.split("&");
    for (let i = 0; i < urlparams.length; i++) {
      theRequest[urlparams[i].split("=")[0]] = unescape(urlparams[i].split("=")[1]);
    }
  } else {
      theRequest[url.split("=")[0]] = unescape(url.split("=")[1]);
  }
  return theRequest; //返回地址栏参数对象
 }
let route = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback,
    },
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    {
      path: '/checkSuccess',
      name: 'success',
      component: success,
    },
    {
      path: '/exceptionGuide',
      name: 'exceptionGuide',
      component: exceptionGuide,
    },
    // { /* Not Found 路由，必须是最后一个路由 */
    //   path: '*',
    //   component: NotFound,
    //   meta: {
    //     title: '找不到页面'
    //   }
    // }
  ]
})
route.beforeEach(({ meta }, from, next)  => {
  let params = getlang();
  for(var i in params) {
     if (params[i] != store.state[i]) {
        store.state[i] = params[i]
     }
  }
  next();
})
export default route
