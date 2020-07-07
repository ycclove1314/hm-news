<template>
  <div class="favorite">
    <my-header>我的收藏</my-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <p>{{ item.title }}</p>
          <span>{{ item.user.nickname }}</span>
          <span>{{ item.cover.length }}跟帖</span>
        </div>
        <div class="right">
          <img :src="url(item.cover[0].url)" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    async getAll() {
      const res = await this.axios.get('/user_star')
      console.log(res)
      if (res.data.statusCode === 200) {
        this.list = res.data.data
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-top: 30px;
  .item {
    display: flex;
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #ccc;

    .left {
      flex: 1;
      p {
        margin-bottom: 20px;
        font-size: 16px;
      }
      span {
        color: #999;
        margin-right: 10px;
      }
    }
    .right {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
