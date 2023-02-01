<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-06-07 09:42:04
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-06-07 15:53:24
 * @FilePath: \lab\src\components\chart\Pie.vue
 * @Description: 圆形图表
-->

<template>
  <v-chart class="my-chart" :option="options" />
</template>

<script>
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'

use([
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  PieChart
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
        series: [
          {
            type: 'pie',
            data: this.xData,
            colorBy: 'data',
            label: {
              color: 'rgba(255, 255, 255, 1)'
            }
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
