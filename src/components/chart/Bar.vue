<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-06-05 14:38:45
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-06-07 15:55:58
 * @FilePath: \lab\src\components\Bar.vue
 * @Description: 柱形图表
-->
<template>
  <v-chart class="my-chart" :option="options" />
</template>

<script>
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'

use([
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  BarChart
])

export default {
  components: {
    VChart
  },
  props: {
    titleName: {
      type: String,
      default: ''
    },
    xAxis: {
      type: Array,
      default: () => {}
    },
    xData: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      options: {
        title: {
          text: this.titleName,
          left: 'center',
          textStyle: {
            color: '#42B983'
          }
        },
        tooltip: {
        },
        xAxis: {
          axisLabel: {
            color: '#FFF'
          },
          data: this.xAxis
        },
        yAxis: {
          axisLabel: {
            color: '#FFF'
          }
        },
        series: [
          {
            type: 'bar',
            data: this.xData,
            colorBy: 'data'
          }
        ]
      }
    }
  }

}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

.my-chart {
  height: 400px;
  background-color: $dashboardColor;
}

</style>
