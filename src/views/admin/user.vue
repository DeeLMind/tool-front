<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-02 10:07:53
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-08-16 15:08:07
 * @FilePath: \lab-front\src\views\admin\user.vue
 * @Description: 用户管理
-->
<template>
  <div class="components-container">
    <user-manage />
  </div>
</template>

<script>

import UserManage from '@/views/admin/components/UserManage.vue'

export default {
  components: { UserManage },
  data() {
    return {
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";
.components-container{
    padding: 20px;
    border-top: 2px solid $mainColor;
}

</style>
