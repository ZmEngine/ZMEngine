<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">
      <el-input type='text' size='small' width='300' style="width:300px" v-model="chaxunkey" inline="false" placeholder="文章标题"
        clearable></el-input>
      <el-select v-model="cxsjkey" filterable placeholder="所属分类"  size='small' >
        <el-option v-for="item in allops" :key="item.code" :label="item.mc" :value="item.code">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="chaxun()">查找</el-button>
      <el-button type="success" size="mini" @click="add()">新增</el-button>
      <el-button type="warning" size="mini" @click="xiugai()">修改</el-button>
      <el-button type="danger" size="mini" @click="shanchu()">删除</el-button>

    </el-row>
    <template>
      <el-table id='fenlei' :data="tableData3" height="700" border highlight-current-row @current-change="SelectRow"
        style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>        
         <el-table-column prop="biaoti" label="标题" width="380">
        </el-table-column>
        <el-table-column prop="flmc" label="所属分类" width="180">
        </el-table-column>
        <el-table-column prop="fbsj" label="发布时间" width="180">
        </el-table-column>
        <el-table-column prop="yueduliang" label="阅读量" width="180">
        </el-table-column>
        <el-table-column prop="dianzan" label="点赞量" width="180">
        </el-table-column>
        <el-table-column prop="gaiyao" label="概要说明">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="gettabList" :page-size='10' :current-page='tableindex' layout="prev, pager, next, jumper"
          :total="tabzs">
        </el-pagination>
      </div>
    </template>
    <!-- 弹窗表单 -->
    <el-dialog title="分类信息" :visible.sync="dialogFormVisible" width="800px" center>
      <el-form :model="form" :label-position="formlabelPosition" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.biaoti"></el-input>
        </el-form-item>        
        <el-form-item label="所属分类">
        <el-select v-model="form.flcode" filterable placeholder="所属分类">
          <el-option v-for="item in allops" :key="item.code" :label="item.mc" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="列表图">
          <el-input v-model="form.fengmian"></el-input>
        </el-form-item> 
      <el-form-item label="概要说明">
        <el-input type="textarea" rows='5' v-model="form.gaiyao"></el-input>
      </el-form-item>
        <el-form-item label="文章正文">
          <template>
            <vue-html5-editor :content="form.neirong" :z-index="10" @change="updatesjjs" ></vue-html5-editor>
          </template>
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
    name: "wenzhang",
    components: {},
    data() {
      return {
        tabname: "wenzhang/",
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
        tableData3: []
      };
    },
    created: function () {
      this.uploadurl = this.env.upFileUrl
      this.loadurl = this.env.FileUrl     
      this.gettabList()
      
    },
    methods: {
     async LoadSelops() {
        this.allops =[{code:'',mc:'不限'}]
      let ops= await getListbytongbu('fenlei/selall', {})
     if(ops.data.tab&&ops.data.tab.length>0) this.allops = this.allops.concat(ops.data.tab); 
      },
      SelectRow(o) {
        console.log(o)
        if (o) {
          this.form = o;
        }
      },
      add() {
        this.form = {
          cmd: "add"
        };
        this.dialogFormVisible = true;
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
        //this.tableData3[this.form.obj].nickName = this.form.dengji;
        postInfo(that.tabname + this.form.cmd, this.form, function (r) {
          that.gettabList()
        });
      },
      gettabList(yema) {
        this.LoadSelops()
        let that = this
        if (!yema) {
          yema = that.tableindex
        } else {
          that.tableindex = yema
        }
        getList(that.tabname + 'sellist', {
          pagerows: 10,
          nowpage: yema - 1,
          cxkey: this.chaxunkey,
          cxsjkey:this.cxsjkey
        }, function (r) {
          console.log(r)
          that.tableData3 = r.data.tab
          that.tabzs = r.data.tabzs
        });
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
