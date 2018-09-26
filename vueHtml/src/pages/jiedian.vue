<template>
  <div style="height:100%;">
    <el-row style="margin-bottom:20px;">

      <span>{{mingcheng}}_{{jiediancode}}</span>

    </el-row>
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="参数配置" name="first">
          <el-form :model="canshu_form" label-width="100px">
            <el-form-item v-for=" arr  in canshu_form.arr" :label="arr.code" :key="arr.pid">
              <el-input v-model="canshus[arr.code]" size="small" style="max-width:200px; margin-right:50px;"></el-input><span>{{arr.beizhu}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitcanshu()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="生命周期" name="second">

          <el-form :model="buzou_form" :label-position="formlabelPosition" label-width="100px">
            <el-form-item label="创建前">
              <el-select v-model="buzou_form.chuangjianqian" placeholder="请选择">
                <el-option v-for="item in tableData3" :key="item.pid" :label="item.mingcheng" :value="item.pid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建">
              <el-select v-model="buzou_form.chuangjian" placeholder="请选择">
                <el-option v-for="item in tableData3" :key="item.pid" :label="item.mingcheng" :value="item.pid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建后">
              <el-select v-model="buzou_form.chuangjianhou" placeholder="请选择">
                <el-option v-for="item in tableData3" :key="item.pid" :label="item.mingcheng" :value="item.pid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束前">
              <el-select v-model="buzou_form.jieshuqian" placeholder="请选择">
                <el-option v-for="item in tableData3" :key="item.pid" :label="item.mingcheng" :value="item.pid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束">
              <el-select v-model="buzou_form.jieshu" placeholder="请选择">
                <el-option v-for="item in tableData3" :key="item.pid" :label="item.mingcheng" :value="item.pid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束后">
              <el-select v-model="buzou_form.jieshuhou" placeholder="请选择">
                <el-option v-for="item in tableData3" :key="item.pid" :label="item.mingcheng" :value="item.pid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitbuzou()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="后续节点" name="san">
          <el-row style="margin-bottom:20px;">

            <el-button type="success" size="mini" @click="jiedian_add()">新增</el-button>
            <el-button type="warning" size="mini" @click="jiedian_xiugai()">修改</el-button>
            <el-button type="danger" size="mini" @click="jiedian_shanchu()">删除</el-button>
          </el-row>
          <el-table :data="houxujiedian" height="700" border highlight-current-row @current-change="jiedian_SelectRow"
            style="width: 100%">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="jiedian" label="节点编码" width="180">
            </el-table-column>
            <el-table-column prop="tiaojian" label="条件" width="280">
            </el-table-column>
            <el-table-column prop="iselse" label="是否else" width="280">
            </el-table-column>
            <el-table-column prop="beizhu" label="备注" width="380">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </template>
    <!-- 弹窗表单 -->
    <el-dialog title="编辑后续节点" :visible.sync="jiedian_dialogFormVisible" width="500px" center>
      <el-form :model="canshu_form" :label-position="formlabelPosition" label-width="80px">
        <el-form-item label="节点">
          <el-select v-model="jiedian_form.jiediancode" placeholder="请选择">
            <el-option v-for="item in jiedians" :key="item.code" :label="item.mingcheng" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条件">
          <el-input v-model="jiedian_form.tiaojian"></el-input>
          <div>用act标识当前配置对象。如：act.isok==true</div>
        </el-form-item>
        <el-form-item label="是否else">
          <el-switch v-model="jiedian_form.iselse" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
          <div>表示其他条件都不满足的时候，执行这一条</div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="jiedian_form.beizhu"></el-input>
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
    getList,
    postInfo
  } from "../service/getData";
  export default {
    name: "jiedian",
    components: {},
    data() {
      return {
        mingcheng: "",
        jiediancode: this.$route.params.jiedian,
        form: {},
        canshu_form: {
          arr: []
        },
        canshus: {
          chuangjianqian: "",
          chuangjian: "",
          chuangjianhou: "",
          jieshuqian: "",
          jieshu: "",
          jieshuhou: ""
        },
        buzou_form: {},
        jiedians: [],
        houxujiedian: [],
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
      // `this` 指向 vm 实例
      var that = this;
      that.SelectBanBen(that.banben);
      //加载服务下拉框
      getList("fuwu/sellist", {
        pid: 'pid'
      }, function (r) {
        that.tableData3 = r.data.jg;
        that.tableData3.push({canshu:"",dizhi:"",mingcheng:"无",pid:""})
      });
      //加载流程配置项
      getList("liucheng/selbanbeninfo", {
        code: that.workflow,
        banben: that.banben
      }, function (r) {
        that.canshu_form.arr = r.data.jg.params;
        that.jiedians = r.data.jg.jiedian;
      });
    },
    methods: {
      SelectBanBen(o) {
        var that = this;
        //加载当前节点配置项
        getList("jiedian/seljiedianinfo", {
          workflow:that.workflow,
          banben: that.banben,
          code: that.jiediancode
        }, function (r) {
          that.canshus = r.data.jg.peizhi;
          that.buzou_form = r.data.jg.buzou;
          that.houxujiedian = r.data.jg.houxujiedian;
          that.mingcheng = r.data.jg.mingcheng;
          that.jiediancode = r.data.jg.code;
        });
      },
      submitcanshu() {
        //console.log("canshus:", this.canshus);
        var that = this;
        this.canshus.workflow = this.workflow;
        this.canshus.banben = this.banben;
        this.canshus.jiedian = this.jiediancode;
        //更新用户
        postInfo("jiedian/updcanshu", that.canshus, function (r) {
          if (r.isok) {
            that.$message({
              type: 'success',
              message: '更新成功!'
            });
          } else {
            that.$message({
              type: 'error',
              message: '更新失败：' + r.jg
            });
          }

        });
      },
      submitbuzou() {
        //console.log("canshus:", this.canshus);
        var that = this;
        this.buzou_form.workflow = this.workflow;
        this.buzou_form.banben = this.banben;
        this.buzou_form.jiedian = this.jiediancode;
        //更新用户
        postInfo("jiedian/updbuzou", that.buzou_form, function (r) {
          if (r.isok) {
            that.$message({
              type: 'success',
              message: '更新成功!'
            });
          } else {
            that.$message({
              type: 'error',
              message: '更新失败：' + r.jg
            });
          }

        });
      },
      jiedian_SelectRow(o) {
        this.jiedian_form = o;
        this.jiedian_form.jiediancode = o.jiedian;
      },
      jiedian_add() {
        this.jiedian_form = {
          cmd: "addhouxu",
          jiedian: "",
          tiaojian: "",
          iselse: false
        };
        this.jiedian_dialogFormVisible = true;
      },
      jiedian_xiugai() {
        this.jiedian_form.cmd = "updhouxu";
        if (this.jiedian_form.pid) {
          this.jiedian_dialogFormVisible = true;
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
          this.$confirm('是否删除:' + this.jiedian_form.jiediancode + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getList("jiedian/delhouxu", {
              pid: this.jiedian_form.pid,
              workflow: this.workflow,
              banben: that.banben,
              jiedian: this.jiediancode
            }, function (r) {
              that.houxujiedian = r.data.jg.houxujiedian;
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
      jiedian_btnok() {
        var that = this;
        this.jiedian_dialogFormVisible = false;
        this.jiedian_form.workflow = this.workflow;
        this.jiedian_form.banben = this.banben;
        this.jiedian_form.jiedian = this.jiediancode;
        //更新用户
        postInfo("jiedian/" + this.jiedian_form.cmd, this.jiedian_form, function (r) {
          if (r.isok) {
            that.houxujiedian = r.jg.houxujiedian;
          } else {
            that.$message({
              type: 'error',
              message: '保存失败' + (r.jg ? r.jg : r.error)
            });
          }

        });
      }
    }
  };

</script>
<style>

</style>
