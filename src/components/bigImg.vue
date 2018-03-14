
<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" @click="bigImg">
      <!-- 遮罩层 -->
      <div class="img-layer"></div>
      <div class="img">
        <img :src="imgSrc">
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['imgSrc'],
    methods: {
      bigImg() {
        // 发送事件
        this.$emit('clickit')
      }
    }
  }
</script>
<style scoped>
  /*动画*/
  .fade-enter-active,
  .fade-leave-active {
    z-index: 999;
    transition: translate3D .2s linear;
    transform: translate3D(0,0,0);

  }

  .fade-enter,
  .fade-leave-active {
    z-index: 999;
    transform: translate3D(100%,0,0);
  }


  /* bigimg */

  .img-view {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
  }

  /*遮罩层样式*/
  .img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .img-view .img img {
    max-width: 100%;
    display: block;
    position: absolute;
    z-index: 999;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  /*不限制图片大小，实现居中*/
  .img-view .img{
    height: 100%;
    display: flex;
    align-items:center;/*垂直居中*/
    justify-content: center;/*水平居中*/
  }

</style>
