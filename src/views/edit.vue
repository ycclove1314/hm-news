<template>
  <div class="emit">
    <my-header>用户编辑</my-header>
    <div class="content">
      <img :src="axios.defaults.baseURL + info.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="footer">
      <my-user @click="shownickname">
        <template>昵称</template>
        <template #title>{{ info.nickname }}</template>
      </my-user>
      <my-user @click="showPassword">
        <template>密码</template>
        <template #title>******</template>
      </my-user>
      <my-user @click="showgender">
        <template>性别</template>
        <template #title>{{info.gender===0 ? '女':'男'}}</template>
      </my-user>
    </div>
    <!-- 修改昵称弹出框 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="updatenickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>

    <!-- 修改密码弹出框 -->
    <van-dialog v-model="password" title="修改密码" show-cancel-button @confirm="updatepassword">
      <van-field v-model="pwd" placeholder="请输入密码" />
    </van-dialog>

    <!-- 修改性别弹出框 -->
    <van-dialog v-model="updategender" title="修改性别" show-cancel-button @confirm="updateDen">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <!-- 注意点 动态绑定的数字 是数字类型的  不是动态绑定是字符串类型的 -->
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender= 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      show: false,
      nickname: '',
      password: false,
      pwd: '',
      updategender: false,
      gender: 1,
      xi: ''
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    /* 点击昵称框 让 弹出框显示 和数据回显 */
    shownickname() {
      this.show = true
      this.nickname = this.info.nickname
    },

    /* 进入页面就发送ajax请求 */
    async getAll() {
      const id = localStorage.getItem('userId')
      const res = await this.axios.get(`/user/${id}`)
      if (res.data.statusCode === 200) {
        this.info = res.data.data
      }
    },
    /* 封装了一个ajax请求 */
    async getInfo(data) {
      const id = localStorage.getItem('userId')
      const res = await this.axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getAll()
      }
    },

    /* 修改弹出框的确定按钮事件 */
    updatenickname() {
      this.getInfo({ nickname: this.nickname })
    },
    /* 点击密码框 弹出输入的密码框 */
    showPassword() {
      this.password = true
      this.pwd = this.info.password
    },
    /* 修改密码的确定按钮事件 */
    async updatepassword() {
      const id = localStorage.getItem('userId')
      const res = await this.axios.post(`/user_update/${id}`, {
        password: this.pwd
      })
      if (res.data.statusCode === 200) {
        this.getAll()
        if (this.pwd !== this.info.password) {
          this.$router.push('/login')
        }
      }
    },
    /* 性别框 让性别框显示 */
    showgender() {
      this.updategender = true
      this.gender = this.info.gender
    },
    updateDen() {
      this.getInfo({ gender: this.gender })
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const data = new FormData()
      data.append('file', file.file)
      const res = await this.axios.post('/upload', data)
      if (res.data.statusCode === 200) {
        this.getInfo({ head_img: res.data.data.url })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 120px;
  padding: 30px 0;
  position: relative;
  text-align: center;
  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
.footer {
  padding: 0 20px;
}
</style>
