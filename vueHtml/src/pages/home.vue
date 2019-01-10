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
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="liebiaoindex">  
              <el-menu-item index="1" @click="openpage('shuoming',['1'])">
              <template slot="title">
                <i class="el-icon-menu"></i>调用说明
              </template>
            </el-menu-item>          
            <el-menu-item index="2" @click="openpage('fuwu',['2'])">
              <template slot="title">
                <i class="el-icon-menu"></i>服务列表
              </template>
            </el-menu-item>
            <el-menu-item index="3" @click="openpage('liucheng',['3'])">
              <template slot="title">
                <i class="el-icon-menu"></i>流程列表
              </template>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>辅助功能</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="51" @click="openpage('neirongzujian',['5','51'])">
                      <template slot="title">
                        <i class="el-icon-menu"></i>内容组件配置
                      </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统配置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="61" @click="openpage('sucai',['6','61'])">
                      <template slot="title">
                        <i class="el-icon-menu"></i>素材管理
                      </template>
                </el-menu-item>
                <el-menu-item index="65" @click="openpage('xiugaimima',['6','65'])">
                  <template slot="title">
                    <i class="el-icon-setting"></i>修改密码
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

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
