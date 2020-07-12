<template>
  <div>
    <!-- 使用递归组件 把值传给里面的组件 判断里面是否还有parent  也是递归组件的出口 -->
    <hm-follows :comment="comment.parent" v-if="comment.parent"></hm-follows>
    <div class="hmfollowsplus">
      <div class="hmfollows">
        <div class="left">
          <span>{{ getfollow(1, comment) }}楼:</span>
          <span>{{ comment.user.nickname }}</span>
        </div>
        <div class="center">
          <p>{{ comment.create_date | time }}</p>
        </div>
        <div class="right" @click="replay(comment.user.nickname, comment.id)">
          回复
        </div>
      </div>
      <div class="content">
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /* 递归组件一定要 声明name属性 才能使用递归函数  也要设置出口 v-if一定要为false也就是结束条件 */
  name: 'hm-follows',
  props: {
    comment: Object
  },
  methods: {
    /* 递归函数 */
    getfollow(num, comment) {
      /* 判断是否有parent 如果有在调用当前函数 直到没有parent止 */
      if (comment.parent) {
        return this.getfollow(num + 1, comment.parent)
      } else {
        return num
      }
    },
    replay(name, id) {
      this.bus.$emit('replay', name, id)
    }
  }
}
</script>

<style lang="less" scoped>
.hmfollowsplus {
  border: 1px solid #000;
  padding: 10px;
}
.hmfollows {
  display: flex;
  font-size: 14px;
  margin-top: -1;
  .left {
    margin-right: 10px;
  }
  .center {
    flex: 1;
    font-size: 12px;
    color: #999;
  }
  .right {
    color: #999;
  }
}
.content {
  margin: 15px 0;
  font-size: 16px;
  word-wrap: break-word;
}
</style>
