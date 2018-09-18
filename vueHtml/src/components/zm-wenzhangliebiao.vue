<template>
  <div v-on:click='goSrc()' class='zm-wenzhangliebiao' >
      
      <div class='wzlb-con'>
       <div class='wzlb-biaoti' >
{{biaoti}}
       </div>
       <div class='wzlb-beizhu'>
{{shijian+'   阅读量：'+yueduliang}}
       </div>
      </div>
      <img class='wzlb-img' :src='imgsrc' />
  </div>
</template>

<script>
export default {
  name: 'zm-wenzhangliebiao',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['imgsrc', 'biaoti', 'shijian','yueduliang','tosrc'],
  methods: {
    goSrc () {
      console.log(this.tosrc);
      this.$router.push(this.tosrc)
    }
  }
}
</script>
<style>
  .zm-wenzhangliebiao{
    width:96%;
    width: 96vw;
    height: 200px;
    height: 20vh;
    border-bottom: 2px solid #ccc;
    display: flex;
  }
  .wzlb-img,.wzlb-con{
      height: 180px;
    height: 18vh;
  }
  .wzlb-con{
    float: left;
    width: 70%;
  }
  .wzlb-img{
    float: right;
     width: 26%;
  }
  .wzlb-biaoti{
    color: #000;
    font-size: 2vh;
    line-height: 3vh;
    font-weight: bold;
    height: 15vh;
    overflow: hidden;
  }
  .wzlb-beizhu{
     color: #ccc;
    font-size:2vh;
    line-height: 4vh;
  }
</style>
