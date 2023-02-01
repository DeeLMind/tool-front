<template>
  <div class="components-container">
    <FileUpload v-model="fileBuffer" />
    <div class="input-group">
      <el-input v-model="inputString" class="dark-el-input" placeholder="待输入字符" prefix-icon="el-icon-edit" size="medium " @input="encode" />
    </div>
    <div class="textarea-group">
      <div class="radio-group">
        <el-radio v-model="picked" label="File" class="dark-el-radio" @change="encode">文件</el-radio>
        <el-radio v-model="picked" label="String" class="dark-el-radio" @change="encode">字符</el-radio>
      </div>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Hex</template>
        <template #para>
          <div class="hashitem-para-group">
            <el-select v-model="hexModeSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="hexCalc">
              <el-option v-for="option in hexModeOptions" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">分割</label>
            <el-select v-model="delimiterSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="hexCalc">
              <el-option v-for="option in delimiterOption" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">列数</label>
            <el-input-number v-model="hexLine" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="25" :step="1" @change="hexCalc" />
          </div>
          <StringCopy v-model="hexCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="hexResult" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Base64</template>
        <template #para>
          <el-select v-model="base64ModeSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="base64Calc">
            <el-option v-for="option in base64ModeOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <StringCopy v-model="base64CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base64Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>UrlEncode</template>
        <template #para>
          <el-checkbox v-model="urlEncodePicked" class="dark-el-checkbox" label="编码所有特殊字符" @change="urlCalc" />
          <StringCopy v-model="urlEncodeCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="urlEncodeResult" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>UrlDecode</template>
        <template #para>
          <el-checkbox v-model="urlDecodePicked" class="dark-el-checkbox" label="Hex显示" @change="urlDecodeCalc" />
          <StringCopy v-model="urlDecodeCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="urlDecodeResult" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Md4</template>
        <template #para>
          <StringCopy v-model="md4CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="md4Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Md5</template>
        <template #para>
          <StringCopy v-model="md5CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="md5Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>SHA0</template>
        <template #para>
          <StringCopy v-model="sha0CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha0Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>SHA1</template>
        <template #para>
          <StringCopy v-model="sha1CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha1Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>SHA256</template>
        <template #para>
          <StringCopy v-model="sha256CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha256Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>sha512</template>
        <template #para>
          <StringCopy v-model="sha512CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha512Result" />
        </template>
      </HashItem>
    </div>
  </div>
</template>

<script>
import * as base64Func from '@/libs/hash/base64'
import { run as md4Run } from '@/libs/hash/md4'
import { run as md5Run } from '@/libs/hash/md5'
import { run as sha0Run } from '@/libs/hash/sha0'
import { run as sha1Run } from '@/libs/hash/sha1'
import { run as sha256Run } from '@/libs/hash/sha256'
import { run as sha512Run } from '@/libs/hash/sha512'
import * as hexFunc from '@/libs/common/hex'
import * as urlFunc from '@/libs/common/url'

import Base64Worker from 'workerize-loader!@/libs/hash/base64'
import Md4Worker from 'workerize-loader!@/libs/hash/md4'
import Md5Worker from 'workerize-loader!@/libs/hash/md5'
import Sha0Worker from 'workerize-loader!@/libs/hash/sha0'
import Sha1Worker from 'workerize-loader!@/libs/hash/sha1'
import Sha256Worker from 'workerize-loader!@/libs/hash/sha256'
import Sha512Worker from 'workerize-loader!@/libs/hash/sha512'
import HexWorker from 'workerize-loader!@/libs/common/hex'
import UrlWorker from 'workerize-loader!@/libs/common/url'

import FileUpload from '@/components/ComonViews/fileUpload.vue'
import HashItem from '@/views/hash/components/hashItem.vue'
import StringCopy from '@/components/ComonViews/stringCopy.vue'
import ItemResult from '@/views/hash/components/itemResult.vue'

export default {
  name: 'Normal',
  components: { FileUpload, HashItem, StringCopy, ItemResult },
  data() {
    return {
      fileBuffer: '', // 保存文件数据
      inputString: '', // 用户输入待操作的字符
      picked: 'String', // 记录用户选择的是文件还是字符
      switchChange: 0, // 修改单个值时使用
      base64ModeSelected: 'encode',
      base64Result: '',
      base64CopyData: '',
      base64ModeOptions: [
        { label: 'encode', value: 'encode' },
        { label: 'decode', value: 'decode' }
      ],
      md4Result: '',
      md4CopyData: '',
      md5Result: '',
      md5CopyData: '',
      sha0Result: '',
      sha0CopyData: '',
      sha1Result: '',
      sha1CopyData: '',
      sha256Result: '',
      sha256CopyData: '',
      sha512Result: '',
      sha512CopyData: '',
      delimiterSelected: 'Space',
      delimiterOption: [
        { label: 'Space', value: 'Space' },
        { label: 'Percent', value: 'Percent' },
        { label: 'Comma', value: 'Comma' },
        { label: 'Semi-colon', value: 'Semi-colon' },
        { label: 'Colon', value: 'Colon' },
        { label: 'Line feed', value: 'Line feed' },
        { label: 'CRLF', value: 'CRLF' },
        { label: '0x', value: '0x' },
        { label: '0x with Comma', value: '0x with Comma' },
        { label: '\\x', value: '\\x' },
        { label: 'None', value: 'None' }
      ],
      hexLine: '25',
      hexModeSelected: 'toHex',
      hexModeOptions: [
        { label: 'toHex', value: 'toHex' },
        { label: 'fromHex', value: 'fromHex' }
      ],
      hexResult: '',
      hexCopyData: '',
      urlEncodePicked: false,
      urlEncodeResult: '',
      urlEncodeCopyData: '',
      urlDecodePicked: false,
      urlDecodeResult: '',
      urlDecodeCopyData: ''
    }
  },
  watch: {
    fileBuffer() {
      this.encode()
    }
  },
  methods: {
    // 设置结果显示框
    resetResult(string, number) {
      switch (number) {
        case 0:
          this.base64Result = string
          this.md4Result = string
          this.md5Result = string
          this.sha0Result = string
          this.sha1Result = string
          this.sha256Result = string
          this.sha512Result = string
          this.hexResult = string
          this.urlEncodeResult = string
          this.urlDecodeResult = string
          break
        case 1:
          this.base64Result = string
          break
        case 2:
          this.hexResult = string
          break
        case 3:
          this.urlEncodeResult = string
          break
        case 4:
          this.urlDecodeResult = string
          break
        default:
          break
      }
    },
    base64Calc() {
      this.switchChange = 1
      this.encode()
      this.switchChange = 0
    },
    hexCalc() {
      this.switchChange = 2
      this.encode()
      this.switchChange = 0
    },
    urlCalc() {
      this.switchChange = 3
      this.encode()
      this.switchChange = 0
    },
    urlDecodeCalc() {
      this.switchChange = 4
      this.encode()
      this.switchChange = 0
    },
    encode() {
      if (this.picked === 'String') {
        this.resetResult('', this.switchChange)
        if (this.inputString.length !== 0) {
          this.stringCalc(this.inputString, this.switchChange)
        }
      } else if (this.picked === 'File') {
        this.resetResult('', this.switchChange)
        if (this.fileBuffer.length !== 0) {
          this.resetResult('手算中，请稍等....', this.switchChange)
          this.fileCalc(this.fileBuffer, this.switchChange)
        }
      }
    },
    // 字符串hash计算，多线程会占用过多cpu，可能导致崩溃
    stringCalc(string, number) {
      switch (number) {
        case 0:
          this.md4CopyData = this.md4Result = md4Run(string)
          this.md5CopyData = this.md5Result = md5Run(string)
          this.sha0CopyData = this.sha0Result = sha0Run(string)
          this.sha1CopyData = this.sha1Result = sha1Run(string)
          this.sha256CopyData = this.sha256Result = sha256Run(string)
          this.sha512CopyData = this.sha512Result = sha512Run(string)

          if (this.base64ModeSelected === 'encode') {
            this.base64CopyData = this.base64Result = base64Func.Encode(string)
          } else if (this.base64ModeSelected === 'decode') {
            this.base64CopyData = this.base64Result = base64Func.Decode(string)
          }
          if (this.hexModeSelected === 'toHex') {
            this.hexCopyData = this.hexResult = hexFunc.toHexRun(string, [this.delimiterSelected, this.hexLine])
          } else if (this.hexModeSelected === 'fromHex') {
            this.hexCopyData = this.hexResult = hexFunc.fromHex(string)
          }
          this.urlEncodeCopyData = this.urlEncodeResult = urlFunc.urlEncode(string, [this.urlEncodePicked])
          this.urlDecodeCopyData = this.urlDecodeResult = urlFunc.urlDecode(string)
          break
        case 1:
          if (this.base64ModeSelected === 'encode') {
            this.base64CopyData = this.base64Result = base64Func.Encode(string)
          } else if (this.base64ModeSelected === 'decode') {
            this.base64CopyData = this.base64Result = base64Func.Decode(string)
          }
          break
        case 2:
          if (this.hexModeSelected === 'toHex') {
            this.hexCopyData = this.hexResult = hexFunc.toHexRun(string, [this.delimiterSelected, this.hexLine])
          } else if (this.hexModeSelected === 'fromHex') {
            this.hexCopyData = this.hexResult = hexFunc.fromHex(string)
          }
          break
        case 3:
          this.urlEncodeCopyData = this.urlEncodeResult = urlFunc.urlEncode(string, [this.urlEncodePicked])
          break
        case 4:
          this.urlDecodeCopyData = this.urlDecodeResult = this.urlDecodePicked ? hexFunc.toHexRun(urlFunc.urlDecode(string), ['Space', 25]) : urlFunc.urlDecode(string)
          break
      }
    },
    // 文件hash计算，利用多线程避免卡ui
    async fileCalc(string, number) {
      const base64 = Base64Worker()
      const md4 = Md4Worker()
      const md5 = Md5Worker()
      const sha0 = Sha0Worker()
      const sha1 = Sha1Worker()
      const sha256 = Sha256Worker()
      const sha512 = Sha512Worker()
      const hex = HexWorker()
      const url = UrlWorker()

      const ifMax = string.length > 1 * 1024 * 1024

      switch (number) {
        case 0:
          this.md4CopyData = this.md4Result = await md4.run(string)
          this.md5CopyData = this.md5Result = await md5.run(string)
          this.sha0CopyData = this.sha0Result = await sha0.run(string)
          this.sha1CopyData = this.sha1Result = await sha1.run(string)
          this.sha256CopyData = this.sha256Result = await sha256.run(string)
          this.sha512CopyData = this.sha512Result = await sha512.run(string)

          if (this.base64ModeSelected === 'encode') {
            base64.Encode(string).then(res => {
              this.base64CopyData = res
              this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          } else if (this.base64ModeSelected === 'decode') {
            base64.Decode(string).then(res => {
              this.base64CopyData = res
              this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          }
          if (this.hexModeSelected === 'toHex') {
            hex.toHexRun(string, [this.delimiterSelected, this.hexLine]).then(res => {
              this.hexCopyData = res
              this.hexResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          } else if (this.hexModeSelected === 'fromHex') {
            hex.fromHex(string, [this.delimiterSelected, this.hexLine]).then(res => {
              this.hexCopyData = res
              this.hexResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          }
          url.urlEncode(string, [this.urlEncodePicked]).then(res => {
            this.urlEncodeCopyData = res
            this.urlEncodeResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          url.urlDecode(string).then(res => {
            this.urlDecodeCopyData = res
            this.urlDecodeResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 1:
          if (this.base64ModeSelected === 'encode') {
            base64.Encode(string).then(res => {
              this.base64CopyData = res
              this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          } else if (this.base64ModeSelected === 'decode') {
            base64.Decode(string).then(res => {
              this.base64CopyData = res
              this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          }
          break
        case 2:
          if (this.hexModeSelected === 'toHex') {
            hex.toHexRun(string, [this.delimiterSelected, this.hexLine]).then(res => {
              this.hexCopyData = res
              this.hexResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          } else if (this.hexModeSelected === 'fromHex') {
            hex.fromHex(string, [this.delimiterSelected, this.hexLine]).then(res => {
              this.hexCopyData = res
              this.hexResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
            })
          }
          break
        case 3:
          url.urlEncode(string, [this.urlEncodePicked]).then(res => {
            this.urlEncodeCopyData = res
            this.urlEncodeResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 4:
          url.urlDecode(string).then(res => {
            this.urlDecodeCopyData = this.urlDecodePicked ? hexFunc.toHexRun(res, ['Space', 25]) : res
            this.urlDecodeResult = ifMax ? '计算完毕，字符过长，请复制值进行查看' : this.urlDecodeCopyData
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

</style>
