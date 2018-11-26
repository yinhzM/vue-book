<template>
  <div class="outer">
    <MHeader>首页</MHeader>
    <div class="swiper">
      <Swiper :swiperSlides="slides"></Swiper>
    </div>
    <div class="container">
      <h3>热门图书</h3>
      <ul>
        <li v-for="hot in hotBooks">
          <img :src="hot.bookCover" alt="">
          <span>{{hot.bookName}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import {getSilders, getHotBook} from "../api"
  export default {
    data () {
      return {
        slides:[],
        hotBooks:[]
      }
    },
    created(){
      this.getSilderImg();
      this.getHot();
    },
    methods: {
      async getSilderImg(){
        this.slides = await getSilders();
      },
      async getHot(){
        this.hotBooks = await getHotBook();
      }
    },
    computed: {},
    components: {MHeader,Swiper}
  }
</script>
<style scoped lang="less">
  .swiper{
    width: 100%;
    overflow: auto;
  }
  h3{
    color: #999;
    padding: 5px 0;
  }
  .outer{
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 51px;
    overflow: auto;
  }
  .container{
    width: 90%;
    margin: 0 auto;
    ul{
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;
      li{
        width: 50%;
        padding: 5px;
        box-sizing: border-box;
        img{
          width: 100%;
        }
        margin-bottom: 5px;
      }
    }
  }
</style>
