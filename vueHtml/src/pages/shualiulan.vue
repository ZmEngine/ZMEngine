<template>
  <div style="height:100%;">
    <el-form :model="form" :label-position="formlabelPosition" label-width="80px"  >
      <el-form-item label="浏览增量(每小时)">
        <el-input-number v-model="form.zengliang"  :min="1" :max="10000" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="是否运行">
        <el-switch  v-model="form.isyunxing"  active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
      </el-form-item>     
      <el-form-item>
        <el-button type="primary" @click="btnok()">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getList,
    postInfo
  } from "../service/getData";
  export default {
    name: "shualiulan",
    components: {},
    data() {
      return {
        tabname: "shualiulan/",
        formlabelPosition:'left',
        form:{}
      };
    },
    created: function () {
      let that=this
      getList(that.tabname + 'sellist', {}, function (r) {
         if(r.data.tab&& r.data.tab.length>0) {
           that.form = r.data.tab[0] 
           that.form.isyunxing=(that.form.isyunxing=='true')
           console.log(r)
         }
        });
    },
    methods: {
      btnok(){
        var that = this;
        //this.tableData3[this.form.obj].nickName = this.form.dengji;
        postInfo(that.tabname + 'add', this.form, function (r) {
         if(r.isok){
           that.$message({
      type: 'success',
      message: '保存成功!'
    });
         }
        });
      }
    }
  };

</script>
<style>
</style>
