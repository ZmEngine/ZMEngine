<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">
      <el-input type='text' size='small' width='300' style="width:300px" v-model="chaxunkey" inline="false" placeholder="请输入内容" clearable ></el-input>
      <el-button type="primary" size="mini" @click="chaxun()">查找</el-button>
      <el-button type="success" size="mini" @click="add()">新增</el-button>
      <el-button type="warning" size="mini" @click="xiugai()">修改</el-button>
      <el-button type="danger" size="mini" @click="shanchu()">删除</el-button>

    </el-row>
    <template>
      <el-table id='sucai' :data="tableData3" height="700" border highlight-current-row @current-change="SelectRow" style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="filekey" label="资源" width="100">
          <template slot-scope="scope">
            <a target="_blank" :href='loadurl+scope.row.filekey' style='color:blue;'>查看</a>
          </template>
        </el-table-column>
        <el-table-column prop="mc" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="leixing" label="类型" width="180">
          </el-table-column>
        <el-table-column prop="beizhu" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="filekey" label="地址" >
          <template slot-scope="scope">
            <div>{{loadurl}}{{scope.row.filekey}}</div>
          </template>
        </el-table-column>
      </el-table>
       <div class="block">
    <el-pagination
      @current-change="gettabList"
      :page-size='10'
      :current-page='tableindex'
      layout="prev, pager, next, jumper"
      :total="tabzs">
    </el-pagination>
  </div>
    </template>
    <!-- 弹窗表单 -->
    <el-dialog title="分类信息" :visible.sync="dialogFormVisible" width="500px" center>
      <el-form :model="form" :label-position="formlabelPosition" label-width="80px">

        <el-form-item label="名称">
          <el-input v-model="form.mc"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.beizhu"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload ref="zm_upload" drag :limit="1" width="490" height="50" class="zm_upload" :action="uploadurl" :name="uploadname" :on-success="shanchuanok"
            :on-error="shangchuanerror" :on-exceed="shangchuanlimit" accept=".jpg,.png,.mp4" list-type="picture">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png/mp4文件</div>
          </el-upload>
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
    delInfo,
    postInfo
  } from "../service/getData";
  export default {
    name: "sucai",
    components: {},
    data() {
      return {
        tabname:"sucai/",
        chaxunkey:"",
        loadurl:"",
        uploadurl: "",
        uploadheader: {
          "Content-Type": "multipart/form-data"
        },
        uploadname: "file",
        form: {},
        formlabelPosition: "left",
        dialogFormVisible: false,
        formLabelWidth: "80px",
        tableindex:1,
        tabzs:0,
        tableData3: []
      };
    },
    created: function () {
      //加载用户列表
      let that = this;
      this.uploadurl=this.env.upFileUrl
      this.loadurl=this.env.FileUrl   
      that.gettabList()   
    },
    methods: {
      SelectRow(o) {
        console.log(o)
        if(o){
          this.form = o;
        }        
      },
      add() {
       if(this.$refs.zm_upload) this.$refs.zm_upload.clearFiles();
        this.form = {
          cmd: "add"
        };
        this.dialogFormVisible = true; 
      },
      xiugai() {
        this.$refs.zm_upload.clearFiles();
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
            delInfo(that.tabname+"del", {pid: that.form.pid},
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
      shanchuanok(response, file, fileList) {
        let icon = file.response.data.pid;
        this.form.fid = icon;
      },
      shangchuanerror(response, file, fileList) {
        console.log("shangchuanerror_response", response);
        console.log("file", file);
        console.log("fileList", fileList);
      },
      shangchuanlimit(file, fileList) {
        this.$message({
          type: 'error',
          message: '只能上传一个文件'
        });
      },
      btnok() {
        var that = this;
        this.dialogFormVisible = false;
        //this.tableData3[this.form.obj].nickName = this.form.dengji;
       postInfo(that.tabname + this.form.cmd,this.form,function (r) {
           that.tableData3.push(r.sucai)
        });
      },
      gettabList(yema){
        let that=this
        if(!yema){
          yema=that.tableindex
        }else{
          that.tableindex=yema
        }
        getList(that.tabname+'sellist',{pagerows:10,nowpage:yema-1,cxkey:this.chaxunkey},function (r) {
          console.log(r)
        that.tableData3 = r.data.tab
        that.tabzs=r.data.tabzs
      });
      },
      chaxun(){
         this.gettabList(1)
      }
    }
  };

</script>
<style>


</style>
