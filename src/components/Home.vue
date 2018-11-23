<template>
  <div>
    <MHeader>首页</MHeader>
    <div class="swiper">
      <Swiper :swiperSlides="slides"></Swiper>
    </div>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import {getSilders} from "../api"
  export default {
    data () {
      return {
        slides:[]
      }
    },
    async created(){
      let {data} = await getSilders();
      this.slides = data;
    },
    methods: {},
    computed: {},
    components: {MHeader,Swiper}
  }
</script>
<style scoped>
  .swiper{
    position: fixed;
    width: 100%;
    top:40px;
    overflow: auto;
  }
</style>
