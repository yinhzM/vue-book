<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    mounted(){
      this.swiper.autoplay.start();
    },
    computed:{
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    }
  }
</script>
<style scoped>
  img{
    width: 100%;
  }
</style>
