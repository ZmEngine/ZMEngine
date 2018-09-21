<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">
      <el-input type='text' size='small' width='300' style="width:300px" v-model="chaxunkey" inline="false" placeholder="文章标题"
        clearable></el-input>
      <el-button type="primary" size="mini" @click="chaxun()">查找</el-button>
      <el-button type="success" size="mini" @click="add()">新增</el-button>
      <el-button type="warning" size="mini" @click="xiugai()">修改</el-button>

    </el-row>
    <template>
      <el-table :data="tableData3"
                                  height="700"
                                  border
                                  highlight-current-row
                                  @current-change="SelectRow"
                                  style="width: 100%">
                            <el-table-column fixed="left"
                                             label="操作"
                                             width="180">
                                <template slot-scope="scope">
                                   <a :href="'./#/kongbai/peizhi/'+scope.row.code+'/'+scope.row.banben" target="_blank">设定</a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="code"
                                             label="流程编码"
                                             width="180">
                            </el-table-column>
                            <el-table-column prop="mingcheng"
                                             label="流程名称" width="380">
                            </el-table-column>
                            <el-table-column prop="banben"
                                             label="默认版本">
                            </el-table-column>

                        </el-table>
      <div class="block">
        <el-pagination @current-change="gettabList" :page-size='10' :current-page='tableindex' layout="prev, pager, next, jumper"
          :total="tabzs">
        </el-pagination>
      </div>
    </template>
    <!-- 弹窗表单 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px" center>
            <el-form :model="form" :label-position="formlabelPosition" label-width="80px">
                <el-form-item label="流程编码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="流程名称">
                    <el-input v-model="form.mingcheng"></el-input>
                </el-form-item>
                <el-form-item label="默认版本">
                    <el-input v-model="form.banben" ></el-input>
                </el-form-item>
            </el-form>
            <div>注意:（默认版本不填写则用最新版本）</div>
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
        tabname: "liucheng/",
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
