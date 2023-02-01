<template>
  <div class="components-container">
    <FileUpload v-model="fileBuffer" />
    <div class="input-group">
      <el-input v-model="inputString" class="dark-el-input" placeholder="待输入字符" prefix-icon="el-icon-edit" size="medium " />
    </div>
    <div class="textarea-group">
      <el-button type="green-el-button" size="medium" @click="clickEncrypt">加密</el-button>
      <el-button type="green-el-button" size="medium" @click="clickDecrypt">解密</el-button>
      <div class="radio-group">
        <el-radio v-model="picked" label="File" class="dark-el-radio">文件</el-radio>
        <el-radio v-model="picked" label="String" class="dark-el-radio">字符</el-radio>
      </div>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>JsFuck</template>
        <template #para>
          <el-checkbox v-model="jsfuckEvalCheck" class="dark-el-checkbox" label="Eval" @change="jsFuckCalc" />
          <el-checkbox v-model="jsfuckScopeCheck" class="dark-el-checkbox" label="Scope" @change="jsFuckCalc" />
          <StringCopy v-model="jsFuckCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="jsFuckResult" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>BrainFuck</template>
        <template #para>
          <StringCopy v-model="brainFuckCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="brainFuckResult" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>摩斯密码</template>
        <template #para>
          <label class="base-label">Format</label>
          <el-select v-model="morseSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="morseCalc">
            <el-option v-for="option in morseOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <StringCopy v-model="morseCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="morseResult" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Rot13</template>
        <template #para>
          <el-checkbox v-model="rot13CharCheck" label="Rotate char" class="dark-el-checkbox" @change="rot13Calc" />
          <el-checkbox v-model="rot13NumberCheck" label="Rotate number" class="dark-el-checkbox" @change="rot13Calc" />
          <label class="base-label">amount</label>
          <el-input-number v-model="rot13Amount" class="dark-el-input-number" size="small" controls-position="right" :min="0" :max="26" :step="1" @change="rot13Calc" />
          <StringCopy v-model="rot13CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="rot13Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Rot47</template>
        <template #para>
          <label class="base-label">amount</label>
          <el-input-number v-model="rot47Amount" class="dark-el-input-number" size="small" controls-position="right" :min="0" :max="94" @change="rot47Calc" />
          <StringCopy v-model="rot47CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="rot47Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>栅栏密码</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">组数</label>
            <el-input-number v-model="fenceKey" class="dark-el-input-number" size="small" controls-position="right" :min="2" @change="fenceCalc" />
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">偏移</label>
            <el-input-number v-model="fenceOffset" class="dark-el-input-number" size="small" controls-position="right" :min="0" @change="fenceCalc" />
          </div>
          <StringCopy v-model="fenceCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="fenceResult" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>凯撒密码</template>
        <template #para>
          <label class="base-label">偏移</label>
          <el-input-number v-model="caesarOffset" class="dark-el-input-number" size="small" controls-position="right" :min="0" :max="26" @change="caesarCalc" />
          <StringCopy v-model="caesarCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="caesarResult" />
        </template>
      </HashItem>
    </div>
  </div>
</template>

<script>
import jsFuckWorker from 'workerize-loader!@/libs/hash/jsFuck'
import brainFuckWorker from 'workerize-loader!@/libs/hash/brainFuck'
import morseWorker from 'workerize-loader!@/libs/hash/morse'
import rot13Worker from 'workerize-loader!@/libs/hash/rot13'
import rot47Worker from 'workerize-loader!@/libs/hash/rot47'
import fenceWorker from 'workerize-loader!@/libs/hash/fence'
import caesarWorker from 'workerize-loader!@/libs/hash/caesar'

import HashItem from '@/views/hash/components/hashItem.vue'
import StringCopy from '@/components/ComonViews/stringCopy.vue'
import ItemResult from '@/views/hash/components/itemResult.vue'
import FileUpload from '@/components/ComonViews/fileUpload.vue'

export default {
  name: 'Hash',
  components: { HashItem, StringCopy, ItemResult, FileUpload },
  data() {
    return {
      fileBuffer: '', // 保存文件数据
      inputString: '', // 保存字符串数据
      switchChange: 0, // 修改单个值时使用
      picked: 'String', // 选择文件或者字符串
      clickButton: '', // 点击加密按钮还是解密按钮
      jsFuckCopyData: '',
      jsFuckResult: '',
      jsfuckEvalCheck: true, // jsfuck的eval选项
      jsfuckScopeCheck: true, // jsfuck的scope选项
      brainFuckResult: '',
      brainFuckCopyData: '',
      morseResult: '',
      morseCopyData: '',
      morseSelected: '-/.',
      morseOptions: [
        { label: '-/.', value: '-/.' },
        { label: '_/.', value: '_/.' },
        { label: 'Dash/Dot', value: 'Dash/Dot' },
        { label: 'DASH/DOT', value: 'DASH/DOT' },
        { label: 'dash/dot', value: 'dash/dot' }
      ],
      rot13Result: '',
      rot13CopyData: '',
      rot13CharCheck: true, // rot13字符加密
      rot13NumberCheck: true, // rot13数字加密
      rot13Amount: 13, // rot13位移数
      rot47Result: '',
      rot47CopyData: '',
      rot47Amount: 47, // rot47位移数
      fenceResult: '',
      fenceCopyData: '',
      fenceKey: 2, // 栅栏每组数量
      fenceOffset: 0, // 栅栏加密偏移
      caesarResult: '',
      caesarCopyData: '',
      caesarOffset: 3 // 凯撒密码偏移
    }
  },
  methods: {
    resetResult(string, number) {
      switch (number) {
        case 0:
          this.jsFuckResult = string
          this.brainFuckResult = string
          this.morseResult = string
          this.rot13Result = string
          this.rot47Result = string
          this.fenceResult = string
          this.caesarResult = string
          break
        case 1:
          this.jsFuckResult = string
          break
        case 2:
          this.morseResult = string
          break
        case 3:
          this.rot13Result = string
          break
        case 4:
          this.rot47Result = string
          break
        case 5:
          this.fenceResult = string
          break
        case 6:
          this.caesarResult = string
          break
      }
    },
    jsFuckCalc() {
      this.switchChange = 1
      this.calc()
      this.switchChange = 0
    },
    morseCalc() {
      this.switchChange = 2
      this.calc()
      this.switchChange = 0
    },
    rot13Calc() {
      this.switchChange = 3
      this.calc()
      this.switchChange = 0
    },
    rot47Calc() {
      this.switchChange = 4
      this.calc()
      this.switchChange = 0
    },
    fenceCalc() {
      this.switchChange = 5
      this.calc()
      this.switchChange = 0
    },
    caesarCalc() {
      this.switchChange = 6
      this.calc()
      this.switchChange = 0
    },
    calc() {
      if (this.clickButton === 'clickEncrypt') {
        this.resetResult('', this.switchChange)
        if (this.picked === 'String' && this.inputString.length !== 0) {
          this.resetResult('手算中，请稍等....', this.switchChange)
          this.encryptCalc(this.inputString, this.switchChange)
        } else if (this.picked === 'File' && this.fileBuffer.length !== 0) {
          this.resetResult('手算中，请稍等....', this.switchChange)
          this.encryptCalc(this.fileBuffer, this.switchChange)
        }
      } else if (this.clickButton === 'clickDecrypt') {
        this.resetResult('', this.switchChange)
        if (this.picked === 'String' && this.inputString.length !== 0) {
          this.resetResult('手算中，请稍等....', this.switchChange)
          this.decryptCalc(this.inputString, this.switchChange)
        } else if (this.picked === 'File' && this.fileBuffer.length !== 0) {
          this.resetResult('手算中，请稍等....', this.switchChange)
          this.decryptCalc(this.fileBuffer, this.switchChange)
        }
      }
    },
    // 加密函数
    async encryptCalc(string, number) {
      const jsFuck = jsFuckWorker()
      const brainFuck = brainFuckWorker()
      const morse = morseWorker()
      const rot13 = rot13Worker()
      const rot47 = rot47Worker()
      const fence = fenceWorker()
      const caesar = caesarWorker()

      const ifMax = string.length > 1 * 1024 * 1024

      switch (number) {
        case 0:
          jsFuck.Encrypt(string, this.jsfuckEvalCheck, this.jsfuckScopeCheck).then(res => {
            this.jsFuckCopyData = res
            this.jsFuckResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          brainFuck.Encrypt(string).then(res => {
            this.brainFuckCopyData = res
            this.brainFuckResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          morse.Encrypt(string, this.morseSelected).then(res => {
            this.morseCopyData = res
            this.morseResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          rot13.Encrypt(string, [this.rot13CharCheck, this.rot13NumberCheck, this.rot13Amount]).then(res => {
            this.rot13CopyData = res
            this.rot13Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          rot47.Encrypt(string, this.rot47Amount).then(res => {
            this.rot47CopyData = res
            this.rot47Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          fence.Encrypt(string, [this.fenceKey, this.fenceOffset]).then(res => {
            this.fenceCopyData = res
            this.fenceResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          caesar.Encrypt(string, this.caesarOffset).then(res => {
            this.caesarCopyData = res
            this.caesarResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 1:
          jsFuck.Encrypt(string, this.jsfuckEvalCheck, this.jsfuckScopeCheck).then(res => {
            this.jsFuckCopyData = res
            this.jsFuckResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 2:
          morse.Encrypt(string, this.morseSelected).then(res => {
            this.morseCopyData = res
            this.morseResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 3:
          rot13.Encrypt(string, [this.rot13CharCheck, this.rot13NumberCheck, this.rot13Amount]).then(res => {
            this.rot13CopyData = res
            this.rot13Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 4:
          rot47.Encrypt(string, this.rot47Amount).then(res => {
            this.rot47CopyData = res
            this.rot47Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 5:
          fence.Encrypt(string, [this.fenceKey, this.fenceOffset]).then(res => {
            this.fenceCopyData = res
            this.fenceResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 6:
          caesar.Encrypt(string, this.caesarOffset).then(res => {
            this.caesarCopyData = res
            this.caesarResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        default:
          break
      }
    },
    // 解密函数
    async decryptCalc(string, number) {
      const jsFuck = jsFuckWorker()
      const brainFuck = brainFuckWorker()
      const morse = morseWorker()
      const rot13 = rot13Worker()
      const rot47 = rot47Worker()
      const fence = fenceWorker()
      const caesar = caesarWorker()

      const ifMax = string.length > 1 * 1024 * 1024

      switch (number) {
        case 0:
          jsFuck.Decrypt(string, this.jsfuckEvalCheck).then(res => {
            this.jsFuckCopyData = res
            this.jsFuckResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          brainFuck.Decrypt(string).then(res => {
            this.brainFuckCopyData = res
            this.brainFuckResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          morse.Decrypt(string).then(res => {
            this.morseCopyData = res
            this.morseResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          rot13.Decrypt(string, [this.rot13CharCheck, this.rot13NumberCheck, this.rot13Amount]).then(res => {
            this.rot13CopyData = res
            this.rot13Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          rot47.Decrypt(string, this.rot47Amount).then(res => {
            this.rot47CopyData = res
            this.rot47Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          fence.Decrypt(string, [this.fenceKey, this.fenceOffset]).then(res => {
            this.fenceCopyData = res
            this.fenceResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          caesar.Decrypt(string, this.caesarOffset).then(res => {
            this.caesarCopyData = res
            this.caesarResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 1:
          jsFuck.Decrypt(string).then(res => {
            this.jsFuckCopyData = res
            this.jsFuckResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 3:
          rot13.Decrypt(string, [this.rot13CharCheck, this.rot13NumberCheck, this.rot13Amount]).then(res => {
            this.rot13CopyData = res
            this.rot13Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 4:
          rot47.Decrypt(string, this.rot47Amount).then(res => {
            this.rot47CopyData = res
            this.rot47Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 5:
          fence.Decrypt(string, [this.fenceKey, this.fenceOffset]).then(res => {
            this.fenceCopyData = res
            this.fenceResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 6:
          caesar.Decrypt(string, this.caesarOffset).then(res => {
            this.caesarCopyData = res
            this.caesarResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        default:
          break
      }
    },
    // 点击加密按钮触发
    clickEncrypt() {
      this.clickButton = 'clickEncrypt'
      this.calc()
    },
    // 点击解密按钮触发
    clickDecrypt() {
      this.clickButton = 'clickDecrypt'
      this.calc()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

</style>
