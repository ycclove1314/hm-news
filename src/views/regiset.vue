<template>
  <div>
    <my-header>我的注册</my-header>
    <my-login></my-login>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        :rules="this.rules.username"
      />
      <div class="xixi"></div>
      <van-field
        v-model="nickname"
        type="nickname"
        label="昵称"
        :rules="this.rules.nickname"
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
        <van-button round block type="info" native-type="submit"
          >立即注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/,
            message: '请输入3-6位的用户名',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,4}$/,
            message: '请输入昵称',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\w{3,9}$/,
            message: '请输入3-9位的密码',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await axios.post('http://localhost:3000/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.success(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.xixi {
  margin-bottom: 10px;
}
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
