<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-return" v-show="back" @click="goBack"></i>
  </div>
</template>
<script>
  export default {
    props:{
      back:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {}
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    },
    computed: {},
    components: {}
  }
</script>
<style scoped lang="less">
  .header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    border-bottom: 1px solid #ccc;text-align: center;
    height: 40px;line-height: 40px;font-weight: bold;
    i{
      position: absolute;
      left: 10px;
      font-size: 20px;
    }
  }
</style>
