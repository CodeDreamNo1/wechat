<template>
  <div class="login">
    <img src="../assets/images/logo.svg" alt="">
    <div class="login_form">
        <label for="node">
          <select name="node" id="node" v-model="selectValue">
          <option :value="item.node" v-for="item in selectNode" >{{item.name}}</option>
          </select>
          <div class="login_icon"></div>
        </label>
        <label for="username">
          <input type="text" name="username" v-model="username" @blur="Bugs" id="username" :placeholder="$t('login.username')">
        </label>
        <label for="password">
          <input :type="isShow" name="password" v-model="password" id="password" :placeholder="$t('login.password')">
          <div class="container">
            <div class="bg_con">
              <input id="checked_1" type="checkbox" class="switch" @change="checkedVal($event.target.checked)"/>
              <label for="checked_1"></label>
            </div>
          </div>
        </label>
        <button class="submit" @click="login($event)">{{$t('login.submit')}}</button>
      </div>
  </div>


</template>
<script>
  const height = window.innerHeight;
  import { mapState,mapMutations } from 'vuex';
  import api from '../model/Resource'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      selectValue: "cn",
      isShow: 'password',
      nodelist: [{node:'cn',name:''},{node:'sg',name:''},{node:'us',name:''}],
    }
  },
  computed: {
    selectNode: function () {
      let arr = this.nodelist;
      let cn = this.$t('login.cn');
      let sg = this.$t('login.sg');
      let us = this.$t('login.us');
      let names = [cn, sg, us]
      for(var i = 0; i < arr.length; i++){
          arr[i].name = names[i];
      }
      return arr;
    }
  },
  methods: {
    checkedVal(val) {
       if(val) {
          this.isShow = 'text';
       } else {
         this.isShow = 'password';
       }
    },
    login(e) {
       if (!this.username && this.username !== 0) {
         this.$toast(this.$t('login.Nousernameerr'))
         return;
       }
       if (!this.password && this.password !== 0) {
         this.$toast(this.$t('login.Nopassword'))
         return;
       }
       let params = {
         node: this.selectValue,
         username: this.username,
         password: this.password,
         openid: this.$store.state.openid
       };
       e.target.disabled = true;
       this.$axios.post(api.login(), params)
         .then((res) => {
           if(res.data.status === 100000) {
             this.$toast(this.$t('login.LoginSucceeded'));
             setTimeout(function () {
               WeixinJSBridge.call('closeWindow');
             },2000)
           } else {
             e.target.disabled = false;
             switch(res.data.errorCode[0]) {
               case 100123:  //账户不存在或被禁用
                 this.$toast(this.$t('login.usernameerr'));
                 break;
               case 100124: //密码错误
                 this.$toast(this.$t('login.passworderr'));
                 break;
               case 100125: //网络错误
                 this.$toast(this.$t('login.networkerr'));
                 break;
               case 100128: //已经登录
                 this.$toast(this.$t('login.logined'));
                 break;
               default:
                 this.$toast(this.$t('login.err'));
                 break;
             }
           }
         })
         .catch(function(err) {
            console.log(err);
         })
    },
    Bugs(){
        $('body').css('height','100%');
        $(".login").css("height", '100%');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang='less'>
  .van-toast{
    word-wrap:break-word;
    /*-ms-word-break: break-all;*/
    /*word-break: break-all;*/
    /*word-break: break-word;*/
    /*-webkit-hyphens: auto;*/
    /*-moz-hyphens: auto;*/
    /*hyphens: auto;*/
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
label{
  display: block;
  position: relative;
  .login_icon{
    width: 0;
    height: 0;
    border-bottom: 0.24rem solid #9daacc;
    border-left: 0.24rem solid transparent;
    position: absolute;
    left: 5.68rem;
    bottom: 0.09rem;
  }
}
  .login{
    width: 100%;
    height: 100%;
    padding:1.5rem .65rem;
    box-sizing: border-box;
    /*.login_logo{*/
      /*background: url("../assets/images/icare.png") no-repeat center center;*/
      /*background-size: cover;*/
      /*margin: 0 auto;*/
      /*width:5rem;*/
      /*height:1rem;*/
    /*}*/
    img{
      width: 4.25rem;
      height: .9rem;
      margin: 0 auto;
      display: block;
    }
  }
  .submit{
    background: #43a3fb;
    margin-top:0.7rem;
  }
 .container{
   position: absolute;
   right:.3rem ;
   bottom: .25rem;
   width:1rem;
   height: .5rem;
   .switch{
     display:none;
   }
   input{
     width:1rem;
     height: .5rem;
   }
   label{
     position:relative;
     display: block;
     padding: 0.02rem;
     border-radius: .5rem;
     height: .45rem;
     margin-bottom: .29rem;
     background-color: #eee;
     cursor: pointer;
     vertical-align: top;
     -webkit-user-select: none;
   }
   label:before{
     content: '...';
     display: block;
     color: #9ea8b4;
     text-align:right;
     font-size:0.4rem;
     border-radius: .5rem;
     height: .35rem;
     line-height: .13rem;
     padding:0.05rem;
     background-color: white;
     -webkit-transform: scale(1, 1);
     -webkit-transition: all 0.3s ease;
   }
   label:after{
     content: '';
     position: absolute;
     top: 50%;
     left: 50%;
     margin-top: -.22rem;
     margin-left: -.22rem;
     width: .45rem;
     height: .45rem;
     border-radius: .45rem;
     background-color: white;
     box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.08);
     -webkit-transform: translateX(-0.26rem);
     -webkit-transition: all 0.3s ease;
   }
   .switch:checked~label:after{
     -webkit-transform: translateX(0.26rem);
   }

   .switch:checked~label:before{
     background-color:#43a3fb;
     content:'abc';
     text-align: left;
     color: white;
     padding:0.05rem;
     font-size:0.16rem;
     line-height: .35rem;
   }
 }
</style>
