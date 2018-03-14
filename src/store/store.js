import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  node: 'cn',
  openid:0,
  sid: 0,
  login:{
    logined:false
  },
  language:'zh_cn',
}
const mutations = {
  isLogin:function(states) {
     state.login.logined = states;
  },
  reduce:function(state) {
    state.count -= 1;
  },
}


export default new Vuex.Store({
  state,mutations
});
