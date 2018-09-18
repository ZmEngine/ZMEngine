<template>
  <div class='zm_xiangqing' style="background-color:#fff;color: #000;text-align: left;">
    <template>
      <el-form >
        <el-form-item label="商家名称">
          <div>{{sjinfo.sjmc}}</div>
        </el-form-item>
        <el-form-item label="联系人">
          <div>{{sjinfo.lxr}}</div>
        </el-form-item>
        <el-form-item label="电话">
          <div>{{sjinfo.dianhua}}</div>
        </el-form-item>
        <el-form-item label="商家类型">
          <div>{{sjinfo.flmc}}</div>
        </el-form-item>
        <el-form-item label="营业时间">
          <div>{{sjinfo.kssj}}-{{sjinfo.jssj}}</div>
        </el-form-item>
        <el-form-item label="商家地址">
          <div>{{sjinfo.sjdz}}（{{sjinfo.sjdzfullname}}）</div>
        </el-form-item>
        <el-form-item label="商家介绍">
          <div>{{sjinfo.sjjs}}</div>
        </el-form-item>
      </el-form>
      <div style='text-align: left;font-weight: bold;'>商家营业执照</div>
      <div><img v-lazy="loadurl+sjinfo.sjtpyyzz" style='width:100vw;' /></div>
      <div style='text-align: left;font-weight: bold;'>商家照片</div>
      <div v-for="tp in sjinfo.sjtp" :key='tp'><img v-lazy="loadurl+tp" style='width:100vw;' /></div>
      <div style='text-align: center;height: 5vh;line-height: 5vh;position: fixed;bottom: 0px;background-color: burlywood;width: 100vw;' v-on:click="goBack"><i class="fa fa-close"></i>关闭</div>
    </template>
  </div>
</template>

<script>
  import {
    getInfo
  } from "../service/getData";
  export default {
    name: "shangjiaxiangqing",
    components: {},
    data() {
      return {
        tabname: "shangjia/",
        loadurl:"",
        sjinfo: {}
      };
    },
    created: function () {
      let that=this
      this.loadurl = this.env.FileUrl
      getInfo(this.tabname+"selone",{pid:this.$route.params.pid},function(r){
        that.sjinfo=r.data.tab
        that.sjinfo.sjtp=JSON.parse(that.sjinfo.sjtp)
      })

    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/ydhome/shangjia");
      }
      }
    }

</script>
<style>
  .zm_xiangqing div,
  .zm_xiangqing span,
  .zm_xiangqing label {
    font-size: 20px !important;
    line-height: 24px !important;
  }

</style>
