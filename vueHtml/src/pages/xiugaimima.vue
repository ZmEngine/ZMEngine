<template>
  <div style="height:100%;">
    <el-form :model="form" :label-position="formlabelPosition" label-width="80px"  >
      <el-form-item label="旧密码">
        <el-input v-model="form.oldpwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newpwd"></el-input>
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
    name: "xiugaimima",
    components: {},
    data() {
      return {
        tabname: "guanliyuan/",
        formlabelPosition:'left',
        form:{}
      };
    },
    created: function () {      
    },
    methods: {
      btnok(){
        var that = this;
        //this.tableData3[this.form.obj].nickName = this.form.dengji;
        postInfo(that.tabname + 'updpwd', this.form, function (r) {
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
