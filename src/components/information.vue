<template>
  <div class="information">
    <div class="information_photo">
      <img :src="image" alt="" @error="imgerror" v-if="image">

      <img src="../assets/images/nopicture.svg" alt="" v-else class="noImgHeight">
      <ul class="information_info">
        <li :class="[screenStatusC]">{{sname}}</li>
        <li :class="{information_position:true}">{{address}}</li>
      </ul>
    </div>
    <div class="tab">
      <ul class="tabUl">
        <li v-for="(item,index) in tabarr" @click="tabchange(item, $event)" :class="{'bgcolor':index==0}">{{item}}</li>
      </ul>
      <ul
        id = 'tab1'
        v-if="active"
        v-waterfall-lower="loadMore"
        waterfall-disabled="disabled"
        waterfall-offset="300"
      >
        <li class="information_alarms" v-for="item in list">
          <div class="information_contents" >
            <!--<div class="information_status" v-show="item.latest">{{$t('information.news')}}</div>-->
            <div class="autoformals"><span class="autoformal">{{$t('information.time')}}：</span><span>{{item.time}}</span></div>
            <div class="autoformals"><span class="autoformal">{{$t('information.equipment')}}：</span><span>{{item.device}}</span></div>
            <div class="autoformals"><span class="autoformal">{{$t('information.grade')}}：</span><span>{{item.level}}</span></div>
            <div class="autoformals"><span class="autoformal">{{$t('information.position')}}：</span><span>{{item.position}}</span></div>
            <div class="autoformals"><span class="autoformal">{{$t('information.value')}}：</span><span>{{item.value}}</span></div>
            <div class="autoformals"><span class="autoformal">{{$t('information.normal')}}：</span><span>{{item.normal}}</span></div>
          </div>
        </li>
      </ul>
      <ul v-else
          id = 'tab2'
          v-waterfall-lower="loadMore"
          waterfall-disabled="disabled"
          waterfall-offset="300"
      >
       <li class="information_help" v-for="item in helparr">
            <div class="information_helps">
               <h6>{{item.type}}</h6>
               <div class="information_helpcause">
                 <span class="autoFormal">{{$t('information.PossibleCause')}}：</span><span v-html="item.reason"></span>
               </div>
              <div class="information_helpcause">
                <span class="autoFormal">{{$t('information.InvestigationMethod')}}：</span><span v-html="item.checkItem"></span>
              </div>
            </div>
       </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapState,mapMutations } from 'vuex';
  import api from '../model/Resource';
  import {Waterfall} from 'Vant';
  export default {
    data() {
      return {
        list: [],
        helparr: [],
        sname: "", //屏体名称
        address: "",//屏体地址
        image: "",//最新图片
        hasData: false,//有无数据
        disabled: false, //是否监听滚动事件
        active: true, //是否为点击状态
        tabarr: this.$t('information.tabs'),
        screenStatusC:false,
        params:{
          node: this.$store.state.node,
          sid: this.$store.state.sid,
          language: this.$store.state.language,
          page:1,
          openid:this.$store.state.openid
        },
        totalPage:1,
        firstLoad:true,//是否为第一次加载数据
        DataStatus:true,//是否有数据可以加载
        imgData:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjI0OCAtMjQ4IDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMjQ4IC0yNDggNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0U0RTZFQjt9DQo8L3N0eWxlPg0KPGc+DQoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0NDkuMSw3MSA0NzUuMyw3MSA1MzguNSw3MSA1MzEuMyw0OS4zIDUyNywzNi42IDUyMC42LDE3LjQgNDk3LjcsNDggNDkzLjgsNTMuMSA0OTEuMSw1MC41IA0KCQk0NzUuOSwzNS4zIDQ1My41LDY1LjEgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MzAuMy0xMy45bC0xNy4zLTQ0LjdMMzgwLjYtNy4zbDM5LDEwMC43SDU2MlYtMTMuOUg1MzAuM3ogTTQyMCw2MC40TDM5Ni41LTAuM0w0MjAtOS40VjYwLjR6IE01MDQuOS00Mi4zDQoJCWwxMSwyOC40aC04NC4zTDUwNC45LTQyLjN6IE01NDguNSw4MEg0MzIuM1YtMS42aDExNi4yVjgweiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00NTYuOSwzM2M2LjIsMCwxMS4yLTUsMTEuMi0xMS4yYzAtNi4yLTUtMTEuMi0xMS4yLTExLjJzLTExLjIsNS0xMS4yLDExLjJDNDQ1LjcsMjgsNDUwLjcsMzMsNDU2LjksMzN6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="
      };
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    mounted(){
      if (this.firstLoad){
        this.firstLoad = false;//第一次打开页面加载
        this.loadMore()//初始化数据
      }
    },
    methods: {
      loadMore() {
        this.disabled = true;
        if (this.DataStatus) {
          this.$axios.post(api.getInformation(), this.params)
            .then((res) => {
              if(res.data.status === 100000) {
                   this.list = this.list.concat(res.data.data.list);
                   this.helparr = this.helparr.concat(res.data.data.checkItems);
                   this.sname = res.data.data.sname;
                   this.address = res.data.data.address;
                   this.image = res.data.data.image;
                   this.totalPage = res.data.data.totalPage;
                   this.screenStatusC = [ 'information_screenName','information_screenNames','information_screenNamess'][+res.data.data.level];
                   if (this.totalPage > this.params.page) {
                     this.params.page = this.params.page + 1;
                   } else {
                     this.DataStatus = false;
                   }
                   this.disabled = false;
               } else if(res.data.errorCode[0] === 100101){
                this.$toast(this.$t('information.expired'));
               } else {
                 this.$toast(this.$t('feedback.Uploaderror'));
               }
            })
            .catch((error) => {

            })
        }
      },
      tabchange(name, e) {
             if(name !== this.tabarr[0]) {
               this.active = false;
             } else {
               this.active = true;
             }
             $('.tabUl li').removeClass('bgcolor');
             if(name === e.target.innerText) {
                e.target.className = 'bgcolor';
             }
      },
      imgerror() {
         this.image = false;
      }
    }
  }
</script>
<style scoped lang='less'>
.information{
  width: 100%;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: #f1f4f9;
  overflow: hidden;
  .information_photo{
    position: relative;
    img{
      width: 7.5rem;
    }
    .information_info{
      width:100%;
      position: absolute;
      min-height: .4rem;
      padding-bottom:.08rem;
      bottom:0;
      left: 0;
      color: white;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: -webkit-gradient(linear,0% 0%, 0% 100%, from(rgba(0,0,0,0)), to(rgba(0,0,0,.5)));
        z-index: 0;
      }
      li{
        font-size: 0.2rem;
        padding-left: 0.4rem;
        position: relative;
        z-index: 1;
        line-height: 0.3rem;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .information_screenName{
        background: url("../assets/images/alarm.png") no-repeat 0.06rem center;
      }
      .information_screenNames{
        background: url("../assets/images/fault.png") no-repeat 0.06rem center;
      }
      .information_screenNamess{
        background: url("../assets/images/normal.png") no-repeat 0.06rem center;
      }
      .information_position{
        background: url("../assets/images/position.png") no-repeat 0.06rem center;
      }
    }
  }
  .noImgHeight{
     height: 3.75rem;
  }
  .information_contents span{
     font-size: .26rem;
     vertical-align: top;
  }
  span.autoformal{
    vertical-align: top;
    font-size: .26rem;
  }
  .information_helps h6{
    margin:0 0.2rem .1rem 0;
    font-size: .26rem;
    font-weight: normal;
  }
  .information_helps span{
    display: inline-block;
    width:5.5rem;
    font-size: .26rem;
    vertical-align: top;
  }
  span.autoFormal{
    display: inline-block;
    vertical-align: top;
    /*width:1.3rem;*/
    font-size: .26rem;
  }
  .tabUl{
     &:after{
       display: block;
       content: '';
       clear: both;
     }
     display: flex;
     justify-content: center;
     padding:.3rem .75rem;
     li{
       width: 3rem;
       height: 0.58rem;
       border:1px solid rgba(67, 163, 251, 1);
       float: left;
       color: #55a9fb;
       text-align: center;
       line-height: .58rem;
     }
     li:first-child{
       border-radius: 0.08rem 0 0 0.08rem;
     }
    li:last-child{
      border-radius:0 0.08rem 0.08rem 0;
    }
    .bgcolor{
      background: rgba(67, 163, 251, 1);
      color: white;
    }
  }
  .information_alarms{
    background: #fff;
    padding: .3rem .35rem;
    margin-bottom: .5rem;
    position: relative;
    overflow: hidden;
    color:#464c5b;
    font-size: .26rem;
    .information_status{
      position: absolute;
      font-size: 0.15rem;
      color:white;
      text-align: center;
      line-height: .3rem;
      background: #ee4f4c;
      width:2rem;
      height: .3rem;
      left: -.8rem;
      top: .07rem;
      transform-origin:center center;
      transform:rotate(-45deg);
    }
  }
  .information_help{
    background: #fff;
    padding: .3rem .35rem;
    margin-bottom: .5rem;
    position: relative;
    overflow: hidden;
    color: #464c5b;
    font-size: .26rem;
  }
}
</style>
