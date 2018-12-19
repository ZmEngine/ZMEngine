<template>
  <div style="height:100%;">
    <div class='zmbtn' v-on:click='fenxiang()'>
      测试分享
    </div>
    <div>分享结果：{{fenxiangjieguo}}</div>
  </div>
</template>

<script>
  import {
    getList,
    postInfo
  } from "../service/getData";
  export default {
    name: "huanying",
    components: {},
    data() {
      return {
        fenxiangjieguo: ""
      };
    },
    created: function () {
      let that = this
      console.log("updateTimelineShareData")
      wxfenxiang({
        biaoti: '测试分享', // 分享标题
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        img: 'http://api.yunkucun.top/static/ziyuan/zmlogo.png', // 分享图标
        huidiao: function (res) {
          //这里是回调函数 
          that.fenxiangjieguo = res
        }
      })

    },
    methods: {
      fenxiang() {

      }
    }
  };

</script>
<style>

</style>
