<!--
 * @Author: QKSword
 * @Date: 2022-02-25 10:39:59
 * @LastEditTime: 2023-01-09 20:50:43
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: 游客dashboard界面
 * @FilePath: \gkattack-front\src\views\dashboard\guest\index.vue
-->
<template>
  <div class="components-container">
    <ctf-topic :ctf-topic="ctfTopic" />
    <div class="charts-container">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="12">
          <bar :title-name="exploit.title" :x-axis="exploit.xAxis" :x-data="exploit.xData" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <pie :title-name="range.title" :x-axis="range.xAxis" :x-data="range.xData" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CtfTopic from '../components/CtfTopic.vue'
import Bar from '@/components/chart/Bar.vue'
import Pie from '@/components/chart/Pie.vue'

export default {
  components: {
    CtfTopic,
    Bar,
    Pie
  },
  data() {
    return {
      ctfTopic: {
        web: [
          { title: 'net', desc: 'devtools - net' },
          { title: 'store', desc: 'devtools - store' },
          { title: 'cookie', desc: 'console - cookie' },
          { title: 'console', desc: 'devtools - console' },
          { title: 'debugjs', desc: 'devtools - debugjs' }
        ],
        webNum: 6,
        reverse: [
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' }
        ],
        reverseNum: 0,
        pwn: [
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' }
        ],
        pwnNum: 0,
        misc: [
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' },
          { title: '', desc: '' }
        ],
        miscNum: 0
      },
      exploit: {
        title: 'CVE复现',
        xAxis: ['WORDPRESS', '重要漏洞'],
        xData: [1, 0]
      },
      range: {
        title: '靶场环境',
        xData: [
          { value: 0, name: 'SQL注入' },
          { value: 0, name: 'XSS漏洞' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

.charts-container{
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

</style>
