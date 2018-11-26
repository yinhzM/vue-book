<template>
  <div class="detail">
    <MHeader :back="true">详情</MHeader>
      <ul>
        <li>
          <label for="bookName">书名</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">书信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">书价格</label>
          <input type="number" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li>
          <button @click="update">确认修改</button>
        </li>
      </ul>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {findBook, updateBook} from '../api'
  export default {
    data () {
      return {
        book:{}
      }
    },
    created(){
      this.getBook();
    },
    watch:{
      $route(){
        this.getBook();
      }
    },
    methods: {
      async getBook(){
        this.book = await findBook(this.bid);
        if(Object.keys(this.book).length <= 0){
          this.$router.push('/list');
        }
      },
      async update(){
        await updateBook(this.bid, this.book);
        this.$router.push('/list');
      }
    },
    computed: {
      bid(){
        return this.$route.params.bid;
      }
    },
    components: {
      MHeader
    }
  }
</script>
<style scoped lang="less">
  .detail{
    position: absolute;left: 0;right: 0;top:0;bottom:0;background: #ffffff;z-index: 100;
  }
  ul{
    margin-top: 50px;
  }
</style>
