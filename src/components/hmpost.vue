<template>
  <div class="list" @click="$router.push(`/datais/${post.id}`)">
    <div class="videoplus" v-if="post.type === 2">
      <div class="title">
        <p>{{ post.title }}</p>
      </div>
      <div class="video">
        <img :src="url(post.cover[0].url)" alt="" />
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="footersed">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}</span>
      </div>
    </div>
    <div class="item" v-else-if="post.cover.length < 3">
      <div class="left">
        <p>{{ post.title }}</p>
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
      <div class="right">
        <img :src="url(post.cover[0].url)" alt="" />
      </div>
    </div>

    <div class="footer" v-else>
      <div class="title">
        <p>{{ post.title }}</p>
      </div>
      <div class="right">
        <img :src="url(post.cover[0].url)" alt="" />
        <img :src="url(post.cover[1].url)" alt="" />
        <img :src="url(post.cover[2].url)" alt="" />
      </div>
      <div class="footersed">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-top: 30px;
  .videoplus {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .video {
      position: relative;
      img {
        width: 340px;
        height: 170px;
        object-fit: cover;
      }
      span {
        position: absolute;
        width: 46px;
        height: 46px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 25px;
        color: #fff;
        line-height: 46px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
      }
    }
    .footersed {
      span {
        font-size: 14px;
        color: #999;
        margin-right: 10px;
      }
    }
    .title {
      font-size: 16px;
    }
  }
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
  .footer {
    .title {
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      padding: 10px;
    }
    .right {
      display: flex;
      img {
        width: 33.33333%;
        height: 75px;
        object-fit: cover;
      }
    }
    .footersed {
      span {
        font-size: 14px;
        color: #999;
        margin-right: 10px;
      }
    }
  }
}
</style>
