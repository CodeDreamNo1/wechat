<template>
  <div class="exceptionGuide">
     <div class="exceptionGuides">
       <div class="exceptionGuide_title">
         {{$t('exceptionGuide.title')}}
       </div>
       <div class="exceptionGuide_line"></div>
       <ul class="exceptionGuide_card">
         <li class="exceptionGuide_titles">{{$t('exceptionGuide.receiving')}}</li>
         <li class="exceptionGuide_content space">{{$t('exceptionGuide.receivingDescription')}}</li>
       </ul>
       <!--接收卡-->
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.redlight')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_red1_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_red1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_red2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_red2_2')}}</div>
         </li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.greenlight')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_red1_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_green1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_green2_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_green3_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_green3_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_green4_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_green4_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_green5_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_green5_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_green6_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.R_green6_2')}}</div>
         </li>
       </ul>

       <!--发送卡-->
       <ul class="exceptionGuide_card">
         <li class="exceptionGuide_titles">{{$t('exceptionGuide.send')}}</li>
         <li class="exceptionGuide_content space">{{$t('exceptionGuide.sendDescription')}}</li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.redlight')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_red1_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.S_red1_2')}}</div>
         </li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.greenlight')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green1_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.S_green1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.S_green2_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green3_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.S_green3_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green4_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.S_green4_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green5_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.S_green5_2')}}</div>
         </li>
       </ul>
       <!--监控卡-->
       <ul class="exceptionGuide_card">
         <li class="exceptionGuide_titles">{{$t('exceptionGuide.Monitoring')}}</li>
         <li class="exceptionGuide_content space">{{$t('exceptionGuide.MonitoringDescription')}}</li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.reds')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_red1_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.MO_red1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.MO_red2_2')}}</div>
         </li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.greens')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.MO_green1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.MO_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.MO_green2_2')}}</div>
         </li>
       </ul>
       <!--多功能卡-->
       <ul class="exceptionGuide_card">
         <li class="exceptionGuide_titles">{{$t('exceptionGuide.Multifunction')}}</li>
         <li class="exceptionGuide_content space">{{$t('exceptionGuide.MultifunctionDescription')}}</li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.reds')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.R_red1_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.M_red1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.M_red2_2')}}</div>
         </li>
       </ul>
       <ul class="exceptionGuide_contents">
         <li>{{$t('exceptionGuide.greens')}}</li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.S_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.M_green1_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.M_green2_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.M_green2_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.M_green3_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.M_green3_2')}}</div>
         </li>
         <li>
           <div class="exceptionGuide_titles">{{$t('exceptionGuide.M_green4_1')}}</div>
           <div class="exceptionGuide_content">{{$t('exceptionGuide.M_green4_2')}}</div>
         </li>
       </ul>
       <div class="copyright">Copyright © 2007-2018 Xi'an NovaStar Tech Co.,Ltd. All rights reserved.</div>
     </div>
  </div>
</template>
<script>
  export default {
    name:'exceptionGuide',
    mounted() {
      $(window).scrollTop(0);
    }
  }
</script>
<style  scoped lang='less'>
  .exceptionGuide{
    width: 100%;
    height: 100%;
  }
  .copyright{
    text-align: center;
    font-size: .22rem;
    margin: .5rem auto;
    color: #dadada;
  }
  .space{
    margin: .3rem 0;
  }
  .exceptionGuides{
    margin: .4rem;
    .exceptionGuide_title{
      font-size: .36rem;
      font-weight: 500;
    }
    .exceptionGuide_line{
      width: 1rem;
      border-bottom:2px solid #ccc;
      margin: .3rem 0;
    }
    .exceptionGuide_titles{
      color: #333;
      font-size: .3rem;
    }
    .exceptionGuide_content{
      color: #999;
      font-size: .26rem;
    }
    .exceptionGuide_contents{
      border:1px solid #ddd;
      border-bottom: none;
      margin-bottom: .3rem;
      li{
        border-bottom:1px solid #ddd;
        padding:.1rem .2rem;
      }
      li:first-child{
        text-align: center;
      }
    }
  }

</style>

