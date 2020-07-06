<template>
  <div class="my-header">
    <div class="back">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.my-header {
  height: 40px;
  line-height: 40px;
  background-color: red;
  display: flex;
  font-size: 16px;
  .back {
    width: 40px;
    text-align: center;
  }
  .content {
    flex: 1;
    text-align: center;
    font-weight: 700;
  }
  .right {
    width: 40px;
  }
}
</style>
