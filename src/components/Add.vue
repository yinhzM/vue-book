<template>
  <div>
    <MHeader>添加</MHeader>
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
        <label for="bookCover">书封面</label>
        <input type="text" v-model="book.bookCover" id="bookCover">
      </li>
      <li>
        <button @click="add">添加</button>
      </li>
    </ul>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {addBook} from '../api'
  export default {
    data () {
      return {
        book:{}
      }
    },
    methods: {
      async add(){
        await addBook(this.book);
        this.$router.push('/list');
      }
    },
    computed: {},
    components: {MHeader}
  }
</script>
<style scoped lang="less">
  ul{
    margin-top: 50px;
  }
</style>
