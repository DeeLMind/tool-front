<!--
 * @Author: your name
 * @Date: 2022-02-25 10:39:59
 * @LastEditTime: 2022-04-05 09:40:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gkattack-front\src\views\hash\components\itemResult.vue
-->
<template>
  <el-input
    v-model="privateString"
    type="textarea"
    :rows="3"
    readonly
  />
</template>

<script>
export default {
  name: 'ItemResult',
  model: {
    prop: 'displayString',
    event: 'displayStringChange'
  },
  props: {
    displayString: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      privateString: ''
    }
  },
  // 监控父组件值变化
  watch: {
    displayString(newString) {
      this.privateString = newString
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

.el-textarea{
    ::v-deep.el-textarea__inner,
    ::v-deep.el-textarea__inner:focus,
    ::v-deep.el-textarea__inner:active,
    ::v-deep.el-textarea__inner.hover{
        resize: none;
        width:100%;
        background: transparent;
        border-radius: 5px;
        border: 1px solid rgba($geekColor,0.1);
        outline: none;
        color: $fontColor;
        font-family: "Microsoft YaHei";
        overflow-x:hidden;
    }
}

</style>
