<template>
  <div class="ColumnList">
    <my-header>我的栏目</my-header>
    <div class="delete">
      <h3>点击删除以下频道</h3>
      <span
        v-for="(item, index) in active"
        :key="item.id"
        @click="del(index)"
        >{{ item.name }}</span
      >
    </div>
    <div class="delete">
      <h3>点击添加以下频道</h3>
      <span
        v-for="(item, index) in deactive"
        :key="item.id"
        @click="add(index)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: [],
      deactive: []
    }
  },
  created() {
    const active = JSON.parse(localStorage.getItem('active'))
    const deactive = JSON.parse(localStorage.getItem('deactive'))
    if (active) {
      this.active = active
      this.deactive = deactive
      return
    }
    this.tablist()
  },
  methods: {
    async tablist() {
      const res = await this.axios.get('/category')
      if (res.data.statusCode === 200) {
        this.active = res.data.data
      }
    },
    del(index) {
      if (this.active.length <= 4) {
        this.$toast.success('至少保留4项')
        return
      }
      /* 往deactive数组中 添加 active数组对应下标的这一项 */
      this.deactive.push(this.active[index])
      /* active 删除对应下标这一项 */
      this.active.splice(index, 1)
    },
    add(index) {
      /* 和删除同理 */
      this.active.push(this.deactive[index])
      this.deactive.splice(index, 1)
    }
  },
  watch: {
    active: {
      /* 复杂数据类型要用深度监听 */
      deep: true,
      handler() {
        localStorage.setItem('active', JSON.stringify(this.active))
        localStorage.setItem('deactive', JSON.stringify(this.deactive))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ColumnList {
  .delete {
    font-size: 14px;
    padding: 17px;
    overflow: hidden;
    h3 {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    span {
      width: 50px;
      height: 30px;
      border: 1px solid #ddd;
      text-align: center;
      line-height: 30px;
      float: left;
      margin-right: 18px;
      margin-bottom: 10px;
      background-color: #ccc;
    }
  }
}
</style>
