<template>
  <div class="follows">
    <my-header>我的关注</my-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="content">
          <p>{{ item.nickname }}</p>
          <p class="tips">{{ item.create_date | filter }}</p>
        </div>
        <div class="right">
          <van-button round type="warning" @click="follows(item.id)"
            >取消关注</van-button
          >
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
    /* 进入页面发送ajax请求 */
    this.getAllList()
  },
  methods: {
    async getAllList() {
      const res = await this.axios.get('/user_follows')
      if (res.data.statusCode === 200) {
        this.list = res.data.data
        console.log(this.list)
      }
    },
    /* 点击取消关注按钮事件 */
    async follows(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取关该用户嘛'
        })
        const res = await this.axios.get(`/user_unfollow/${id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('取关成功')
          this.getAllList()
        }
      } catch {}
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-top: 30px;
  .item {
    display: flex;
    border-bottom: 1px solid #999;
    padding: 0 20px;
    height: 80px;
    .left {
      width: 70px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .content {
      font-size: 14px;
      flex: 1;
      p {
        color: black;
      }
      .tips {
        color: rosybrown;
      }
    }
    .right {
      width: 90px;
      .van-button {
        width: 90px;
        font-size: 12px;
        height: 30px;
      }
    }
  }
}
</style>
