<template>
  <div style="height:100%;">
    如有问题，请联系运维人员：496472571
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
      return {};
    },
    computed: {
      // 计算属性的 getter
      reversedMessage: function () {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('')
      }
    },
    created: function () {

    },
    methods: {

    }
  };

</script>
<style>

</style>
