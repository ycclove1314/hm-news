<template>
  <div class="follow-up">
    <my-header>我的跟帖</my-header>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="left">
            <p>{{ item.create_date | filter }}</p>
          </div>
          <div class="parent" v-if="item.parent">
            <p>回复:{{ item.parent.user.nickname }}</p>
            <p>{{ item.parent.content }}</p>
          </div>
          <div class="footer">
            <span>{{ item.content }}</span>
            <p>
              {{ item.post.title }}
              <span class="iconfont iconjiantou1 span"></span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    async getAll() {
      const res = await this.axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      if (res.data.statusCode === 200) {
        /* 展开运算符 把两个数组和在一起 在赋值给list */
        this.list = [...this.list, ...res.data.data]
        this.loading = false
        /* 判断数组的长度 小于 每一页获取的数据 就代表数据已经获取完了 */
        if (res.data.data.length < this.pageIndex) {
          this.finished = true
        }
      }
    },
    onLoad() {
      /* 每次延迟两秒在发送ajax请求 事件触发让 页面自动 + 1   */
      setTimeout(() => {
        this.pageIndex++
        this.getAll()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-top: 30px;
  .item {
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    margin-bottom: 20px;
    .left {
      p {
        color: #999;
      }
    }
    .parent {
      height: 80px;
      padding-top: 10px;
      background-color: #ddd;
      color: #999;
      p {
        margin-top: 10px;
      }
    }
    .footer {
      p {
        margin-top: 10px;
        color: #999;
        position: relative;
        white-space: nowrap;
        /* 超出部分隐藏 溢出隐藏 */
        overflow: hidden;
        /* 超出部分用省略号标签 */
        text-overflow: ellipsis;
        span {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
