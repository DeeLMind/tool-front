<template>
  <!-- class="textarea-group-part" -->
  <div class="textarea-group-part">
    <!-- hash下每一项名称 -->
    <span class="base-span">
      <slot name="spanName" />
    </span>
    <!-- hash下每一项参数 -->
    <slot name="para" />
    <!-- hash下每一项结果 -->
    <slot name="result" />
  </div>
</template>

<script>
export default {
  name: 'HashItem'
}
</script>

<style lang="scss">
@import "@/styles/app-main.scss";

</style>
