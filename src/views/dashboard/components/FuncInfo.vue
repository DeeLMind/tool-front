<template>
  <div class="func-container">
    <!-- <el-card class="guest-el-card">
      <div slot="header">
        <label class="guest-el-card-label">功能展示</label>
      </div>
    </el-card> -->

    <tree-map :func-data="funcData" />

  </div>
</template>

<script>
import TreeMap from './TreeMap.vue'
export default {
  components: { TreeMap },
  props: {
    funcData: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

// feat(QKSword): 功能信息模板
.func-container{
  margin-left: 20px;
  margin-right: 20px;
}

// feat(QKSword):dashboard卡片样式
.guest-el-card{
    background-color: transparent;
    border-color: transparent;

    ::v-deep.el-card__header{
      border-bottom:1px solid transparent;
    }

    // feat(QKSword):dashboard字体样式
    .guest-el-card-label{
      color: $geekColor;
      font-family: "Microsoft YaHei";
      font-size: 18px;
    }
}

</style>
