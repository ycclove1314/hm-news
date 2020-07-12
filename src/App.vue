<template>
  <div id="app">
    <!-- keep-alive 缓存组件 include指定要缓存的组件 -->
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
