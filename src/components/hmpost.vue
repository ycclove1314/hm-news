<template>
  <div class="list">
    <div class="item" v-if="post.cover.length < 3">
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
        <p>亚马逊雨林为何燃烧？除了新总统“急功近利”的开发，国际资本才是真凶</p>
      </div>
      <div class="right">
        <img :src="url(post.cover[0].url)" alt="" />
        <img :src="url(post.cover[1].url)" alt="" />
        <img :src="url(post.cover[2].url)" alt="" />
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
    }
    .right {
      display: flex;
      img {
        width: 33.33333%;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
