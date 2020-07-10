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
        <span v-if="info.has_follow" class="span" @click="unfollows">已关注</span>
        <span v-else @click="follows">关注</span>
      </div>
    </div>
    <div class="content1">
      <div class="title">
        <p>{{ info.title }}</p>
        <span>{{ info.user.nickname }}</span>
        <span>{{ info.create_date | filter }}</span>
      </div>
      <div class="video" v-if="info.type === 2">
        <video :src="info.content" controls loop></video>
      </div>
      <div v-else class="info" v-html="info.content"></div>
      <div class="dianzhan">
        <div class="left" :class="{ active: info.has_like }" @click="link">
          <span class="iconfont icondianzan"></span>
          <span>{{ info.like_length }}</span>
        </div>
        <div class="right">
          <span class="iconfont iconweixin span"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="conter">
      <div class="title">
        <h3>精彩跟帖</h3>
      </div>
      <hm-Hmcomment v-for="item in list" :key="item.id" :comment="item"></hm-Hmcomment>
    </div>
    <div class="footer">
      <input type="text" placeholder="写跟帖" />
      <div class="box">
        <span class="iconfont iconpinglun-"></span>
        <span class="iconfont iconshoucang" :class="{ active: info.has_star }" @click="start"></span>
        <span class="iconfont iconfenxiang"></span>
        <div class="box1">{{ info.comment_length }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        user: {}
      },
      list: []
    }
  },
  created() {
    this.getAll()
    this.Comment()
  },
  methods: {
    /* 进入页面获取文章详情 */
    async getAll() {
      /* 获取地址栏的id  */
      const id = this.$route.params.id
      const res = await this.axios.get(`/post/${id}`)
      if (res.data.statusCode === 200) {
        this.info = res.data.data
      }
    },
    /* 进入页面获取文章的评论 */
    async Comment() {
      const res = await this.axios.get(`/post_comment/${this.$route.params.id}`)
      if (res.data.statusCode === 200) {
        this.list = res.data.data
        console.log(this.list)
      }
    },
    /* 给关注按钮注册的事件 */
    async follows() {
      var d = this.$route.params.id
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
    },
    /* 给点赞按钮注册的事件 */
    async link() {
      var d = this.$route.params.id
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
          return
        }
        const res = await this.axios.get(`/post_like/${this.info.id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          this.getAll()
        }
      } catch {}
    },
    /* 给收藏的按钮注册的事件 */
    async start() {
      var d = this.$route.params.id
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
          return
        }
        const res = await this.axios.get(`/post_star/${this.info.id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          this.getAll()
        }
      } catch {}
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
    border-bottom: 3px solid #ccc;
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
  .dianzhan {
    display: flex;
    padding: 20px 40px;
    justify-content: space-between;
    .left,
    .right {
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      font-size: 14px;
      span {
        margin-right: 10px;
      }
      .span {
        color: green;
      }
    }
    .active {
      background-color: red;
    }
  }
  .conter {
    padding: 30px 10px 50px;
    .title {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    height: 50px;

    background-color: #fff;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;

    input {
      width: 180px;
      height: 30px;
      background-color: #ddd;
      border: none;
      border-radius: 15px;
      font-size: 12px;
      padding-left: 10px;
    }
    .box {
      position: relative;
      span {
        font-size: 23px;
        margin: 0 12px;
      }
      .box1 {
        position: absolute;
        top: -8px;
        left: 27px;
        width: 30px;
        height: 15px;
        border-radius: 7.5px;
        background-color: red;
        font-size: 12px;
        text-align: center;
        color: #fff;
      }
      .active {
        color: red;
        font-weight: 700;
      }
    }
  }
}
</style>
