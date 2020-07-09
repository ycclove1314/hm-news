<template>
  <div>
    <my-header>我的登录</my-header>
    <my-login></my-login>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        :rules="this.rules.username"
      />
      <div class="left"></div>
      <van-field
        v-model="password"
        type="password"
        label="密码"
        :rules="this.rules.password"
      />
      <div class="btn"></div>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          style="background-color:red"
          >登录</van-button
        >
      </div>
    </van-form>
    <div>
      <p class="tips">
        没有账号?
        <router-link to="/user">立即注册吧</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/,
            message: '请输入3-6位的用户名',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\w{3,9}$/,
            message: '请输入3-9位的密码',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    /* this.$route.params 获取路由传过来的参数 */
    this.username = this.$route.params.username
    this.password = this.$route.params.password
    if (this.$route.query.back) {
      localStorage.setItem('b', this.$route.query.id)
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.axios.post('/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        localStorage.setItem('token', res.data.data.token)
        /* 存储登录的项个人的详情的id */
        localStorage.setItem('userId', res.data.data.user.id)

        /* 登录成功跳转到个人中心 */
        const b = localStorage.getItem('b')
        if (this.$route.query.back) {
          this.$router.back()
        } else if (this.$route.params.regiset === true) {
          this.$router.push(`/datais/${b}`)
        } else {
          this.$router.push('/regiset')
        }
      } else {
        this.$toast.success(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  margin-bottom: 10px;
}
.btn {
  margin-bottom: 50px;
}
.tips {
  text-align: right;
  padding-right: 20px;
  font-size: 16px;
  margin-top: 15px;
  a {
    font-size: 14px;
    color: orange;
  }
}
</style>
