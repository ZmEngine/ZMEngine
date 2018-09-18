<template>
  <div class='zm_xiangqing' style="background-color:#fff;color: #000;text-align: left;">

    <template>
      <el-form >
        <el-form-item label="小区名称">
          <div>{{sjinfo.xqmc}}</div>
        </el-form-item>
        <el-form-item label="联系人">
          <div>{{sjinfo.lxr}}</div>
        </el-form-item>
        <el-form-item label="电话">
          <div>{{sjinfo.dianhua}}</div>
        </el-form-item>
        <el-form-item label="门牌号">
          <div>{{sjinfo.mph}}</div>
        </el-form-item>
        <el-form-item label="面积">
          <div>{{sjinfo.mianji}}</div>
        </el-form-item>
        <el-form-item label="价格">
          <div>{{sjinfo.jiage}}</div>
        </el-form-item>
         <el-form-item label="付款方式">
          <div>{{sjinfo.fkfs}}</div>
        </el-form-item>
         <el-form-item label="所属区域">
          <div>{{sjinfo.fyqy}}</div>
        </el-form-item>
         <el-form-item label="楼层">
          <div>{{sjinfo.fylc}}层/共{{sjinfo.fylczs}}层</div>
        </el-form-item>
         <el-form-item label="房源结构">
          <div>{{sjinfo.fyts_s}}室{{sjinfo.fyts_t}}厅{{sjinfo.fyts_w}}卫</div>
        </el-form-item>
        <el-form-item label="详细地址">
          <div>{{sjinfo.fydz}}</div>
        </el-form-item>
        <el-form-item label="房源亮点">
          <div>{{sjinfo.fyld}}</div>
        </el-form-item>
      </el-form>
      <div style='text-align: left;font-weight: bold;'>房源照片</div>
      <div v-for="tp in sjinfo.fytp" :key='tp'><img v-lazy="loadurl+tp" style='width:100vw;' /></div>
    </template>
    <div style='text-align: center;height: 5vh;line-height: 5vh;position: fixed;bottom: 0px;background-color: burlywood;width: 100vw;' v-on:click="goBack"><i class="fa fa-close"></i>关闭</div>
  </div>
  
</template>

<script>
  import {
    getInfo
  } from "../service/getData";
  export default {
    name: "fangyuanxiangqing",
    components: {},
    data() {
      return {
        tabname: "fangyuan/",
        loadurl:"",
        sjinfo: {}
      };
    },
    created: function () {
      let that=this
      this.loadurl = this.env.FileUrl
      getInfo(this.tabname+"selone",{pid:this.$route.params.pid},function(r){
        that.sjinfo=r.data.tab
        that.sjinfo.fytp=JSON.parse(that.sjinfo.fytp)
      })

    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/ydhome/fangyuan");
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
