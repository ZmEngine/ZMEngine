<template>
  <div style="height:100%;">
    <el-form :model="form" :label-position="formlabelPosition" label-width="80px"  >
      <el-form-item label="公司名称">
        <el-input v-model="form.mc"></el-input>
      </el-form-item>
      <el-form-item label="公司电话">
        <el-input v-model="form.dianhua"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.dz"></el-input>
      </el-form-item>
      <el-form-item label="地址坐标">
          <el-col :span="11">
              <el-input v-model="form.zuobiao"></el-input>
            </el-col>
            <el-col class="line" :span="2"></el-col>
            <el-col :span="11">
                <template>
                    <a target="_blank" href='https://lbs.amap.com/console/show/picker' style='color: #337ab7;'>打开坐标获取页面</a>
                </template>
             </el-col>
      </el-form-item>
      <el-form-item label="入驻说明">
        <el-input type="textarea" rows='5' v-model="form.shuoming"></el-input>
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
    name: "shangjiaruzhu",
    components: {},
    data() {
      return {
        tabname: "shangjiaruzhu/",
        formlabelPosition:'left',
        form:{}
      };
    },
    created: function () {
      let that=this
      getList(that.tabname + 'sellist', {}, function (r) {
          console.log(r)
         if(r.data.tab&& r.data.tab.length>0) {
           that.form = r.data.tab[0] 
           that.form.zuobiao =that.form.zuobiao_x+','+that.form.zuobiao_y 
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
