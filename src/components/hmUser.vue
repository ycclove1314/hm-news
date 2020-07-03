<template>
  <div class="hmUser" @click="clickFn">
    <div class="left">
      <p>
        <slot></slot>
      </p>
    </div>
    <div class="content">
      <slot name="title"></slot>
    </div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      /* 子组件注册事件 让父组件促发 */
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hmUser {
  height: 50px;
  border-bottom: 1px solid rosybrown;
  display: flex;
  line-height: 50px;
  .left {
    width: 100px;
    p {
      color: red;
    }
  }
  .content {
    flex: 1;
    text-align: right;
    color: rosybrown;
  }
  .right {
    width: 20px;
    text-align: right;
  }
}
</style>
