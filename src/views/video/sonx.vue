<template>
  <div><button @click="arr[0] = 3">dianji</button></div>
</template>

<script>
export default {
  props: {
    arr: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
div {
  padding: 60px;
}
</style>
