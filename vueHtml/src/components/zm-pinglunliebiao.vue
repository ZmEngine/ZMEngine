<template>
  <div class='zm-pinglunliebiao'>
    <!-- 评论头 -->
    <div class='pl-header'>
        <img class='pl-touxiang' :src='touxiang' />
        <div class='pl-header-r'>
            <div class='pl-yonghu'>
                {{yonghu}}
              </div>
              <div class='pl-beizhu'>
                {{shijian}}
              </div>
        </div>
    </div>
    <div class='pl-con'>
      {{neirong}}
    </div>    
  </div>
</template>

<script>
  export default {
    name: 'zm-pinglunliebiao',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    props: ['touxiang','yonghu', 'shijian','neirong'],
    methods: {
      goSrc() {
        this.$router.push(this.tosrc)
      }
    }
  }

</script>
<style>
  .zm-pinglunliebiao {
    width: 96%;
    width: 96vw;
    border-bottom: 2px solid #ccc;
    display: flex;
    flex-direction:column;
  }

  .pl-header {
    width: 100%;
    height: 7vh;
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
  }

  .pl-touxiang {
    width: 6vh;
    height: 6vh;
    border-radius: 3vh;
    border: 1px solid #eee;
  }
  .pl-header-r {
    height: 7vh;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: flex-start
  }
  .pl-yonghu {
    width: 80vw;
    color: #000;
    font-size: 2vh;
    line-height: 3vh;
    font-weight: bold;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  }

  .pl-beizhu {
    color: #ccc;
    font-size: 2vh;
    line-height: 4vh;
  }
  .pl-con{
    color: #555;
    font-size: 2.5vh;
    padding-top:1vh ;
    padding-bottom:1vh ;
  }
</style>
