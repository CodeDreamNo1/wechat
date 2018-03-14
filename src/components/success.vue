<template>
  <div>
   <div class="success">
     <img src="../assets/images/success.svg" alt="">
   </div>
  <div class="success_title">{{$t('success.title')}}</div>
  </div>
</template>
<script>
  import { mapState,mapMutations } from 'vuex';
  export default {
    name:'success',
  }
</script>
<style  scoped lang='less'>
   .success{
     width: 100%;
     /*height: 100%;*/
      text-align: center;
      display: flex;
     justify-content: center;
     margin: 3rem 0 .3rem 0;
       img{
         width: 2rem;
         height: 2rem;
       }
   }
  .success_title{
    text-align: center;
    color: #464c5b;
    font-size: 14px;
  }
</style>
