<template>
  <div>
    <!-- v-if 判断 有些评论不一定要parent -->
    <hmfollows :comment="comment.parent" v-if="comment.parent"></hmfollows>
    <div class="comment-up">
      <div class="comment">
        <div class="left">
          <img :src="axios.defaults.baseURL+ comment.user.head_img" alt />
        </div>
        <div class="center">
          <span>{{comment.user.nickname}}</span>
          <p>{{comment.create_date | time}}</p>
        </div>
        <div class="right">回复</div>
      </div>
      <p class="content">{{comment.content}}</p>
    </div>
  </div>
</template>

<script>
import hmfollows from './hmfollows'
export default {
  /* 定义一个局部组件hmfollows */
  components: {
    hmfollows
  },
  props: {
    comment: Object
  }
}
</script>

<style lang="less" scoped>
.comment-up {
  border-bottom: 1px solid #ccc;
}
.comment {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  .left {
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  .center {
    padding-left: 15px;
    flex: 1;
    font-size: 14px;
    p {
      font-size: 12px;
      color: #999;
    }
  }
  .right {
    font-size: 14px;
    color: #999;
  }
}
.content {
  font-size: 16px;
  margin: 15px 0;
}
</style>
