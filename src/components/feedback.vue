<script src="../../build/webpack.base.conf.js"></script>
<template>
  <div class="feedback">
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <div class="feedback_title">
        {{$t('feedback.problem')}} <i>*</i>
     </div>
     <div class="feedback_content">
       <textarea name="content" id="" cols="30" rows="8" v-model="content" maxlength="800" required :placeholder="$t('feedback.content')"></textarea>
     </div>
    <div class="feedback_title">
      {{$t('feedback.photoSize')}}
    </div>
    <div class="feedback_photoList clearfix">
      <ul class="feedback_photoLists">
        <li v-for="(item, index) in resImgs" ><img :src="item" alt="" @click="largeImg($event)"><div class="close"><i @click="deleteImg(index, item)"></i></div></li>
      </ul>
      <div class="feedback_photo" v-show="resImgs.length < 3"><img src="../../static/img/add.png" alt="" ><input type="file" multiple name="upload" class="feedback_uploads" @change="uploadfile($event)"></div>
    </div>
    <div class="feedback_contact">
      <input type="text" class="contact" :placeholder="$t('feedback.contact')" maxlength="30" v-model="connects">
    </div>
    <button class="submit" @click="submits">{{$t('feedback.submit')}}</button>
    <div class="loadings" v-show="isdisabled">

      <div class="pswp__preloader__icn">
        <div class="pswp__preloader__cut">
          <div class="pswp__preloader__donut"></div>
        </div>
      </div>
      <div>{{$t('commons.loading')}}</div>
    </div>
  </div>
</template>
<script>
  import { state,mutations } from 'vuex';
  import api from '../model/Resource';
  import bigImg from './bigImg.vue';
  import compress from '../assets/scripts/caesiumImg';
  export default {
    name: 'login',
    data () {
      return {
        content: '',//意见内容
        connects: '',//联系方式
        //userCommentImgs: [],//本地显示图片
        showImg:false,//放大图片
        imgSrc: '',//放大图片地址
        resImgs: [],//后台返回来的地址
        isdisabled:false,
        subflag:true,
        defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABVCAYAAAAMoKsDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAD4SURBVHja7NcxEkAwFEVRMSktQWf/S9JZgv6pdCqFieScFfxkXJ+SZAKeza4ABAKv1FEPvh9nq6Pd37ylxeG2dbFBAIGAQEAgIBAQCAgEBAICAYGAQACBgEBAICAQEAgIBAQCAgGBAAIBgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEelIHPnvM90oZ6SGxQcAG+dWbMI3P5x8EEAgIBAQCAgGBgEBAICAQEAgIBBAICAQEAgIBgYBAQCAgEBAIIBAQCAgEBAICAYGAQEAgIBAQCCAQEAgIBAQCAgGBgECgJyWJWwAbBAQCAoGvXAAAAP//AwAGGw2pwXX4ngAAAABJRU5ErkJggg==',
      }
    },
    components: {
      'big-img':bigImg
    },
    methods:{
      deleteImg:function(indexs, url) {
        this.resImgs.forEach((item,index) => {
            if(item === url) {

                this.$axios.post(api.deleteImg(), {fileName:this.resImgs[index]})
                  .then(function(res) {
                    console.log(res);
                  })
//                this.userCommentImgs.splice(index, 1);
                this.resImgs.splice(index, 1);
            }
        })
       },
      largeImg: function (e) {
          if(e.target.src !== this.defaultImg){
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
          };
      },
      viewImg(){
        this.showImg = false;
      },
       uploadfile:function(e) { //文件上传函数
        let that = this;
        that.isdisabled = true;
        let imgLength = that.resImgs.length;
        let file = e.target.files;
        let filetype = ["jpg","jpeg","png","gif",'JPG','JPEG','PNG','GIF'];
        let form = new FormData();
        var flag = false;
         for(var p = 0; p < file.length; p++) {
          if(p + imgLength < 3) {
            for (var i = 0; i < filetype.length; i ++) {
              if(file[p].name.substr(file[p].name.lastIndexOf(".") + 1) === filetype[i]){
                   flag = true;
                   break;
              } else {
                   flag = false;
              }
            }
            if (!flag) {
                   that.isdisabled = false;
                   this.$toast(this.$t('feedback.Uploadingformat'));
                   return;
            }
//            let reader = new FileReader();
//            reader.readAsDataURL(file[p]);
//            reader.onload = function ( event ) {
//              that.userCommentImgs.push(event.target.result);
//            };

            form.append('commentImg',file[p].name);
            if (file[p].size > 2097152) {
              compress.compress(file[p], 0.4, function (err, data) { //压缩图片函数
                if (err) {
                  console.log(err);
                  that.isdisabled = false;
                  return;
                }
                 form.append('filed[]', data);
              });
            } else {
              form.append('filed[]', file[p]);
            }
          } else {
             break;
          }
        }
         let config = {
           headers: {
             'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
           }
         };
        setTimeout(function () {
          e.target.value = '';
          that.$axios.post(api.updataImg(),form, config)
            .then((res) => {
              if(res.data.status === 100000) {
                that.isdisabled = false;
                that.resImgs = that.resImgs.concat(res.data.data);//!!!要求返回数组
              } else {
                that.isdisabled = false;
                that.$toast(that.$t('feedback.Uploaderror'));
              }
            })
            .catch((err) => {
              that.isdisabled = false;
              if(err) {
                  that.$toast(that.$t('feedback.Uploaderror'));
                }
            })
        },2000)
       },
      submits: function(e) {
        let that = this;
        if(that.subflag) {
          that.subflag = false;
          that.content = that.content.replace(/(^\s*)|(\s*$)/g,"");
          if (that.content === '') {
            that.$toast(that.$t('feedback.nocommentMsg'));
            that.subflag = true;
            return;
          }
          if (that.content.length < 4 || that.content.length > 800) {
            that.subflag = true;
            that.$toast(that.$t('feedback.commentMsglength'));
            return;
          }
          if (that.connects.length > 30) {
            that.subflag = true;
            that.$toast(that.$t('feedback.commentMsglength'));
            return;
          }
//         let reg = new RegExp("(^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$)|(^0(10|2[0-5789]|\\d{3})\\d{7,8}$)|(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$)")
//         if(!reg.test(that.connects)) {
//           this.$toast(this.$t('feedback.noformal'));
//           return;
//         }
          let params = {
            openid: that.$store.state.openid,
            commentMsg: that.content,
            connects: that.connects,
            userCommentImgs: that.resImgs
          }
          that.$axios.post(api.submitFeedback(), params)
            .then(function (res) {
              if (res.data.status === 100000) {
                that.$toast(that.$t('feedback.backTip'))
                setTimeout(function () {
                  WeixinJSBridge.call('closeWindow');
                }, 2400)
              } else {
                that.subflag = true;
                that.$toast(that.$t('feedback.Uploaderror'))
              }
            })
            .catch(function (err) {
              that.subflag = true;
              that.$toast(that.$t('feedback.Uploaderror'))
            })
        }
      }
    }
  }
</script>
<style scoped lang='less'>
 .van-toast{
   word-wrap:break-word;
   z-index: 100;
  }
 .pswp__preloader__icn {
   opacity:0.75;
   width: .5rem;
   height: .5rem;
   -webkit-animation: clockwise 500ms linear infinite;
   animation: clockwise 500ms linear infinite;
 }
 .pswp__preloader__cut {
   position: relative;
   width: .25rem;
   height: .5rem;
   overflow: hidden;
   position: absolute;
   top: 0;
   left: 0;
 }
 .pswp__preloader__donut {
   box-sizing: border-box;
   width: .5rem;
   height: .5rem;
   border: 2px solid #fff;
   border-radius: 50%;
   border-left-color: transparent;
   border-bottom-color: transparent;
   position: absolute;
   top: 0;
   left: 0;
   background: none;
   margin:0;
   -webkit-animation: donut-rotate 1000ms cubic-bezier(.4,0,.22,1) infinite;
   animation: donut-rotate 1000ms cubic-bezier(.4,0,.22,1) infinite;
 }

 @-webkit-keyframes clockwise {
   0% { -webkit-transform: rotate(0deg) }
   100% { -webkit-transform: rotate(360deg) }
 }
 @keyframes clockwise {
   0% { transform: rotate(0deg) }
   100% { transform: rotate(360deg) }
 }
 @-webkit-keyframes donut-rotate {
   0% { -webkit-transform: rotate(0) }
   50% { -webkit-transform: rotate(-140deg) }
   100% { -webkit-transform: rotate(0) }
 }
 @keyframes donut-rotate {
   0% { transform: rotate(0) }
   50% { transform: rotate(-140deg) }
   100% { transform: rotate(0) }
 }
 .feedback{
   width: 100%;
   height: 100%;
   min-height: 100vh;
   box-sizing: border-box;
   background:#f5f6f7;
   .feedback_title{
     padding:0.2rem 0.3rem;
     i{
       color: #ff0000;
     }
   }
   .loadings{
     background: rgba(0,0,0,.6) !important;
     color: white;
     width: 100vw;
     height: 100vh;
     max-height: 100vh;
     max-width: 100vw;
     position: fixed;
     display: flex;
     justify-content: center;
     align-items: center;
     top: 0;
     left: 0;
     z-index: 1500;
   }
   .feedback_content{
     padding:0.2rem 0.3rem;
     background: #fff;
   }
   textarea{
     resize:none;
     width: 100%;
   }
   input{
     width: 100%;
     height: 100%;
   }
   input,textarea{
     border:1px solid transparent;
     outline:none;
     margin: 0;
     padding: 0;
   }
   .feedback_photoList{
     background: #fff;
     padding: 0.2rem;
     .feedback_photoLists{
       li{
         width: 2.2rem;
         height: 2.2rem;
         float: left;
         border: 1px dashed #dce3f3;
         margin:0 .06rem;
         position: relative;
         display: flex;
         align-items: center;
         overflow: hidden;
         img{
           width: 100%;
         }
       }
     }
     .feedback_photo{
        width: 2.2rem;
        height: 2.2rem;
        border: 1px dashed #dce3f3;
        float: left;
        overflow: hidden;
        display: flex;
        margin-left:.06rem;
        justify-content: center;
        position: relative;
        align-items: center;
       img{
         width: 100%;
       }
       .feedback_uploads{
         width:100%;
         height: 100%;
         position: absolute;
         left: 0px;
         top: 0px;
         opacity: 0;
         -ms-filter: 'alpha(opacity=0)';
       }
     }
   }
   .feedback_contact{
     padding:0.2rem 0.3rem;
     background: #fff;
     margin-top: .4rem;
   }
   .submit{
     margin: 0.9rem auto;
     display: block;
     background: #43a3fb;
     outline: none;
   }
   .close{
       background: #dce3f3;
       width: 0.35rem;
       height: 0.35rem;
       color: #fff;
       line-height: 0.35rem;
       text-align: center;
       position: absolute;
       right: 0;
       top: 0;
       border-radius:0.02rem;
     i{
        display: block;
       width: 100%;
       height: 100%;
       background: url("../assets/images/close.png") no-repeat center center;
     }

   }
 }
</style>
