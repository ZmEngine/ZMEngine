<template>
  <div>
    <div class='wenjuantimu' style="height:10vh;font-size:2.5vh;text-align: center">{{jiedianinfo.timu}}</div>
    <div style="height:86vh;">

      <div style='height: 45vh;display: flex;justify-content: center;'>
        <transition name="zd_xuanzhuanjinru" appear>
          <div :src='jiedianinfo.fengmian' class="wentishuomingarea" v-bind:style ="{backgroundImage:'url('+jiedianinfo.fengmian+')'}" v-show="isreload" >
          {{jiedianinfo.txt}}
          </div>
        </transition>
      </div>
      <div class="zm_center_wrap">
        <transition name="zd_shanghua_A" appear>
          <div style='background-color:red;width: 86vw;min-height: 30px;text-align: left;line-height:3.5vh;height: auto;'
            v-show="isreload" v-if="jiedianinfo.wenti_A" class='zm_btn' v-on:click='huida("A")'>{{jiedianinfo.wenti_A}}</div>
        </transition>
        <transition name="zd_shanghua_B" appear>
          <div style='background-color:red;width: 86vw;min-height: 30px;text-align: left;line-height:3.5vh;height: auto;'
            v-show="isreload" v-if="jiedianinfo.wenti_B" class='zm_btn' v-on:click='huida("B")'>{{jiedianinfo.wenti_B}}</div>
        </transition>
        <transition name="zd_shanghua_C" appear>
          <div style='background-color:red;width: 86vw;min-height: 30px;text-align: left;line-height:3.5vh;height: auto;'
            v-show="isreload" v-if="jiedianinfo.wenti_C" class='zm_btn' v-on:click='huida("C")'>{{jiedianinfo.wenti_C}}</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getList,
    postInfo
  } from "../service/getData";
  export default {
    name: "wenti",
    components: {},
    beforeRouteUpdate(to, from, next) {
    //  console.log("beforeRouteUpdate", this.fengmian)
      next()
      var that = this
      that.isreload = false
      this.jiazaiwenti()
      setTimeout(function () {
        that.isreload = true
      }, 500)
    },
    data() {
      return {
        workflow: "",
        banben: "",
        jiedian: "",
        fengmian: "",
        jiedianinfo: {},
        isreload: true,
        y: 1
      }
    },
    created: function () {
     // console.log("wenti_created")
      this.jiazaiwenti()
    },
    methods: {
      jiazaiwenti() {
      //  console.log("wenti_jiazaiwenti")
        var that = this
        getList("zmapi/selnownode", {
          lccode: this.$route.params.liuchengcode,
          banben: this.$route.params.banben,
          jiedian: this.$route.params.wenticode
        }, function (r) {
        //  console.log("wenti_jiazaiwenti", r)
          that.jiedianinfo = r.data.jg.peizhi
        });
      },
      huida(xuanxiang) {
        var that = this
        getList("zmapi/selnextnode", {
          lccode: this.$route.params.liuchengcode,
          banben: this.$route.params.banben,
          jiedian: this.$route.params.wenticode,
          params: JSON.stringify({
            daan: xuanxiang
          })
        }, function (r) {
          //console.log("huida", r)
          var nextnode = r.data.jg[0]
          if (nextnode.code == 'jieshu') {
            //跳转结束页
            //跳转下一个问题
            that.$router.replace({
              name: 'jieshu',
              params: {
                liuchengcode: that.$route.params.liuchengcode,
                banben: that.$route.params.banben,
                wenti:that.$route.params.wenticode,
                daan:xuanxiang
              }
            })
          } else {
            //跳转下一个问题
            that.$router.replace({
              name: 'wenti',
              params: {
                liuchengcode: that.$route.params.liuchengcode,
                banben: that.$route.params.banben,
                wenticode: nextnode.code
              }
            })
          }
        });

      }
    }
  };

</script>
<style>

</style>
