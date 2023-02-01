<!--
 * @Author: DeeLMind
 * @Date: 2022-03-19 15:50:57
 * @LastEditTime: 2022-04-05 19:41:58
 * @LastEditors: Please set LastEditors
 * @Description: Dashboard
 * @FilePath: \gkattack-front\src\views\dashboard\index.vue
 -->
<template>
  <div>
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import guestDashboard from './guest'
import userDashboard from './user'

export default {
  name: 'Dashboard',
  components: { guestDashboard, userDashboard },
  data() {
    return {
      currentRole: 'guestDashboard'
    }
  },
  computed: {
    ...mapGetters([
      ['roles']
    ])
  },
  watch: {
    roles: function(newVal) {
      if (newVal[0] !== 'guest') {
        this.currentRole = 'userDashboard'
      } else {
        this.currentRole = 'guestDashboard'
      }
    }
  },
  created() {
    if (this.roles[0] !== 'guest') {
      this.currentRole = 'userDashboard'
    } else {
      this.currentRole = 'guestDashboard'
    }
  },
  mounted() {
    // this.$alert('游客仅可使用(编码解码)功能', '提示', {
    //   confirmButtonText: '确定',
    //   type: 'warning',
    //   customClass: 'dark-msgbox'
    // })
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

</style>
