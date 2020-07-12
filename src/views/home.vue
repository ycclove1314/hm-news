<template>
  <div class="home">
    <div class="header" @click="$router.push('/search')">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="content">
        <div class="serach">
          <span class="iconfont iconsearch"></span>
          <span class="span">搜索新闻</span>
        </div>
      </div>
      <div class="right" @click="$router.push('/regiset')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <div>
      <div class="itemlist" @click="$router.push('/ColumnList')">
        <span class="iconfont iconjiantou1"></span>
      </div>
      <van-tabs v-model="active" sticky animated swipeable>
        <van-tab :title="item.name" v-for="item in labelList" :key="item.id">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <hm-post
                v-for="items in postList"
                :key="items.id"
                :post="items"
              ></hm-post>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  /* 要缓存的组件要提供name属性 */
  name: 'home',
  data() {
    return {
      active: 0,
      labelList: [],
      pageIndex: 1,
      pageSize: 5,
      postList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    const active = JSON.parse(localStorage.getItem('active'))
    if (active) {
      this.labelList = active
      /* 如果本地有栏目列表 就获取本地的栏目列表的数据 */
      this.category(this.labelList[0].id)
      return
    }
    this.getAll()
  },
  methods: {
    /* 获取标签列表请求 */
    async getAll() {
      const res = await this.axios.get('/category')
      if (res.data.statusCode === 200) {
        this.labelList = res.data.data
        this.category(this.labelList[0].id)
      }
    },
    /* 获取标签列表数据请求 */
    async category(id) {
      const res = await this.axios.get('/post', {
        params: {
          category: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      if (this.pageIndex === 1) {
        this.postList = []
      }
      if (res.data.statusCode === 200) {
        // this.postList = res.data.data
        // console.log(res)
        // console.log(res.data.data)
        /* 把后面的数据追加到数组里面 */
        this.postList = [...this.postList, ...res.data.data]
        /* 把loading改为false 就可以继续触发load事件 */
        this.loading = false
        /* 下拉的时候会自动改成true 下拉完成要改成false 可以继续触发 下拉事件 */
        this.refreshing = false
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.category(this.labelList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      this.finished = false
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // 清空列表数据
      this.postList = []
      /* 让pageindex重新加载第一页的数据 */
      this.pageIndex = 1
      // this.onLoad()
      setTimeout(() => {
        this.category(this.labelList[this.active].id)
      }, 1000)
    }
  },
  /* 监听器 监听active数据的变化 如果变化了 就发送对象的id的ajax请求 */
  watch: {
    active(value) {
      // console.log(value)
      /* 如果active发生变化 那么就要finished的状态 就代表换了一个栏目要重新加载该栏目的数据 */

      this.postList = []
      this.finished = false
      this.loading = true
      this.pageIndex = 1
      /* 注意点 这里必须传 对应下标的id 经过验证如果不传id 没有登录 是没有区别 value和id 是没有区别的
      但是如果用户登录了 就会多一个关注列表 这样下标就没有用了  如果传下标过去 显示的数据就是对应下标的数据 就获取不到当前列表的数据
     */
      setTimeout(() => {
        this.category(this.labelList[value].id)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  background-color: red;
  display: flex;
  line-height: 50px;
  text-align: center;
  padding: 0 20px;
  color: #fff;
  .left {
    width: 50px;
    span {
      font-size: 50px;
    }
  }
  .right {
    width: 50px;
    span {
      font-size: 25px;
    }
  }
  .content {
    flex: 1;
    .serach {
      width: 210px;
      height: 34px;
      margin: 8px auto;
      line-height: 34px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 17px;
      .span {
        font-size: 14px;
      }
    }
  }
}
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
}
</style>
