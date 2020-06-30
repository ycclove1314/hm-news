<template>
  <div id="app">
       <div>
       <van-button type="primary">主要按钮</van-button>
       <van-field v-model="text" label="文本" />
<!-- 输入手机号，调起手机号键盘 -->
<van-field v-model="tel" type="tel" label="手机号" />
<!-- 允许输入正整数，调起纯数字键盘 -->
<van-field v-model="digit" type="digit" label="整数" />
<!-- 允许输入数字，调起带符号的纯数字键盘 -->
<van-field v-model="number" type="number" label="数字" />
<!-- 输入密码 -->
<van-field v-model="password" type="password" label="密码" />
   </div>
   <div class="box">哈哈哈</div>

   <van-pagination
  v-model="currentPage"
  :total-items="125"
  :show-page-size="3"
  force-ellipses
/>
<hr>
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>
    <img src="../public/image/微信图片_20200316152026.jpg" alt="">
  </van-swipe-item>
  <van-swipe-item>
     <img src="../public/image/微信图片_202003161520261.jpg" alt="">
  </van-swipe-item>
  <van-swipe-item>
     <img src="../public/image/微信图片_202003161520262.jpg" alt="">
  </van-swipe-item>
  <van-swipe-item>
     <img src="../public/image/微信图片_202003161520263.jpg" alt="">
  </van-swipe-item>
   <van-swipe-item>
     <img src="../public/image/微信图片_202003161520264.jpg" alt="">
  </van-swipe-item>
</van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel: '',
      text: '',
      digit: '',
      number: '',
      password: '',
      currentPage: 1
    }
  }
}
</script>

<style>
  .box{
      width: 150px;
      height: 150px;
      background-color: hotpink;
      font-size: 50px;
  }
   .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 100px;
    text-align: center;
    background-color: #39a9ed;
    width: 150px;
    height: 240px;
  }
   img{
    width: 100%;
    height: 100%;
  }
</style>
