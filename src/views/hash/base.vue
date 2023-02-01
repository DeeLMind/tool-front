<template>
  <div class="components-container">
    <FileUpload v-model="fileBuffer" />
    <div class="input-group">
      <el-input v-model="inputString" class="dark-el-input" placeholder="待输入字符" prefix-icon="el-icon-edit" size="medium " />
    </div>
    <div class="textarea-group">
      <el-button type="green-el-button" size="medium" @click="clickEncode">编码</el-button>
      <el-button type="green-el-button" size="medium" @click="clickDecode">解码</el-button>
      <div class="radio-group">
        <el-radio v-model="picked" label="File" class="dark-el-radio">文件</el-radio>
        <el-radio v-model="picked" label="String" class="dark-el-radio">字符</el-radio>
      </div>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Base16</template>
        <template #para>
          <label class="base-label">Alphabet</label>
          <div class="hashitem-para-group">
            <el-input v-model="base16Alphabet" class="dark-para-el-input" size="small" @input="base16Calc" />
          </div>
          <StringCopy v-model="base16CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base16Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Base32</template>
        <template #para>
          <label class="base-label">Alphabet</label>
          <div class="hashitem-para-group">
            <el-input v-model="base32Alphabet" class="dark-para-el-input" size="small" @input="base32Calc" />
          </div>
          <StringCopy v-model="base32CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base32Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Base58</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Type</label>
            <el-select v-model="base58Selected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="base58Change">
              <el-option v-for="option in base58Options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Alphabet</label>
            <div class="hashitem-para-group">
              <el-input v-model="base58Alphabet" class="dark-para-el-input" size="small" @input="base58Calc" />
            </div>
          </div>
          <StringCopy v-model="base58CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base58Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Base62</template>
        <template #para>
          <label class="base-label">Alphabet</label>
          <div class="hashitem-para-group">
            <el-input v-model="base62Alphabet" class="dark-para-el-input" size="small" @input="base62Calc" />
          </div>
          <StringCopy v-model="base62CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base62Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Base64</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Type</label>
            <el-select v-model="base64Selected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="base64Change">
              <el-option v-for="option in base64Options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Alphabet</label>
            <div class="hashitem-para-group">
              <el-input v-model="base64Alphabet" class="dark-para-el-input" size="small" @input="base64Calc" />
            </div>
          </div>
          <StringCopy v-model="base64CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base64Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Base85</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Type</label>
            <el-select v-model="base85Selected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="base85Change">
              <el-option v-for="option in base85Options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Alphabet</label>
            <div class="hashitem-para-group">
              <el-input v-model="base85Alphabet" class="dark-para-el-input" size="small" @input="base85Calc" />
            </div>
          </div>
          <StringCopy v-model="base85CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="base85Result" />
        </template>
      </HashItem>
    </div>
  </div>
</template>

<script>
import Base16Worker from 'workerize-loader!@/libs/hash/base16'
import Base32Worker from 'workerize-loader!@/libs/hash/base32'
import Base58Worker from 'workerize-loader!@/libs/hash/base58'
import Base62Worker from 'workerize-loader!@/libs/hash/base62'
import Base64Worker from 'workerize-loader!@/libs/hash/base64'
import Base85Worker from 'workerize-loader!@/libs/hash/base85'

import FileUpload from '@/components/ComonViews/fileUpload.vue'
import HashItem from '@/views/hash/components/hashItem.vue'
import StringCopy from '@/components/ComonViews/stringCopy.vue'
import ItemResult from '@/views/hash/components/itemResult.vue'

export default {
  name: 'Base',
  components: { FileUpload, HashItem, StringCopy, ItemResult },
  data() {
    return {
      fileBuffer: '', // 保存文件数据
      clickButton: '', // 点击编码还是解码按钮
      switchChange: 0, // 修改单个值时使用
      picked: 'String', // 记录用户选择的是文件还是字符
      inputString: '', // 用户输入待操作的字符
      base16Alphabet: '0-9A-F',
      base16Result: '',
      base16CopyData: '',
      base32Alphabet: 'A-Z2-7=',
      base32Result: '',
      base32CopyData: '',
      base58Selected: 'BitCoin',
      base58Alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
      base58Result: '',
      base58CopyData: '',
      base58Options: [
        { label: 'BitCoin', value: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz' },
        { label: 'Ripple', value: 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz' }
      ],
      base62Alphabet: '0-9A-Za-z',
      base62Result: '',
      base62CopyData: '',
      base64Selected: 'Standard',
      base64Alphabet: 'A-Za-z0-9+/=',
      base64Result: '',
      base64CopyData: '',
      base64Options: [
        { label: 'Standard', value: 'A-Za-z0-9+/=' },
        { label: 'URL safe', value: 'A-Za-z0-9-_' },
        { label: 'Filename safe', value: 'A-Za-z0-9+\\-=' },
        { label: 'itoa64', value: './0-9A-Za-z=' },
        { label: 'XML', value: 'A-Za-z0-9_.' },
        { label: 'y64', value: 'A-Za-z0-9._-' },
        { label: 'z64', value: '0-9a-zA-Z+/=' },
        { label: 'Radix-64', value: '0-9A-Za-z+/=' },
        { label: 'Uuencoding', value: ' -_' },
        { label: 'Xxencoding', value: '+\\-0-9A-Za-z' },
        { label: 'BinHex', value: '!-,-0-689@A-NP-VX-Z[`a-fh-mp-r' },
        { label: 'ROT13', value: 'N-ZA-Mn-za-m0-9+/=' },
        { label: 'UNIX crypt', value: './0-9A-Za-z' },
        { label: 'Atom128', value: '/128GhIoPQROSTeUbADfgHijKLM+n0pFWXY456xyzB7=39VaqrstJklmNuZvwcdEC' },
        { label: 'Megan35', value: '3GHIJKLMNOPQRSTUb=cdefghijklmnopWXYZ/12+406789VaqrstuvwxyzABCDEF5' },
        { label: 'Zong22', value: 'ZKj9n+yf0wDVX1s/5YbdxSo=ILaUpPBCHg8uvNO4klm6iJGhQ7eFrWczAMEq3RTt2' },
        { label: 'Hazz15', value: 'HNO4klm6ij9n+J2hyf0gzA8uvwDEq3X1Q7ZKeFrWcVTts/MRGYbdxSo=ILaUpPBC5' }
      ],
      base85Selected: 'Standard',
      base85Alphabet: '!-u',
      base85Result: '',
      base85CopyData: '',
      base85Options: [
        { label: 'Standard', value: '!-u' },
        { label: 'Z85(ZeroMQ)', value: '0-9a-zA-Z.\\-:+=^!/*?&<>()[]{}@%$#' },
        { label: 'IPv6', value: '0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~' }
      ]
    }
  },
  methods: {
    doCopy() {
      this.$copyText(this.base16Result)
    },
    // 设置结果显示框
    resetResult(string, number) {
      switch (number) {
        case 0:
          this.base16Result = string
          this.base32Result = string
          this.base58Result = string
          this.base62Result = string
          this.base64Result = string
          this.base85Result = string
          break
        case 1:
          this.base16Result = string
          break
        case 2:
          this.base32Result = string
          break
        case 3:
          this.base58Result = string
          break
        case 4:
          this.base62Result = string
          break
        case 5:
          this.base64Result = string
          break
        case 6:
          this.base85Result = string
          break
        default:
          break
      }
    },
    // base16单独改变时触发
    base16Calc() {
      this.switchChange = 1
      this.baseCalc()
      this.switchChange = 0
    },
    base32Calc() {
      this.switchChange = 2
      this.baseCalc()
      this.switchChange = 0
    },
    base58Change() {
      this.base58Alphabet = this.base58Selected
      this.base58Calc()
    },
    base58Calc() {
      this.switchChange = 3
      this.baseCalc()
      this.switchChange = 0
    },
    base62Calc() {
      this.switchChange = 4
      this.baseCalc()
      this.switchChange = 0
    },
    base64Change() {
      this.base64Alphabet = this.base64Selected
      this.base64Calc()
    },
    base64Calc() {
      this.switchChange = 5
      this.baseCalc()
      this.switchChange = 0
    },
    base85Change() {
      this.base85Alphabet = this.base85Selected
      this.base85Calc()
    },
    base85Calc() {
      this.switchChange = 6
      this.baseCalc()
      this.switchChange = 0
    },
    async encode(string, number) {
      const base16 = Base16Worker()
      const base32 = Base32Worker()
      const base58 = Base58Worker()
      const base62 = Base62Worker()
      const base64 = Base64Worker()
      const base85 = Base85Worker()

      const ifMax = string.length > 1 * 1024 * 1024

      switch (number) {
        case 0:
          base32.Encode(string, this.base32Alphabet).then(res => {
            this.base32CopyData = res
            this.base32Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base64.Encode(string, this.base64Alphabet).then(res => {
            this.base64CopyData = res
            this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base16.Encode(string, this.base16Alphabet).then(res => {
            this.base16CopyData = res
            this.base16Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base85.Encode(string, this.base85Alphabet).then(res => {
            this.base85CopyData = res
            this.base85Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base58.Encode(string, this.base58Alphabet).then(res => {
            this.base58CopyData = res
            this.base58Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base62.Encode(string, this.base62Alphabet).then(res => {
            this.base62CopyData = res
            this.base62Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 1:
          base16.Encode(string, this.base16Alphabet).then(res => {
            this.base16CopyData = res
            this.base16Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 2:
          base32.Encode(string, this.base32Alphabet).then(res => {
            this.base32CopyData = res
            this.base32Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 3:
          base58.Encode(string, this.base58Alphabet).then(res => {
            this.base58CopyData = res
            this.base58Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 4:
          base62.Encode(string, this.base62Alphabet).then(res => {
            this.base62CopyData = res
            this.base62Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 5:
          base64.Encode(string, this.base64Alphabet).then(res => {
            this.base64CopyData = res
            this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 6:
          base85.Encode(string, this.base85Alphabet).then(res => {
            this.base85CopyData = res
            this.base85Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        default:
          break
      }
    },
    async decode(string, number) {
      const base16 = Base16Worker()
      const base32 = Base32Worker()
      const base58 = Base58Worker()
      const base62 = Base62Worker()
      const base64 = Base64Worker()
      const base85 = Base85Worker()

      const ifMax = string.length > 1 * 1024 * 1024

      switch (number) {
        case 0:
          base32.Decode(string, this.base32Alphabet).then(res => {
            this.base32CopyData = res
            this.base32Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base64.Decode(string, this.base64Alphabet).then(res => {
            this.base64CopyData = res
            this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base16.Decode(string, this.base16Alphabet).then(res => {
            this.base16CopyData = res
            this.base16Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base85.Decode(string, this.base85Alphabet).then(res => {
            this.base85CopyData = res
            this.base85Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base58.Decode(string, this.base58Alphabet).then(res => {
            this.base58CopyData = res
            this.base58Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          base62.Decode(string, this.base62Alphabet).then(res => {
            this.base62CopyData = res
            this.base62Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 1:
          base16.Decode(string, this.base16Alphabet).then(res => {
            this.base16CopyData = res
            this.base16Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 2:
          base32.Decode(string, this.base32Alphabet).then(res => {
            this.base32CopyData = res
            this.base32Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 3:
          base58.Decode(string, this.base58Alphabet).then(res => {
            this.base58CopyData = res
            this.base58Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 4:
          base62.Decode(string, this.base62Alphabet).then(res => {
            this.base62CopyData = res
            this.base62Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 5:
          base64.Decode(string, this.base64Alphabet).then(res => {
            this.base64CopyData = res
            this.base64Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        case 6:
          base85.Decode(string, this.base85Alphabet).then(res => {
            this.base85CopyData = res
            this.base85Result = ifMax ? '计算完毕，字符过长，请复制值进行查看' : res
          })
          break
        default:
          break
      }
    },
    // 进行base计算总入口
    baseCalc() {
      if (this.clickButton === 'clickEncode') {
        if (this.picked === 'String') {
          this.encode(this.inputString, this.switchChange)
        } else if (this.picked === 'File') {
          if (this.fileBuffer.length !== 0) {
            this.resetResult('手算中，请稍等....', this.switchChange)
            this.encode(this.fileBuffer, this.switchChange)
          }
        }
      } else if (this.clickButton === 'clickDecode') {
        if (this.picked === 'String') {
          this.decode(this.inputString, this.switchChange)
        } else if (this.picked === 'File') {
          if (this.fileBuffer.length !== 0) {
            this.resetResult('手算中，请稍等....', this.switchChange)
            this.decode(this.fileBuffer, this.switchChange)
          }
        }
      }
    },
    // 点击编码按钮触发
    clickEncode() {
      this.clickButton = 'clickEncode'
      this.baseCalc()
    },
    // 点击解码按钮触发
    clickDecode() {
      this.clickButton = 'clickDecode'
      this.baseCalc()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

</style>
