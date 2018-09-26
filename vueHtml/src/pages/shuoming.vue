<template>
  <div style="height:100%;">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="获取流程信息" name="1">
        <div>接口地址：/zmapi/sellcinfo</div>
        <div>参数：
          <div>lccode[流程编码]:
            <el-input v-model="lccode" placeholder="请输入内容"></el-input>
          </div>
          <div>banben[版本，非必填]:
            <el-input v-model="banben"></el-input>
          </div>
          <el-button type="primary" size="mini" @click="sellcinfo()">测试</el-button>
          <div>
            {{sellcinfojg}}
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="获取流程起始节点" name="2">
        <div>接口地址：/zmapi/selfirst</div>
        <div>参数：
          <div>lccode[流程编码]:
            <el-input v-model="lccode" placeholder="请输入内容"></el-input>
          </div>
          <div>banben[版本，非必填]:
            <el-input v-model="banben"></el-input>
          </div>
          <el-button type="primary" size="mini" @click="selfirst()">测试</el-button>
          <div>
            {{selfirstjg}}
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="获取节点信息" name="3">
          <div>接口地址：/zmapi/selnownode</div>
          <div>参数：
            <div>lccode[流程编码]:
              <el-input v-model="lccode" placeholder="请输入内容"></el-input>
            </div>
            <div>banben[版本，非必填]:
              <el-input v-model="banben"></el-input>
            </div>
            <div>jiedian[节点编码]]:
                <el-input v-model="jiedian" placeholder="请输入节点编码" ></el-input>
              </div>
            <el-button type="primary" size="mini" @click="selnownode()">测试</el-button>
            <div>
              {{selnownodejg}}
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="获取下一节点信息" name="4">
            <div>接口地址：/zmapi/selnextnode</div>
            <div>参数：
              <div>lccode[流程编码]:
                <el-input v-model="lccode" placeholder="请输入内容"></el-input>
              </div>
              <div>banben[版本，非必填]:
                <el-input v-model="banben"></el-input>
              </div>
              <div>jiedian[节点编码]]:
                  <el-input v-model="jiedian" placeholder="请输入节点编码" ></el-input>
                </div>
                <div>params[涉及的路由判断参数，用JSON.stringify序列化为字符串]]]:
                    <el-input v-model="params" placeholder="请输入节点编码" ></el-input>
                  </div>
              <el-button type="primary" size="mini" @click="selnextnode()">测试</el-button>
              <div>
                {{selnextnodejg}}
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="提交当前节点" name="5">
              <div>接口地址：/zmapi/submitnode</div>
              <div>参数：
                <div>lccode[流程编码]:
                  <el-input v-model="lccode" placeholder="请输入内容"></el-input>
                </div>
                <div>banben[版本，非必填]:
                  <el-input v-model="banben"></el-input>
                </div>
                <div>jiedian[节点编码]]:
                    <el-input v-model="jiedian" placeholder="请输入节点编码" ></el-input>
                  </div>
                  <div>params[涉及的路由判断参数，用JSON.stringify序列化为字符串]]]:
                      <el-input v-model="params" placeholder="请输入节点编码" ></el-input>
                    </div>
                <el-button type="primary" size="mini" @click="submitnode()">测试</el-button>
                <div>
                  {{submitnodejg}}
                </div>
              </div>
            </el-collapse-item>
    </el-collapse>
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
        activeName: 1,
        lccode: 'ceshivue',
        banben: 10,
        jiedian:'',
        params:JSON.stringify({bxje:1000}),
        selfirstjg: '',
        sellcinfojg: '',
        selnownodejg:'',
        selnextnodejg:'',
        submitnodejg:''
      };
    },
    created: function () {

    },
    methods: {
      selfirst() {
        let that = this
        getList('zmapi/selfirst', {
          lccode: that.lccode,
          banben: that.banben
        }, function (r) {
          that.selfirstjg = JSON.stringify(r)
        })

      },
      sellcinfo() {
        let that = this
        getList('zmapi/sellcinfo', {
          lccode: that.lccode,
          banben: that.banben
        }, function (r) {
          that.sellcinfojg = JSON.stringify(r)
        })
      },
      selnownode() {
        let that = this
        getList('zmapi/selnownode', {
          lccode: that.lccode,
          banben: that.banben,
          jiedian: that.jiedian
        }, function (r) {
          that.selnownodejg = JSON.stringify(r)
        })
      },
      selnextnode() {
        let that = this
        getList('zmapi/selnextnode', {
          lccode: that.lccode,
          banben: that.banben,
          jiedian: that.jiedian,
          params:that.params
        }, function (r) {
          that.selnextnodejg = JSON.stringify(r)
        })
      },
      submitnode() {
        let that = this
        getList('zmapi/submitnode', {
          lccode: that.lccode,
          banben: that.banben,
          jiedian: that.jiedian,
          params:that.params
        }, function (r) {
          that.submitnodejg = JSON.stringify(r)
        })
      }
      
    }
  };

</script>
<style>

</style>
