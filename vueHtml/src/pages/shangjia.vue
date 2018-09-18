<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">
      <el-input type='text' size='small' width='300' style="width:300px" v-model="chaxunkey" inline="false" placeholder="分类名称"
        clearable></el-input>
      <el-select v-model="cxsjkey" filterable placeholder="所属分类" size='small'>
        <el-option v-for="item in allops" :key="item.code" :label="item.mc" :value="item.code">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="chaxun()">查找</el-button>
      <el-button type="success" size="mini" @click="add()">新增</el-button>
    </el-row>
    <template>
      <el-table :data="tableData3" height="700" border style="width: 100%">
        <el-table-column fixed="left" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="shanchu(scope.$index,scope.row)" type="danger" size="mini">删除</el-button>
            
            <el-button v-if="scope.row.shjg==='通过'" @click="chexiaoshenhe(scope.$index,scope.row)" type="warning" size="mini">撤销审核</el-button>
            <el-button v-else @click="shenhetongguo(scope.$index,scope.row)" type="success" size="mini">审核通过</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="sjmc" label="店铺名称" width="180">
        </el-table-column>
        <el-table-column prop="lxr" label="联系人" width="180">
        </el-table-column>
        <el-table-column prop="dianhua" label="联系电话" width="180">
        </el-table-column>
        <el-table-column prop="meno" label="商家详情" width="280">
          <template slot-scope="scope">
            <a :href="'./#/shangjiaxiangqing/'+scope.row.pid" target="_blank" style='color:blue;'>查看详情</a>            
          </template>
        </el-table-column>

        <el-table-column prop="lxmc" label="分类" width="100" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.flmc}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="zhuangtai" label="状态" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.shjg?scope.row.shjg:'未审核'}}</el-tag>
          </template>
        </el-table-column>

      </el-table>
      <div class="block">
        <el-pagination @current-change="gettabList" :page-size='10' :current-page='tableindex' layout="prev, pager, next, jumper"
          :total="tabzs">
        </el-pagination>
      </div>
    </template>
    <!-- 弹窗表单 -->
    <el-dialog title="商家信息" :visible.sync="dialogFormVisible" width="800px" center>
            <el-form :model="form" :label-position="formlabelPosition" label-width="80px">

        <el-form-item label="联系人">
          <el-input v-model="form.lxr"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.dianhua"></el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="form.sjmc"></el-input>
        </el-form-item>
        <el-form-item label="商家类型">
           <el-select v-model="form.sjlxkey" filterable placeholder="所属分类" size='small'>
        <el-option v-for="item in allops" :key="item.code" :label="item.mc" :value="item.code">
        </el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="营业开始">
          <el-input v-model="form.kssj" placeholder="00:00"></el-input>
        </el-form-item>
         <el-form-item label="营业结束">
          <el-input v-model="form.jssj" placeholder="00:00"></el-input>
        </el-form-item>
         <el-form-item label="联系地址">
          <el-input v-model="form.sjdz"></el-input>
        </el-form-item>
         <el-form-item label="详细地址">
          <el-input v-model="form.sjdzfullname"></el-input>
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
        <el-form-item label="商家介绍">
          <template>
            <vue-html5-editor :content="form.sjjs" :z-index="10" @change="updatesjjs" ></vue-html5-editor>
          </template>
        </el-form-item> 
         <el-form-item label="营业执照">
          <el-upload ref="zm_uploadyyzz" drag :limit="1" width="490" height="50" class="zm_upload" :action="uploadurl" :name="uploadname" :on-success="shanchuanok"
            :on-error="shangchuanerror" :on-exceed="shangchuanlimit" accept=".jpg,.png" list-type="picture">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商家图片">
          <el-upload ref="zm_uploadsjtp" drag :limit="10" width="490" height="50" class="zm_upload" :action="uploadurl" :name="uploadname" :on-success="shanchuanok"
            :on-error="shangchuanerror" :on-exceed="shangchuanlimit" accept=".jpg,.png" list-type="picture">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
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
    getListbytongbu,
    delInfo,
    postInfo
  } from "../service/getData";
  export default {
    name: "shangjia",
    components: {},
    data() {
      return {
        tabname: "shangjia/",
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
        this.allops = [{
          code: '',
          mc: '不限'
        }]
        let ops = await getListbytongbu('fenlei/selallbysjcode', {sjcode:'shangjia'})
        if (ops.data.tab && ops.data.tab.length > 0) this.allops = this.allops.concat(ops.data.tab);
      },
      SelectRow(o) {
        console.log(o)
        if (o) {
          this.form = o;
        }
      },
      add() {
        if(this.$refs.zm_uploadyyzz) this.$refs.zm_uploadyyzz.clearFiles();
        if(this.$refs.zm_uploadsjtp) this.$refs.zm_uploadsjtp.clearFiles();
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
          this.$confirm('是否删除:' + o.sjmc + '?', '提示', {
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
        this.$confirm('是否审核通过:' + o.sjmc + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postInfo(that.tabname + "shsj", {
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
        this.$confirm('是否撤销:' + o.sjmc + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postInfo(that.tabname + "shsj", {
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
      shanchuanok(response, file, fileList) {
       file.imgurl=response.data.rejg
      },
      shangchuanerror(response, file, fileList) {
        console.log("shangchuanerror_response", response);
        console.log("file", file);
        console.log("fileList", fileList);
      },
      shangchuanlimit(file, fileList) {
        this.$message({
          type: 'error',
          message: '文件数量超出限制'
        });
      },
      btnok() {
        if(this.$refs.zm_uploadyyzz.uploadFiles.length<1||this.$refs.zm_uploadsjtp.uploadFiles.length<1){
          this.$message({
            type: 'error',
            message: '营业执照和商家图片都必须上传'
          });
          return 
        }
        this.form.sjtpyyzz=this.$refs.zm_uploadyyzz.uploadFiles[0].imgurl
let sjtp=[]
for(let tp in this.$refs.zm_uploadsjtp.uploadFiles){
sjtp.push(this.$refs.zm_uploadsjtp.uploadFiles[tp].imgurl)
}
        this.form.sjtp = JSON.stringify(sjtp)
        this.form.sjdzzuobiao_x=this.form.zuobiao.split(',')[0]
        this.form.sjdzzuobiao_y=this.form.zuobiao.split(',')[1]
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
        getList(that.tabname + 'sellisttosh', {
          pagerows: 10,
          nowpage: yema - 1,
          cxkey: this.chaxunkey,
          cxsjkey: this.cxsjkey
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
        this.form.sjjs = con
      }
    }
  };

</script>
<style>


</style>
