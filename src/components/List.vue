<template>
  <div class="list">
    <MHeader :back="true">列表页</MHeader>
    <div class="container">
      <ul>
        <li v-for="book in books">
          <img :src="book.bookCover" alt="">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button @click="remove(book.bookId)">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {getBooks, removeBook} from '../api'
  export default {
    data () {
      return {
        books:[]
      }
    },
    methods: {
      async getData(){
        this.books = await getBooks();
      },
      async remove(id){
        await removeBook(id);
        this.books = this.books.filter(item => item.bookId!==id);
      }
    },
    created(){
      this.getData();
    },
    computed: {},
    components: {
      MHeader
    }
  }
</script>
<style scoped lang="less">
  .list{
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 51px;
    overflow: auto;

    .container {
      ul{

      padding: 0 10px;
      li{
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        img{
          width: 120px;
          height: 140px;
          margin-right: 5px;
        }
      }
        li:last-child{
          border: none;
        }
    }
      h4{
        font-size: 20px;line-height: 35px;
      }
      p{
        color: #2a2a2a;
        line-height: 25px;
      }
      b{
        color: red;
      }
      button{
        display: block;width: 60px;height: 25px;border: none;border-radius: 20px;background: orange;margin-top: 10px;
      }
    }
  }
</style>
