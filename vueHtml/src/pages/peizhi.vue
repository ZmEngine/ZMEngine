<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">
      <label>编辑版本:</label>
      <el-select v-model="banben" placeholder="请选择" label="" @change="SelectBanBen">
        <el-option v-for="item in banbens" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" size="mini" @click="addbanben()">发布新版本</el-button>
    </el-row>


    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="参数配置" name="first">
          <el-row style="margin-bottom:20px;">

            <el-button type="success" size="mini" @click="canshu_add()">新增</el-button>
            <el-button type="warning" size="mini" @click="canshu_xiugai()">修改</el-button>
            <el-button type="danger" size="mini" @click="canshu_shanchu()">删除</el-button>
          </el-row>
          <el-table :data="canshu_tableData3" height="700" border highlight-current-row @current-change="canshu_SelectRow"
            style="width: 100%">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="code" label="编码" width="180">
            </el-table-column>
            <el-table-column prop="morenzhi" label="默认值" width="180">
            </el-table-column>
            <el-table-column prop="beizhu" label="备注">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="节点配置" name="second">
          <el-row style="margin-bottom:20px;">

            <el-button type="success" size="mini" @click="jiedian_add()">新增</el-button>
            <el-button type="warning" size="mini" @click="jiedian_xiugai()">修改</el-button>
            <el-button type="danger" size="mini" @click="jiedian_shanchu()">删除</el-button>
          </el-row>
          <el-table :data="jiedian_tableData3" height="700" border highlight-current-row @current-change="jiedian_SelectRow"
            style="width: 100%">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column fixed="left" label="操作" width="180">
              <template slot-scope="scope">
                <a :href="'./#/kongbai/jiedian/'+workflow+'/'+banben+'/'+scope.row.code" target="_blank">设定</a>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="编码" width="180">
            </el-table-column>
            <el-table-column prop="mingcheng" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="qishi" label="是否起始节点" width="280">
            </el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>

    </template>

    <!-- 弹窗表单 -->
    <el-dialog title="编辑参数" :visible.sync="canshu_dialogFormVisible" width="500px" center>
      <el-form :model="canshu_form" :label-position="formlabelPosition" label-width="80px">
        <el-form-item label="编码">
          <el-input v-model="canshu_form.code"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input v-model="canshu_form.morenzhi"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="canshu_form.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canshu_dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="canshu_btnok()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗表单 -->
    <el-dialog title="编辑节点" :visible.sync="jiedian_dialogFormVisible" width="500px" center>
      <el-form :model="canshu_form" :label-position="formlabelPosition" label-width="80px">
        <el-form-item label="编码">
          <el-input v-model="jiedian_form.code" :disabled="jiedian_form.cmd!='addjiedian'"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="jiedian_form.mingcheng"></el-input>
        </el-form-item>
        <el-form-item label="是否起始">
          <el-switch v-model="jiedian_form.qishi" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="jiedian_dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="jiedian_btnok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList
  } from "../service/getData";
  export default {
    name: "huanying",
    components: {},
    data() {
      return {
        canshu_form: {},
        jiedian_form: {},
        formlabelPosition: "left",
        islogin: true,
        dialogFormVisible: false,
        canshu_dialogFormVisible: false,
        jiedian_dialogFormVisible: false,
        formLabelWidth: "80px",
        workflow: this.$route.params.workflow,
        banbens: [],
        banben: this.$route.params.banben,
        activeName: "first",
        canshu_tableData3: [],
        jiedian_tableData3: [],
        tableData3: []
      };
    },
    created: function () {
      var that = this;
      getList("liucheng/selbanbens", {
        code: that.workflow
      }, function (r) {
        that.banbens = r.data.jg;
        if (that.banben == "未发布" && that.banbens[0]) {
          that.banben = that.banbens[0].value;
        }
        if(that.banben=='undefined'&&that.banbens.length>0){
          that.banben=that.banbens[0].value
        }
        that.SelectBanBen(that.banben);
      });
    },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'SelectBanBen'
  },
    methods: {
      addbanben(a) {
        //加载用户列表
        let that=this
        getList("liucheng/addbanben", {
          code: that.workflow
        }, function (r) {          
          let newbanben=r.data.jg
          that.banbens.push({value: newbanben, label: newbanben})
          that.banben=newbanben
          that.gosrc({ name: 'peizhi', params: { workflow: that.workflow ,banben:newbanben}})
          //that.SelectBanBen()
        });
      },
      SelectBanBen(o) {
        var that = this;        
        //加载用户列表
        getList("liucheng/selbanbeninfo", {
          code: that.workflow,
          banben: that.banben
        }, function (r) {
          that.canshu_tableData3 = r.data.jg.params;
          that.jiedian_tableData3 = r.data.jg.jiedian;
        });
      },
      gosrc(a){
this.$router.push(a)
      },
      canshu_SelectRow(o) {
        this.canshu_form = o;
      },
      canshu_add() {
        this.canshu_form = {
          cmd: "addcanshu"
        };
        this.canshu_dialogFormVisible = true;
      },
      canshu_xiugai() {
        this.canshu_form.cmd = "updcanshu";
        if (this.canshu_form.pid) {
          this.canshu_dialogFormVisible = true;
        } else {
          this.$message({
            type: 'error',
            message: '请先点击要修改的数据'
          });
        }
      },
      canshu_shanchu() {
        if (this.canshu_form.pid) {
          var that = this;
          this.$confirm('是否删除:' + this.canshu_form.code + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getList("liucheng/delcanshu", {
              pid: this.canshu_form.pid,
              workflow: that.workflow,
              banben: that.banben
            }, function (r) {
             that.SelectBanBen()
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      canshu_btnok() {
        var that = this;
        this.canshu_dialogFormVisible = false;
        this.canshu_form.workflow = that.workflow;
        this.canshu_form.banben = this.banben;
        //更新用户
        getList("liucheng/" + this.canshu_form.cmd, this.canshu_form, function (r) {
          if (r.data.isok) {
            that.SelectBanBen()
          } else {
            that.$message({
              type: 'error',
              message: '保存失败' + (r.data.jg ? r.data.jg : r.data.error)
            });
          }

        });
      },
      jiedian_SelectRow(o) {
        this.jiedian_form = o;
      },
      jiedian_add() {
        this.jiedian_form = {
          cmd: "addjiedian"
        };
        this.jiedian_dialogFormVisible = true;
      },
      jiedian_xiugai() {
        this.jiedian_form.cmd = "updjiedian";
        if (this.jiedian_form.pid) {
          this.jiedian_dialogFormVisible = true;
          this.jiedian_form.qishi=(this.jiedian_form.qishi=='true')
        } else {
          this.$message({
            type: 'error',
            message: '请先点击要修改的数据'
          });
        }
      },
      jiedian_shanchu() {
        if (this.jiedian_form.pid) {
          var that = this;
          this.$confirm('是否删除:' + this.jiedian_form.mingcheng + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("jiedian/deljiedian")
            getList("jiedian/deljiedian", {
              pid: that.jiedian_form.pid,
              workflow: that.workflow,
              banben: that.banben
            }, function (r) {
              that.SelectBanBen(that.banben);
            });
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch((r) => {
            console.log("jiedian/deljiedian",r)
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          that.$message({
            type: 'error',
            message: '请先点击要删除的数据'
          });
        }
      },
      jiedian_btnok() {
        var that = this;
        this.jiedian_dialogFormVisible = false;
        this.jiedian_form.workflow = that.workflow;
        this.jiedian_form.banben = this.banben;
        this.jiedian_form.qishi=(this.jiedian_form.qishi?true:false )
        //更新用户
        getList("jiedian/" + this.jiedian_form.cmd, this.jiedian_form, function (r) {
          if (r.data.isok) {
            that.SelectBanBen(that.banben);
          } else {
            that.$message({
              type: 'error',
              message: '保存失败' + (r.data.jg ? r.data.jg : r.data.error)
            });
          }

        });
      }
    }
  };

</script>
<style>
</style>
