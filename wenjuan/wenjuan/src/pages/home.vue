<template>
  <div style="height:96vh;margin-top: 60px;">
    <div style='height: 65vh;'>
      <transition name="zd_xuanzhuanjinru" appear >
        <img :src='fengmian' style="width:80vw;height:60vh;" />
      </transition>
    </div>
    <div class="zm_center">
      <div style='background-color:red;width: 50vw;height: 30px;' class='zd_shanghua zm_btn' v-on:click='kaishidiaocha()'>开始</div>
    </div>
  </div>
</template>

<script>
  import {
    getList,
    selArrByKey
  } from "../service/getData";
  export default {
    name: "home",
    components: {},
    data() {
      return {
        workflow: this.$route.params.liuchengcode,
        liucheng: {},
        params: [],
        jiedian: [],
        fengmian: '',
        banben: 0
      };
    },
    created: function () {
      var that = this;
      //加载流程信息
      getList("zmapi/sellcinfo", {
        lccode: that.workflow,
        banben: ''
      }, function (r) {
        that.liucheng = r.data.jg
        that.banben = (that.liucheng.banben ? that.liucheng.banben : that.liucheng.banbens[0].value)
        //加载基础配置
        that.SelectBanBen(that.banben)
      });
    },
    computed: {
      // 计算属性的 getter
      fylcshowname: function () {
        // `this` 指向 vm 实例
        return '';
      }
    },
    methods: {
      SelectBanBen(o) {
        var that = this;
        that.fengmian = selArrByKey(that.liucheng.params, "code", "fengmian").morenzhi
        that.jiedian = that.liucheng.jiedian
      },
      kaishidiaocha() {
        var kaishicode = selArrByKey(this.jiedian, "qishi", "true").code
       
        this.$router.replace({
          name: 'wenti',
          params: {
            liuchengcode: this.workflow,
            banben: this.banben,
            wenticode: kaishicode
          }
        })
      },
      openpage(a, i) {
        //window.location.href = "./" + a + "?skey=" + pid;
        this.$router.replace({
          name: a
        })
        this.liebiaoindex = i
      },
      GologOut(event) {
        this.loginerr = ''
        this.DelYongHu()
        this.$router.push('/login')
      }
    }
  };

</script>
<style>


</style>
