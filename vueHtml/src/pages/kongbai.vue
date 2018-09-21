<template>
  <div style="height:100%;">
    <!--公用的头 -->
    <el-container style="border: 1px solid #eee;height:100%;">
      <el-header>
        <div style="height:30px;">
          <span style="float: left; font-size: 20px;font-weight:bolder;">
                     <img src="../../static/img/logo.png" height="40" width="40" slot="icon">
                     {{appname}}
                   </span> &nbsp;
          <span style="float: right; font-size: 14px">
                        {{ad.name}}  &nbsp;  &nbsp;&nbsp;&nbsp;
                        <span  v-on:click="GologOut" >退出</span>
                    </span>
        </div>
      </el-header>
      <el-container>
        
        <el-main >
          <template>
            <div style="min-height: 700px;">
<router-view/>
            </div>            
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "home",
    components: {
    },
    data() {
      return {
        ad: {
          name: "管理员"
        },
        appname:'this.env.appName',
        appkey: "",
        liebiaoindex:["1"]
      };
    },
    created: function () {
      this.appname = this.env.appName
    },
    methods: {
      ...mapMutations([
      'DelYongHu'
    ]),
      openpage(a,i) {
        //window.location.href = "./" + a + "?skey=" + pid;
        this.$router.replace({name:a})
        this.liebiaoindex=i
      },
      GologOut (event) {
      this.loginerr = ''
        this.DelYongHu()
        this.$router.push('/login')
    }
    }
  };

</script>
<style>
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

</style>
