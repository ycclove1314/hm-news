<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索的关键字"
          @input="input"
          v-model="content"
          @keyup.enter="search"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="recommend" v-if="recommendList.length >0">
      <div
        v-for="item in recommendList"
        :key="item.id"
        @click="history_search(item.title)"
      >{{item.title}}</div>
    </div>
    <div class="post" v-else-if="list.length > 0">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="list" v-else>
      <div class="content">
        <h3>历史记录</h3>
        <!-- 给span注册事件把 遍历的每一项的历史关键字 传过来-->
        <span v-for="item in key" :key="item" @click="history_search(item)">{{item}}</span>
      </div>
      <div class="qin" @click="del">点击清空历史记录</div>
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
  </div>
</template>

<script>
import lodash from 'loadsh'
export default {
  data() {
    return {
      content: '',
      /* 文章搜索的数据 */
      list: [],
      /* 存储关键字 */
      key: [],
      recommendList: []
    }
  },
  created() {
    /* 获取本地的历史记录 如果没有默认给空数组 */
    this.key = JSON.parse(localStorage.getItem('key')) || []
  },
  methods: {
    /* 因为input的事件会频繁的触发 所以要用防抖 */
    input: lodash.debounce(async function() {
      /* 如果没有关键字就不允许发送ajax请求 */
      if (!this.content) {
        return
      }
      const res = await this.axios.get('/post_search_recommend', {
        params: {
          keyword: this.content
        }
      })
      if (res.data.statusCode === 200) {
        this.recommendList = res.data.data
      }
    }, 500),
    /* 点击搜索 或 按回车发送ajax请求 */
    async search() {
      /* 清空 推荐列表的数据  */
      this.recommendList = []
      /* 过滤掉数组中和 关键字一样的 */
      this.key = this.key.filter(item => item !== this.content)
      /* 往数组的前面添加 */
      this.key.unshift(this.content)
      /* 存储关键字 */
      localStorage.setItem('key', JSON.stringify(this.key))
      const res = await this.axios.get('/post_search', {
        params: {
          keyword: this.content
        }
      })
      if (res.data.statusCode === 200) {
        this.list = res.data.data
      }
    },
    back() {
      if (!this.content) {
        this.$router.back()
      } else {
        this.content = ''
      }
    },
    /* 点击历史记录搜索 和 点击推荐搜索 */
    async history_search(item) {
      this.recommendList = []
      /* 接收传过来的关键字 赋值给content */
      this.content = item
      /* 调用search 事件在发送ajax请求 */
      this.search()
    },
    /* 点击清除历史记录 */
    del() {
      this.$toast.success('清除成功')
      localStorage.removeItem('key')
      history.go(0)
    }
  },
  watch: {
    content(value) {
      if (!value) {
        this.list = []
      }
    }
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
  .recommend {
    padding: 0 20px;
    font-size: 16px;
    color: red;
    div {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
  .content {
    padding: 20px 20px;
    font-size: 16px;
    overflow: hidden;
    h3 {
      margin-bottom: 20px;
    }
    span {
      float: left;
      width: 60px;
      height: 30px;
      background-color: #ccc;
      text-align: center;
      line-height: 30px;
      margin-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10px;
    }
  }
  .qin {
    padding: 0 20px;
    color: #999;
    font-size: 14px;
    text-align: right;
  }
}
</style>
