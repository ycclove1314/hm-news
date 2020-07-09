<template>
  <div class="datais">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="content">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <span v-if="info.has_follow" class="span" @click="unfollows"
          >已关注</span
        >
        <span v-else @click="follows">关注</span>
      </div>
    </div>
    <div class="content1">
      <div class="title">
        <p>{{ info.title }}</p>
        <span>{{ info.user.nickname }} </span>
        <span>{{ info.create_date | filter }}</span>
      </div>
      <div class="video" v-if="info.type === 2">
        <video :src="info.content" controls loop></video>
      </div>
      <div v-else class="info" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        user: {}
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    async getAll() {
      /* 获取地址栏的id  */
      const id = this.$route.params.id

      const res = await this.axios.get(`/post/${id}`)
      if (res.data.statusCode === 200) {
        this.info = res.data.data
      }
    },
    async follows() {
      var d = this.$route.params.id
      console.log(d)

      /* 判断用户是否登录 如果没有登录就去登录页  */
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '您还没有登录，请先去登录'
          })

          this.$router.push({
            path: '/login',
            query: {
              id: d,
              back: true
            }
          })
          /* 如果没有登录直接return掉 不允许向下执行 */
          return
        }
        /* 如果用户登录了 直接发送ajax请求 */
        const res = await this.axios.get(`/user_follows/${this.info.user.id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('关注成功')
          this.getAll()
        }
      } catch {}
    },
    /* 点击已关注按钮 发送ajax请求取消关注 */
    async unfollows() {
      const res = await this.axios.get(`/user_unfollow/${this.info.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取关成功')
        this.getAll()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.datais {
  .header {
    height: 40px;
    background-color: hotpink;
    line-height: 40px;
    padding: 0 15px;
    display: flex;
    .left {
      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .content {
      flex: 1;
      span {
        font-size: 50px;
      }
    }
    .right {
      font-size: 14px;
      display: flex;
      padding-top: 10px;
      span {
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: red;
        border-radius: 15px;
      }
      .span {
        border: 1px solid #ccc;
        background-color: #ccc;
      }
    }
  }
  .content1 {
    padding: 15px;
    .title {
      p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        color: #999;
        margin-right: 10px;
      }
    }
    .video {
      margin-top: 15px;
      video {
        width: 100%;
      }
    }
    .info {
      margin-top: 20px;
      font-size: 14px;
      /deep/ img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
