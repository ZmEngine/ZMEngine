<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">
      <el-input type='text' size='small' width='300' style="width:300px" v-model="chaxunkey" inline="false" placeholder="组件名称"
        clearable></el-input>
      <el-button type="primary" size="mini" @click="chaxun()">查找</el-button>
      <el-button type="success" size="mini" @click="add()">新增</el-button>
      <el-button type="warning" size="mini" @click="xiugai()">修改</el-button>

    </el-row>
    <template>
      <el-table :data="tableData3" height="700" border highlight-current-row @current-change="SelectRow" style="width: 100%">
        <el-table-column prop="biaoqian" label="组件编码" width="180">
        </el-table-column>
        <el-table-column prop="name" label="组件名称" width="380">
        </el-table-column>
        <el-table-column prop="icon" label="组件图标">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="gettabList" :page-size='10' :current-page='tableindex' layout="prev, pager, next, jumper"
          :total="tabzs">
        </el-pagination>
      </div>
    </template>
    <!-- 弹窗表单 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="800px" center>
      <el-form :model="form" :label-position="formlabelPosition" label-width="120px">
        <el-form-item label="组件编码">
          <el-input v-model="form.biaoqian"></el-input>
        </el-form-item>
        <el-form-item label="组件名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="组件图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="占位代码">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.html"></el-input>
        </el-form-item>
        <el-form-item label="样式代码">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.css"></el-input>
        </el-form-item>
        <el-form-item label="初始化js脚本">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.js"></el-input>
        </el-form-item>
        <el-form-item v-for="(op, index) in form.options" :label="'域名' + index" :key="index">
          <el-col :span="2">编码</el-col>
          <el-col :span="9">
            <el-input v-model="op.key"></el-input>
          </el-col>
          <el-col :span="2">显示</el-col>
          <el-col :span="9">
            <el-input v-model="op.name"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click.prevent="removePeiZhi(op)">删除</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addPeiZhi">新增配置项</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList,
    getListbytongbu,
    delInfo,
    postInfo
  } from "../service/getData";
  export default {
    name: "liucheng",
    components: {},
    data() {
      return {
        tabname: "savejson/",
        chaxunkey: "",
        cxsjkey: "",
        loadurl: "",
        uploadurl: "",
        uploadheader: {
          "Content-Type": "multipart/form-data"
        },
        uploadname: "file",
        form: {},
        formlabelPosition: "left",
        dialogFormVisible: false,
        formLabelWidth: "80px",
        allops: [],
        tableindex: 1,
        tabzs: 0,
        tableData3: [],
        tableData_all: []
      };
    },
    created: function () {
      this.uploadurl = this.env.upFileUrl
      this.loadurl = this.env.FileUrl
      this.gettabList()

    },
    methods: {
      SelectRow(o) {
        console.log(o)
        if (o) {
          this.form = o;
        }
      },
      //新增组件
      add() {
        this.form = {
          cmd: "add",
          html: "",
          css: "",
          js: "",
          type: 'zujian',
          class:"neirongzujian",
          options: [],
          optionsdata:{
      isreload:false,
      width:"100%",
      height:"100%",
      backgroundColor:"none",
      style:"",
      class:""
    }
        };
        this.dialogFormVisible = true;
      },
      //新增组件配置
      addPeiZhi() {
        this.form.options.push({
          key: "",
          name: ""
        })
      },
      //删除组件配置
      removePeiZhi(op) {
        for (var i in this.form.options) {
          if (this.form.options[i].key === op.key) {
            this.form.options.splice(i, 1)
          }
        }
      },
      xiugai() {
        this.form.cmd = "upd";
        if (this.form.pid) {
          this.dialogFormVisible = true;
        } else {
          this.$message({
            type: 'error',
            message: '请先点击要修改的数据'
          });
        }
      },
      shanchu() {
        if (this.form.pid) {
          var that = this;
          this.$confirm('是否删除:' + this.form.mc + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delInfo(that.tabname + "del", {
                pid: that.form.pid
              },
              function (r) {
                that.gettabList()
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            type: 'error',
            message: '请先点击要删除的数据'
          });
        }
      },
      btnok() {
        var that = this;
        this.dialogFormVisible = false;
        console.log("btnok", this.form,this.dialogFormVisible)

        //this.tableData3[this.form.obj].nickName = this.form.dengji;
        postInfo(that.tabname + this.form.cmd, {
          dr: "jingtaiyemian",
          fl: "neirongzujian",
          obkey:"biaoqian",
          biaoqian:this.form.biaoqian,
          jsondata:this.form
        }, function (r) {
          that.tableData_all=r.data.jg
          that.gettabList()
        });
      },
      gettabList(yema) {
        let that = this
        if (this.tableData3.length < 1) {
          getList(that.tabname + 'sellist', {
            pagerows: 10,
            nowpage: yema - 1,
            cxkey: this.chaxunkey,
            cxsjkey: this.cxsjkey,
            dr: "jingtaiyemian",
            fl: "neirongzujian"
          }, function (r) {
            console.log(r)
            that.tableData_all = r.data.jg
            that.tableData3 = that.tableData_all
            that.tabzs = 1
          })
        } else if (!this.chaxunkey) {
          that.tableData3 = that.tableData_all
        } else {
          var arr = []
          var patt1 = new RegExp(this.chaxunkey);
          arr = that.tableData_all.filter(function (a) {
            return patt1.test(a.code) || patt1.test(a.name)
          })
          that.tableData3 = arr
        }
      },
      chaxun() {
        this.gettabList(1)
      },
      updatesjjs(con) {
        this.form.neirong = con
      }
    }
  };

</script>
<style>


</style>
