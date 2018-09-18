<template>
  <div v-on:click='goSrc()' class='zm-fenleibtn' >
      <img :src='imgsrc' />
      <div>
        {{text}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'zm-fenleibtn',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['imgsrc', 'text', 'tosrc'],
  methods: {
    goSrc () {
      this.$router.push(this.tosrc)
    }
  }
}
</script>
<style>
  .zm-fenleibtn{
    width:100%;
    width: 100vw;
  }
</style>
