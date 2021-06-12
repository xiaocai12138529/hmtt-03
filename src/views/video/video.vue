<template>
  <div>
    {{ arr }}<br />
    {{ arr }}<br />
    {{ arr }}<br />
    {{ arr }}<br />
    nihao
    <sonx :arr="arr"></sonx>
  </div>
</template>

<script>
import sonx from './sonx.vue'
export default {
  name: 'myVideo',
  components: {
    sonx
  },
  data () {
    return {
      arr: [1]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
