<!--
 * @Author: QKSword
 * @Date: 2022-02-25 10:39:59
 * @LastEditTime: 2022-04-23 10:11:28
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \gkattack-front\src\components\ComonViews\stringCopy.vue
-->
<template>
  <el-button
    icon="el-icon-document-copy"
    type="primary"
    size="mini"
    @click="clickCopy"
  />

</template>

<script>

export default {
  name: 'StringCopy',
  model: {
    prop: 'inputString',
    event: 'inputStringChange'
  },
  props: {
    inputString: {
      type: String,
      default: ''
    }
  },
  methods: {
    async clickCopy() {
      navigator.clipboard.writeText(this.inputString).then(res => {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1.5 * 1000,
          customClass: 'geekMsg'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

::v-deep.el-button--primary:hover,  // 悬浮不点击
::v-deep.el-button--primary:focus,  //抬起或移开鼠标
::v-deep.el-button--primary{
  color: $geekSecondaryColor;
  background-color: $inputColor;
  border-color: #555555;
  font-family: "Microsoft YaHei";
  float: right;
}

::v-deep.el-button--primary:active{ // 按下鼠标
  color: $geekColor;
  background-color: $inputColor;
  border-color: $geekColor;
  font-family: "Microsoft YaHei";
}

</style>

