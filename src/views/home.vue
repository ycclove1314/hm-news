<template>
  <div class="home">
    <div class="header">
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
      <van-tabs v-model="active" sticky animated swipeable>
        <van-tab :title="item.name" v-for="item in labelList" :key="item.id">
          <hm-post
            v-for="items in postList"
            :key="items.id"
            :post="items"
          ></hm-post>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      labelList: [],
      pageIndex: 1,
      pageSize: 10,
      postList: []
    }
  },
  created() {
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
      if (res.data.statusCode === 200) {
        this.postList = res.data.data
      }
    }
  },
  watch: {
    active(value) {
      //   console.log(value)
      //   console.log(this.labelList[value].id === value)
      //   console.log(this.labelList[value])
      /* 注意点 这里必须传 对应下标的id 经过验证如果不传id 没有登录 是没有区别 value和id 是没有区别的
      但是如果用户登录了 就会多一个关注列表 这样下标就没有用了  如果传下标过去 显示的数据就是对应下标的数据 就获取不到当前列表的数据
     */
      this.category(this.labelList[value].id)
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
