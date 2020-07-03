<template>
  <div class="user">
    <div class="header">
      <div class="left">
        <img :src="axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="content">
        <span
          class="iconfont iconxingbienv span3"
          v-if="info.gender === 0"
        ></span>
        <span class="iconfont iconxingbienan span2" v-else></span>
        <span class="span1">{{ info.nickname }}</span>
        <p>{{ info.create_date | filter }}</p>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="footer">
      <my-user>
        <template>我的关注</template>
        <!--#title是v-slot的简写-->
        <template #title>关注的用户</template>
      </my-user>
      <my-user>
        <template>我的跟帖</template>
        <template #title>跟帖/回复</template>
      </my-user>
      <my-user>
        <template>我的收藏</template>
        <template #title>文章/视频</template>
      </my-user>
      <my-user @click="$router.push('/emit')">
        <template>设置</template>
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
    const res = await this.axios.get(`/user/${id}`)
    if (res.data.statusCode === 200) {
      this.info = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 130px;
  border-bottom: 5px solid rosybrown;
  align-items: center;
  padding: 0 20px;
  display: flex;
  .left {
    width: 75px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .content {
    flex: 1;
    margin-left: 20px;
    p {
      color: rosybrown;
    }
    .span1 {
      margin-left: 5px;
      font-size: 14px;
    }
    .span3 {
      color: pink;
    }
    .span2 {
      color: blue;
    }
  }
  .right {
    width: 70px;
    text-align: right;
  }
}
.footer {
  margin-top: 15px;
  padding: 0 20px;
}
</style>
