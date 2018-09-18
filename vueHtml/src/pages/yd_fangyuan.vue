<template>
  <div style="height:98vh;">
 
    <template>
      <el-table :data="tableData3" height="700" border style="width:98vw">
        <el-table-column fixed="left" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.shjg==='通过'" @click="chexiaoshenhe(scope.$index,scope.row)" type="warning" size="mini">撤销审核</el-button>
            <el-button v-else @click="shenhetongguo(scope.$index,scope.row)" type="success" size="mini">审核通过</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="xqmc" label="小区名称" width="100vw"> </el-table-column>
        </el-table-column>
        <el-table-column prop="meno" label="房源详情" >
          <template slot-scope="scope">
            <a :href="'./#/ydhome/fangyuanxiangqing/'+scope.row.pid" target="_blank" style='color:blue;'>查看详情</a>            
          </template>
        </el-table-column>
      </el-table>
      
    </template>
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
    name: "fangyuan",
    components: {},
    data() {
      return {
        tabname: "fangyuan/",
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
      shanchu(i, o) {
        if (o.pid) {
          var that = this;
          this.$confirm('是否删除:' + o.xqmc +'['+o.lxr+']' + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delInfo(that.tabname + "del", {
                pid: o.pid
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
      shenhetongguo(i, o) {
        var that = this;
        this.$confirm('是否审核通过:' + o.xqmc +'['+o.lxr+']' + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postInfo(that.tabname + "shfy", {
                pid: o.pid,
shjg:'通过'
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
      },
      chexiaoshenhe(i, o) {
        var that = this;
        this.$confirm('是否撤销:' + o.xqmc+'['+o.lxr+']' + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postInfo(that.tabname + "shfy", {
                pid: o.pid,
shjg:'未审核'
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
        getList(that.tabname + 'sellisttosh', {
          pagerows: 100,
          nowpage: yema - 1,
          cxkey: this.chaxunkey,
          cxsjkey: ''
        }, function (r) {
          console.log(r)
          that.tableData3 = r.data.tab
          that.tabzs = r.data.tabzs
        });
      },
      chaxun() {
        this.gettabList(1)
      }
    }
  };

</script>
<style>


</style>
