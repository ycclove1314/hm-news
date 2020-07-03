<template>
  <div class="emit">
    <my-header>用户编辑</my-header>
    <div class="content">
      <img src="../images/03.jpg" alt="" />
    </div>
    <div class="footer">
      <my-user>
        <template>昵称</template>
        <template #title>{{ info.nickname }}</template>
      </my-user>
      <my-user>
        <template>密码</template>
        <template #title>******</template>
      </my-user>
      <my-user>
        <template>性别</template>
        <template #title>{{ info.gender }}</template>
      </my-user>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const id = localStorage.getItem('userId')
    const res = await this.axios.post(`/user_update/${id}`)
    console.log(res)

    if (res.data.statusCode === 200) {
      this.info = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 120px;
  padding-top: 20px;
  img {
    display: block;
    width: 75px;
    height: 75px;
    margin: 0 auto;
    border-radius: 50%;
  }
}
.footer {
  padding: 0 20px;
}
</style>
