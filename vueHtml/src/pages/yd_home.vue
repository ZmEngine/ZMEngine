<template>
    <div style='display: flex;align-items: center;'>
    <div style="background-color: #ccc; width: 98vw; margin-left: 1vw;overflow-x: hidden;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="shangjia">商家审核</el-menu-item>        
            <el-menu-item index="fangyuan">房源审核</el-menu-item>
          </el-menu>
      <!-- 各个页面主要内容-->
      <div class='appmain' v-bind:style="vheight">      
      <transition name="router-fade" mode="out-in">
        <router-view  ></router-view>
      </transition>
    </div>
      <!--公用的结尾 -->
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data () {
      return {      
          tabbarfixed: true,
          shouyeimg: '../../static/img/shouye1.png',
          lianmengimg: '../../static/img/lianmeng.png',
          fangyuanimg: '../../static/img/fangyuan.png',
          selected: '',
          selecttab:'',
          activeIndex:'1',
        height: window.innerHeight,
        appkey: ''
      }
    },
    computed: {
      // 计算属性的 getter
      vheight: function () {
        // `this` 指向 vm 实例
        //console.log(this.height)
        let xh = this.height - 110
        return {'min-height': xh + 'px'}
      },
      showtabbar:function(){
        //console.log("meta",this.$route.meta.istabbar);
        return this.$route.meta ?this.$route.meta.istabbar: false//this.$router.meta.istabbar
      }
    },
    watch:{
      selecttab(val, oldVal){
        console.log(val,oldVal)
        this.$router.push({path:'/'+val})
      }
    },
    methods: {
      handleSelect (a) {
        console.log('handleSelect',a)
        this.$router.push({path:'/ydhome/'+a})
      },
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
      }
    }
  
  }
  
  </script>
  
  <style>
    #app {
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: #2c3e50;
    }
    .zm_xiangqing .el-form label{
      width: 24vw !important;
      text-align: left;
    }
    .zm_xiangqing .el-form .el-form-item__content{
      margin-left:24vw !important;
    }
    .el-main{
      min-height: 700px;
    }
  </style>
  