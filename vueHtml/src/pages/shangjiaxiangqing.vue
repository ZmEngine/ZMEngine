<template>
  <div class='zm_xiangqing' style="background-color:#fff;color: #000;text-align: left;">
    <el-container>
      <el-header>
        <div style="text-align: center;">商家详情</div>
      </el-header>
    </el-container>

    <template>
      <el-form  label-width="180px">
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
        <el-form-item label="营业执照">
          <div><img v-lazy="loadurl+sjinfo.sjtpyyzz" /></div>
        </el-form-item>
        <el-form-item label="商家照片">
          <div v-for="tp in sjinfo.sjtp" :key='tp'><img v-lazy="loadurl+tp" /></div>
        </el-form-item>
      </el-form>
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
