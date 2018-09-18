<template>
  <div style="height:100%;">
    <!--公用的头 -->
    <el-container style="border: 1px solid #eee;height:100%;">
      <el-header>
        <div style="height:30px;">
          <span style="float: left; font-size: 20px;font-weight:bolder;">
                     <img src="../../static/img/logo.png" height="40" width="40" slot="icon">
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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>文章视频管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="11" @click="openpage('wenzhang',['1','11'])">
                      <template slot="title">
                        <i class="el-icon-menu"></i>文章管理
                      </template>
                </el-menu-item>
                <el-menu-item index="12" @click="openpage('shipin',['1','12'])">
                  <template slot="title">
                    <i class="el-icon-menu"></i>视频管理
                  </template>
                </el-menu-item>                
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="openpage('shangjia',['2'])">
              <template slot="title">
                <i class="el-icon-menu"></i>入驻商家管理
              </template>
            </el-menu-item>
            <el-menu-item index="3" @click="openpage('fangyuan',['2'])">
              <template slot="title">
                <i class="el-icon-menu"></i>房源管理
              </template>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统配置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="41" @click="openpage('sucai',['4','41'])">
                      <template slot="title">
                        <i class="el-icon-menu"></i>素材管理
                      </template>
                </el-menu-item>
                <el-menu-item index="42" @click="openpage('banner',['4','42'])">
                  <template slot="title">
                    <i class="el-icon-menu"></i>Banner管理
                  </template>
                </el-menu-item>
                <el-menu-item index="422" @click="openpage('fenlei',['4','422'])">
                  <template slot="title">
                    <i class="el-icon-menu"></i>分类管理
                  </template>
                </el-menu-item>
                <el-menu-item index="43" @click="openpage('shangjiaruzhu',['4','43'])">
                  <template slot="title">
                    <i class="el-icon-tickets"></i>商家入驻说明
                  </template>
                </el-menu-item>
                <el-menu-item index="44" @click="openpage('shualiulan',['4','43'])">
                  <template slot="title">
                    <i class="el-icon-tickets"></i>文章阅读量设定
                  </template>
                </el-menu-item>
                <el-menu-item index="45" @click="openpage('xiugaimima',['4','43'])">
                  <template slot="title">
                    <i class="el-icon-setting"></i>修改密码
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <template>
            <router-view/>
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
        appkey: "",
        liebiaoindex:["1"]
      };
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
