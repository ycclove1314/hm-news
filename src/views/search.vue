<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索的关键字"
          @input="input"
          v-model="content"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right">搜索</div>
    </div>
    <div class="content">
      <h3>历史记录</h3>
      <span>{{ content }}</span>
    </div>
    <div class="content">
      <h3>热门搜索</h3>
      <span>办公室小野否认解散</span>
      <span>月季如何嫁接</span>
      <span>办公室小野否认解散</span>
      <span>月季如何嫁接</span>
      <span>办公室小野否认解散</span>
      <span>月季如何嫁接</span>
    </div>
  </div>
</template>

<script>
import lodash from 'loadsh'
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    /* 因为input的事件会频繁的触发 所以要用防抖 */
    input: lodash.debounce(async function() {
      const res = await this.axios.get('/post_search_recommend', {
        params: {
          keyword: this.content
        }
      })
      console.log(res)
    }, 500)
  }
}
</script>

<style lang="less" scoped>
.search {
  .header {
    display: flex;
    font-size: 16px;
    padding: 10px 20px;
    justify-content: space-between;
    height: 50px;
    .left {
      line-height: 35px;
      margin-right: 5px;
    }
    .center {
      position: relative;

      flex: 1;
      input {
        width: 258px;
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        color: #999;
        border-radius: 19px;
        border: 1px solid #000;
        background-color: #ccc;
        padding-left: 30px;
      }
      span {
        position: absolute;
        top: 9px;
        left: 13px;
      }
    }
    .right {
      line-height: 35px;
      font-size: 16px;
    }
  }
  .content {
    padding: 20px 20px;
    font-size: 16px;

    h3 {
      margin-bottom: 20px;
    }
    span {
      margin-right: 40px;
    }
  }
}
</style>
