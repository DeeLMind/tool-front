<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2023-02-08 09:36:20
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2023-02-08 11:08:16
 * @FilePath: \tool-front\src\views\dashboard\components\TreeMap.vue
 * @Description: treeMap组件
-->
<template>
  <v-chart class="my-chart" :option="options" />
</template>

<script>
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart } from 'echarts/charts'

use([
  CanvasRenderer,
  TreemapChart
])

export default {
  components: {
    VChart
  },
  props: {
    funcData: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      options: {
        series: [
          {
            name: '功能',
            type: 'treemap',
            leafDepth: 1, // 显示第几层
            label: {
              color: '#FFFFFF',
              fontSize: '18px'
            },
            // 导航栏样式
            breadcrumb: {
              top: '3%',
              //   left: '3%',
              height: 30,
              itemStyle: {
                color: '#1e1e1e',
                borderColor: '#fc8452',
                textStyle: {
                  color: '#fc8452',
                  fontSize: 15,
                  fontWeight: 550
                }
              }
            },
            levels: [
              { // 第一层样式
                // color: [
                //   '#42B983',
                //   '#4AB7BD',
                //   '#E65D6E',
                //   '#C03639',
                //   '#fe6d32'
                // ],
                itemStyle: {
                  borderColor: '#555',
                  borderWidth: 4,
                  gapWidth: 4
                }
              },
              { // 第二层样式
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2
                }
              },
              { // 第三层样式
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2
                }
              }
            ],
            data: this.funcData
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
  height: 600px;
  background-color: transparent;
}

</style>
