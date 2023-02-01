<template>
  <div>
    <el-button type="primary">1111</el-button>
  </div>
</template>

<script>
export default {
  name: 'GkButton'
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.el-button {
  background-color: geekColor;
  color: rgb(255, 255, 255); // 字体颜色
  border: 1px solid #42b983; /* Green */
  //border-radius:4px; /*实现圆角*/  //box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.el-button:hover {
  background-color: geekColor;
  color: rgb(255, 255, 255);
  transition-duration: 0.4s;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
