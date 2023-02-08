<!-- eslint-disable no-constant-condition -->
<!--
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2023-02-05 15:40:34
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2023-02-07 16:48:33
 * @FilePath: \tool-front\src\views\tool\bin.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="components-container">
    <div class="textarea-group">
      <BinItem>
        <template #spanName>二进制</template>
        <template #para>
          <StringCopy v-model="binCopyData" />
        </template>
        <template #result>
          <el-input v-model="binResult" type="textarea" :rows="3" @input="(val) => {inputChange(val, 2)}" />
        </template>
      </BinItem>
      <BinItem>
        <template #spanName>八进制</template>
        <template #para>
          <StringCopy v-model="otcCopyData" />
        </template>
        <template #result>
          <el-input v-model="otcResult" type="textarea" :rows="3" @input="(val) => {inputChange(val, 8)}" />
        </template>
      </BinItem>
    </div>
    <div class="textarea-group">
      <BinItem>
        <template #spanName>十进制</template>
        <template #para>
          <StringCopy v-model="decCopyData" />
        </template>
        <template #result>
          <el-input v-model="decResult" type="textarea" :rows="3" @input="(val) => {inputChange(val, 10)}" />
        </template>
      </BinItem>
      <BinItem>
        <template #spanName>十六进制</template>
        <template #para>
          <StringCopy v-model="dexCopyData" />
        </template>
        <template #result>
          <el-input v-model="dexResult" type="textarea" :rows="3" @input="(val) => {inputChange(val, 16)}" />
        </template>
      </BinItem>
    </div>
    <div class="textarea-group">
      <BinItem>
        <template #spanName>任意进制</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">进制数</label>
            <el-input-number v-model="random1Num" class="dark-el-input-number" size="small" controls-position="right" :min="2" :max="62" :step="1" @change="(val) => {inputChange(random1Result, val)}" />
          </div>
          <StringCopy v-model="random1CopyData" />
        </template>
        <template #result>
          <el-input v-model="random1Result" type="textarea" :rows="3" @input="(val) => {inputChange(val, random1Num)}" />
        </template>
      </BinItem>
      <BinItem>
        <template #spanName>任意进制</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">进制数</label>
            <el-input-number v-model="random2Num" class="dark-el-input-number" size="small" controls-position="right" :min="2" :max="62" :step="1" @change="(val) => {inputChange(random2Result, val)}" />
          </div>
          <StringCopy v-model="random2CopyData" />
        </template>
        <template #result>
          <el-input v-model="random2Result" type="textarea" :rows="3" @input="(val) => {inputChange(val, random2Num)}" />
        </template>
      </BinItem>
    </div>
  </div>
</template>

<script>

import ConvertWorker from 'workerize-loader!@/libs/tool/convert'

import BinItem from '@/views/tool/components/binItem.vue'
import StringCopy from '@/components/ComonViews/stringCopy.vue'

export default {
  name: 'Base',
  components: { BinItem, StringCopy },
  data() {
    return {
      binResult: '',
      binCopyData: '',
      otcResult: '',
      otcCopyData: '',
      decResult: '',
      decCopyData: '',
      dexResult: '',
      dexCopyData: '',
      random1Result: '',
      random1CopyData: '',
      random1Num: 32,
      random2Result: '',
      random2CopyData: '',
      random2Num: 62
    }
  },
  methods: {
    // feat(QKSword):输入响应
    inputChange(data, srcb) {
      // 检测输入是否合理
      if (this.checkData(data, srcb) === false) {
        return
      }
      // 运算
      this.calcWorker(data, srcb)
    },
    // feat(QKSword)：校验输入数据是否合理
    checkData(data, srcb) {
      var table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

      for (let i = 0; i < data.length; i++) {
        const char = data.charAt(i)
        var index = table.indexOf(char)

        if (index === -1 || index >= srcb) {
          this.$message({
            message: '输入错误的' + srcb + '进制数据',
            type: 'error',
            duration: 1.5 * 1000,
            customClass: 'geekMsg' })
          return false
        }
      }

      return true
    },
    // feat(QKSword)：调用worker运算结果
    calcWorker(data, srcb) {
      const convertWorker = ConvertWorker()

      convertWorker.Convert(data, srcb, 2).then(res => {
        this.binCopyData = this.binResult = res
      })
      convertWorker.Convert(data, srcb, 8).then(res => {
        this.otcCopyData = this.otcResult = res
      })
      convertWorker.Convert(data, srcb, 10).then(res => {
        this.decCopyData = this.decResult = res
      })
      convertWorker.Convert(data, srcb, 16).then(res => {
        this.dexCopyData = this.dexResult = res
      })
      convertWorker.Convert(data, srcb, this.random1Num).then(res => {
        this.random1CopyData = this.random1Result = res
      })
      convertWorker.Convert(data, srcb, this.random2Num).then(res => {
        this.random2CopyData = this.random2Result = res
      })
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

