<template>
  <div class="components-container">
    <FileUpload v-model="fileBuffer" />
    <div class="input-group">
      <el-input v-model="inputString" class="dark-el-input" placeholder="待输入字符" prefix-icon="el-icon-edit" size="medium " @input="encode" />
    </div>
    <div class="textarea-group">
      <div class="radio-group">
        <el-radio v-model="picked" label="File" class="dark-el-radio">文件</el-radio>
        <el-radio v-model="picked" label="String" class="dark-el-radio">字符</el-radio>
      </div>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Has160</template>
        <template #para>
          <label class="base-label">Rounds</label>
          <el-input-number v-model="has160Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="80" :step="1" @change="has160Calc" />
          <StringCopy v-model="has160CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="has160Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Md2</template>
        <template #para>
          <label class="base-label">Rounds</label>
          <el-input-number v-model="md2Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="18" :step="1" @change="md2Calc" />
          <StringCopy v-model="md2CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="md2Result" />
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
        <template #spanName>Md6</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Size</label>
            <el-input-number v-model="md6Size" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="256" :step="1" @change="md6Calc" />
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Levels</label>
            <el-input-number v-model="md6Levels" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="64" :step="1" @change="md6Calc" />
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Key</label>
            <div class="hashitem-para-group">
              <el-input v-model="md6Key" class="dark-para-el-input" size="small" @input="md6Calc" />
            </div>
          </div>
          <StringCopy v-model="md6CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="md6Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Sha0</template>
        <template #para>
          <label class="base-label">Rounds</label>
          <el-input-number v-model="sha0Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="80" :step="1" @change="sha0Calc" />
          <StringCopy v-model="sha0CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha0Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Sha1</template>
        <template #para>
          <label class="base-label">Rounds</label>
          <el-input-number v-model="sha1Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="80" :step="1" @change="sha1Calc" />
          <StringCopy v-model="sha1CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha1Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Sha2-256</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Size</label>
            <el-select v-model="sha256Selected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="sha256Calc">
              <el-option v-for="option in sha256Options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Rounds</label>
            <el-input-number v-model="sha256Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="64" :step="1" @change="sha256Calc" />
          </div>
          <StringCopy v-model="sha256CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha256Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Sha2-512</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Size</label>
            <el-select v-model="sha512Selected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="sha512Calc">
              <el-option v-for="option in sha512Options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Rounds</label>
            <el-input-number v-model="sha512Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="160" :step="1" @change="sha512Calc" />
          </div>
          <StringCopy v-model="sha512CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha512Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Sha3</template>
        <template #para>
          <label class="base-label">Size</label>
          <el-select v-model="sha3Selected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="sha3Calc">
            <el-option v-for="option in sha3Options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <StringCopy v-model="sha3CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sha3Result" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Snefru</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Size</label>
            <el-input-number v-model="snefruSize" class="dark-el-input-number" size="small" controls-position="right" :min="32" :max="448" :step="32" @change="snefruCalc" />
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Rounds</label>
            <el-select v-model="snefruSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="snefruCalc">
              <el-option v-for="option in snefruOption" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <StringCopy v-model="snefruCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="snefruResult" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Whirlpool</template>
        <template #para>
          <div class="hashitem-para-group">
            <el-select v-model="whirlpoolSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="whirpoolCalc">
              <el-option v-for="option in whirlpoolOption" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Rounds</label>
            <el-input-number v-model="whirlpoolRounds" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="10" :step="1" @change="whirpoolCalc" />
          </div>
          <StringCopy v-model="whirlpoolCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="whirlpoolResult" />
        </template>
      </HashItem>
    </div>
    <div class="textarea-group">
      <HashItem>
        <template #spanName>Sm3</template>
        <template #para>
          <div class="hashitem-para-group">
            <label class="base-label">Length</label>
            <el-input-number v-model="sm3Length" class="dark-el-input-number" size="small" controls-position="right" :min="1" :max="256" :step="1" @change="sm3Calc" />
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Rounds</label>
            <el-input-number v-model="sm3Rounds" class="dark-el-input-number" size="small" controls-position="right" :min="16" :max="64" :step="1" @change="sm3Calc" />
          </div>
          <StringCopy v-model="sm3CopyData" />
        </template>
        <template #result>
          <ItemResult v-model="sm3Result" />
        </template>
      </HashItem>
      <HashItem>
        <template #spanName>Hmac</template>
        <template #para>
          <div class="hashitem-para-group">
            <el-select v-model="hmacSelected" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="hMacCalc">
              <el-option v-for="option in hmacOption" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </div>
          <div class="hashitem-para-group">
            <label class="base-label">Key</label>
            <div class="hashitem-para-group">
              <el-input v-model="hmacKey" class="dark-para-el-input" size="small" @input="hMacCalc" />
            </div>
          </div>
          <StringCopy v-model="hmacCopyData" />
        </template>
        <template #result>
          <ItemResult v-model="hmacResult" />
        </template>
      </HashItem>
    </div>
  </div>
</template>

<script>
import { run as has160Run } from '@/libs/hash/has160'
import { run as md2Run } from '@/libs/hash/md2'
import { run as md4Run } from '@/libs/hash/md4'
import { run as md5Run } from '@/libs/hash/md5'
import { run as md6Run } from '@/libs/hash/md6'
import { run as sha0Run } from '@/libs/hash/sha0'
import { run as sha1Run } from '@/libs/hash/sha1'
import { run as sha256Run } from '@/libs/hash/sha256'
import { run as sha512Run } from '@/libs/hash/sha512'
import { run as sha3Run } from '@/libs/hash/sha3'
import { run as snefruRun } from '@/libs/hash/snefru'
import { run as whirlpoolRun } from '@/libs/hash/whirlpool'
import { run as sm3Run } from '@/libs/hash/sm3'
import { run as hmacRun } from '@/libs/hash/hmac'

import Has160Worker from 'workerize-loader!@/libs/hash/has160'
import Md2Worker from 'workerize-loader!@/libs/hash/md2'
import Md4Worker from 'workerize-loader!@/libs/hash/md4'
import Md5Worker from 'workerize-loader!@/libs/hash/md5'
import Md6Worker from 'workerize-loader!@/libs/hash/md6'
import Sha0Worker from 'workerize-loader!@/libs/hash/sha0'
import Sha1Worker from 'workerize-loader!@/libs/hash/sha1'
import Sha256Worker from 'workerize-loader!@/libs/hash/sha256'
import Sha512Worker from 'workerize-loader!@/libs/hash/sha512'
import Sha3Worker from 'workerize-loader!@/libs/hash/sha3'
import SnefruWorker from 'workerize-loader!@/libs/hash/snefru'
import WhirlpoolWorker from 'workerize-loader!@/libs/hash/whirlpool'
import Sm3Worker from 'workerize-loader!@/libs/hash/sm3'
import hmacWorker from 'workerize-loader!@/libs/hash/hmac'

import FileUpload from '@/components/ComonViews/fileUpload.vue'
import HashItem from '@/views/hash/components/hashItem.vue'
import StringCopy from '@/components/ComonViews/stringCopy.vue'
import ItemResult from '@/views/hash/components/itemResult.vue'

export default {
  name: 'HashHash',
  components: { FileUpload, HashItem, StringCopy, ItemResult },
  data() {
    return {
      fileBuffer: '', // 保存文件数据
      inputString: '', // 用户输入待操作的字符
      picked: 'String', // 记录用户选择的是文件还是字符
      switchChange: 0, // 修改单个值时使用
      has160Rounds: '80',
      has160Result: '',
      has160CopyData: '',
      md2Rounds: '18',
      md2Result: '',
      md2CopyData: '',
      md4Result: '',
      md4CopyData: '',
      md5Result: '',
      md5CopyData: '',
      md6Size: '256',
      md6Levels: '64',
      md6Key: '',
      md6Result: '',
      md6CopyData: '',
      sha0Rounds: '80',
      sha0Result: '',
      sha0CopyData: '',
      sha1Rounds: '80',
      sha1Result: '',
      sha1CopyData: '',
      sha256Selected: '256',
      sha256Rounds: '64',
      sha256Result: '',
      sha256CopyData: '',
      sha256Options: [
        { label: '224', value: '224' },
        { label: '256', value: '256' }
      ],
      sha512Selected: '512',
      sha512Rounds: '160',
      sha512Result: '',
      sha512CopyData: '',
      sha512Options: [
        { label: '224', value: '224' },
        { label: '256', value: '256' },
        { label: '384', value: '384' },
        { label: '512', value: '512' }
      ],
      sha3Selected: '512',
      sha3Result: '',
      sha3CopyData: '',
      sha3Options: [
        { label: '224', value: '224' },
        { label: '256', value: '256' },
        { label: '384', value: '384' },
        { label: '512', value: '512' }
      ],
      snefruSize: '128',
      snefruSelected: '8',
      snefruResult: '',
      snefruCopyData: '',
      snefruOption: [
        { label: '2', value: '2' },
        { label: '4', value: '4' },
        { label: '8', value: '8' }
      ],
      whirlpoolResult: '',
      whirlpoolCopyData: '',
      whirlpoolSelected: 'Whirlpool',
      whirlpoolRounds: '10',
      whirlpoolOption: [
        { label: 'Whirlpool', value: 'Whirlpool' },
        { label: 'Whirlpool-T', value: 'Whirlpool-T' },
        { label: 'Whirlpool-0', value: 'Whirlpool-0' }
      ],
      sm3Rounds: '64',
      sm3Length: '256',
      sm3Result: '',
      sm3CopyData: '',
      hmacSelected: 'MD2',
      hmacKey: '',
      hmacResult: '',
      hmacCopyData: '',
      hmacOption: [
        { label: 'MD2', value: 'MD2' },
        { label: 'MD4', value: 'MD4' },
        { label: 'MD5', value: 'MD5' },
        { label: 'SHA0', value: 'SHA0' },
        { label: 'SHA1', value: 'SHA1' },
        { label: 'SHA224', value: 'SHA224' },
        { label: 'SHA256', value: 'SHA256' },
        { label: 'SHA384', value: 'SHA384' },
        { label: 'SHA512', value: 'SHA512' },
        { label: 'SHA512/224', value: 'SHA512/224' },
        { label: 'SHA512/256', value: 'SHA512/256' },
        { label: 'RIPEMD128', value: 'RIPEMD128' },
        { label: 'RIPEMD160', value: 'RIPEMD160' },
        { label: 'RIPEMD256', value: 'RIPEMD256' },
        { label: 'RIPEMD320', value: 'RIPEMD320' },
        { label: 'HAS160', value: 'HAS160' },
        { label: 'Whirlpool', value: 'Whirlpool' },
        { label: 'Whirlpool-0', value: 'Whirlpool-0' },
        { label: 'Whirlpool-T', value: 'Whirlpool-T' },
        { label: 'Snefru', value: 'Snefru' }
      ]
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
          this.has160Result = string
          this.md2Result = string
          this.md4Result = string
          this.md5Result = string
          this.md6Result = string
          this.sha0Result = string
          this.sha1Result = string
          this.sha256Result = string
          this.sha512Result = string
          this.sha3Result = string
          this.snefruResult = string
          this.whirlpoolResult = string
          this.sm3Result = string
          this.hmacResult = string
          break
        case 1:
          this.has160Result = string
          break
        case 2:
          this.md2Result = string
          break
        case 3:
          this.md6Result = string
          break
        case 4:
          this.sha0Result = string
          break
        case 5:
          this.sha1Result = string
          break
        case 6:
          this.sha256Result = string
          break
        case 7:
          this.sha512Result = string
          break
        case 8:
          this.sha3Result = string
          break
        case 9:
          this.snefruResult = string
          break
        case 10:
          this.whirlpoolResult = string
          break
        case 11:
          this.sm3Result = string
          break
        case 12:
          this.hmacResult = string
          break
        default:
          break
      }
    },
    has160Calc() {
      this.switchChange = 1
      this.encode()
      this.switchChange = 0
    },
    md2Calc() {
      this.switchChange = 2
      this.encode()
      this.switchChange = 0
    },
    md6Calc() {
      this.switchChange = 3
      this.encode()
      this.switchChange = 0
    },
    sha0Calc() {
      this.switchChange = 4
      this.encode()
      this.switchChange = 0
    },
    sha1Calc() {
      this.switchChange = 5
      this.encode()
      this.switchChange = 0
    },
    sha256Calc() {
      this.switchChange = 6
      this.encode()
      this.switchChange = 0
    },
    sha512Calc() {
      this.switchChange = 7
      this.encode()
      this.switchChange = 0
    },
    sha3Calc() {
      this.switchChange = 8
      this.encode()
      this.switchChange = 0
    },
    snefruCalc() {
      this.switchChange = 9
      this.encode()
      this.switchChange = 0
    },
    whirpoolCalc() {
      this.switchChange = 10
      this.encode()
      this.switchChange = 0
    },
    sm3Calc() {
      this.switchChange = 11
      this.encode()
      this.switchChange = 0
    },
    hMacCalc() {
      this.switchChange = 12
      this.encode()
      this.switchChange = 0
    },
    encode() {
      if (this.picked === 'String') {
        this.resetResult('', this.switchChange)
        if (this.inputString.length !== 0) {
          this.hashCalc(this.inputString, this.switchChange)
        }
      } else if (this.picked === 'File') {
        this.resetResult('', this.switchChange)
        if (this.fileBuffer.length !== 0) {
          this.resetResult('手算中，请稍等....', this.switchChange)
          this.fileHashCalc(this.fileBuffer, this.switchChange)
        }
      }
    },
    // 字符串hash计算，多线程会占用过多cpu，可能导致崩溃
    hashCalc(string, number) {
      switch (number) {
        case 0:
          this.has160CopyData = this.has160Result = has160Run(string, { rounds: parseInt(this.has160Rounds, 10) })
          this.md2CopyData = this.md2Result = md2Run(string, { rounds: parseInt(this.md2Rounds, 10) })
          this.md4CopyData = this.md4Result = md4Run(string)
          this.md5CopyData = this.md5Result = md5Run(string)
          this.md6CopyData = this.md6Result = md6Run(string, {
            size: parseInt(this.md6Size, 10),
            key: this.md6Key,
            levels: parseInt(this.md6Levels, 10)
          })
          this.sha0CopyData = this.sha0Result = sha0Run(string, { rounds: parseInt(this.sha0Rounds, 10) })
          this.sha1CopyData = this.sha1Result = sha1Run(string, { rounds: parseInt(this.sha1Rounds, 10) })
          this.sha256CopyData = this.sha256Result = sha256Run(string, { length: parseInt(this.sha256Selected, 10), rounds: parseInt(this.sha256Rounds, 10) })
          this.sha512CopyData = this.sha512Result = sha512Run(string, { length: parseInt(this.sha512Selected, 10), rounds: parseInt(this.sha512Rounds, 10) })
          this.sha3CopyData = this.sha3Result = sha3Run(string, parseInt(this.sha3Selected, 10))
          this.snefruCopyData = this.snefruResult = snefruRun(string, { length: parseInt(this.snefruSize, 10), rounds: parseInt(this.snefruSelected, 10) })
          if (this.whirlpoolSelected === 'Whirlpool') {
            this.whirlpoolCopyData = this.whirlpoolResult = whirlpoolRun(string, { type: '', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-T') {
            this.whirlpoolCopyData = this.whirlpoolResult = whirlpoolRun(string, { type: 't', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-0') {
            this.whirlpoolCopyData = this.whirlpoolResult = whirlpoolRun(string, { type: '0', rounds: parseInt(this.whirlpoolRounds, 10) })
          }
          this.sm3CopyData = this.sm3Result = sm3Run(string, { length: parseInt(this.sm3Length, 10), rounds: parseInt(this.sm3Rounds, 10) })
          this.hmacCopyData = this.hmacResult = hmacRun(string, [this.hmacKey, this.hmacSelected])
          break
        case 1:
          this.has160CopyData = this.has160Result = has160Run(string, { rounds: parseInt(this.has160Rounds, 10) })
          break
        case 2:
          this.md2CopyData = this.md2Result = md2Run(string, { rounds: parseInt(this.md2Rounds, 10) })
          break
        case 3:
          this.md6CopyData = this.md6Result = md6Run(string, {
            size: parseInt(this.md6Size, 10),
            key: this.md6Key,
            levels: parseInt(this.md6Levels, 10)
          })
          break
        case 4:
          this.sha0CopyData = this.sha0Result = sha0Run(string, { rounds: parseInt(this.sha0Rounds, 10) })
          break
        case 5:
          this.sha1CopyData = this.sha1Result = sha1Run(string, { rounds: parseInt(this.sha1Rounds, 10) })
          break
        case 6:
          this.sha256CopyData = this.sha256Result = sha256Run(string, { length: parseInt(this.sha256Selected, 10), rounds: parseInt(this.sha256Rounds, 10) })
          break
        case 7:
          this.sha512CopyData = this.sha512Result = sha512Run(string, { length: parseInt(this.sha512Selected, 10), rounds: parseInt(this.sha512Rounds, 10) })
          break
        case 8:
          this.sha3CopyData = this.sha3Result = sha3Run(string, parseInt(this.sha3Selected, 10))
          break
        case 9:
          this.snefruCopyData = this.snefruResult = snefruRun(string, { length: parseInt(this.snefruSize, 10), rounds: parseInt(this.snefruSelected, 10) })
          break
        case 10:
          if (this.whirlpoolSelected === 'Whirlpool') {
            this.whirlpoolCopyData = this.whirlpoolResult = whirlpoolRun(string, { type: '', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-T') {
            this.whirlpoolCopyData = this.whirlpoolResult = whirlpoolRun(string, { type: 't', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-0') {
            this.whirlpoolCopyData = this.whirlpoolResult = whirlpoolRun(string, { type: '0', rounds: parseInt(this.whirlpoolRounds, 10) })
          }
          break
        case 11:
          this.sm3CopyData = this.sm3Result = sm3Run(string, { length: parseInt(this.sm3Length, 10), rounds: parseInt(this.sm3Rounds, 10) })
          break
        case 12:
          this.hmacCopyData = this.hmacResult = hmacRun(string, [this.hmacKey, this.hmacSelected])
          break
        default:
          break
      }
    },
    // 文件hash计算，利用多线程避免卡ui
    async fileHashCalc(string, number) {
      const has160 = Has160Worker()
      const md2 = Md2Worker()
      const md4 = Md4Worker()
      const md5 = Md5Worker()
      const md6 = Md6Worker()
      const sha0 = Sha0Worker()
      const sha1 = Sha1Worker()
      const sha256 = Sha256Worker()
      const sha512 = Sha512Worker()
      const sha3 = Sha3Worker()
      const snefru = SnefruWorker()
      const whirlpool = WhirlpoolWorker()
      const sm3 = Sm3Worker()
      const hmac = hmacWorker()

      switch (number) {
        case 0:
          this.has160CopyData = this.has160Result = await has160.run(string, { rounds: parseInt(this.has160Rounds, 10) })
          this.md2CopyData = this.md2Result = await md2.run(string, { rounds: parseInt(this.md2Rounds, 10) })
          this.md4CopyData = this.md4Result = await md4.run(string)
          this.md5CopyData = this.md5Result = await md5.run(string)
          this.md6CopyData = this.md6Result = await md6.run(string, {
            size: parseInt(this.md6Size, 10),
            key: this.md6Key,
            levels: parseInt(this.md6Levels, 10)
          })
          this.sha0CopyData = this.sha0Result = await sha0.run(string, { rounds: parseInt(this.sha0Rounds, 10) })
          this.sha1CopyData = this.sha1Result = await sha1.run(string, { rounds: parseInt(this.sha1Rounds, 10) })
          this.sha256CopyData = this.sha256Result = await sha256.run(string, { length: parseInt(this.sha256Selected, 10), rounds: parseInt(this.sha256Rounds, 10) })
          this.sha512CopyData = this.sha512Result = await sha512.run(string, { length: parseInt(this.sha512Selected, 10), rounds: parseInt(this.sha512Rounds, 10) })
          this.sha3CopyData = this.sha3Result = await sha3.run(string, parseInt(this.sha3Selected, 10))
          this.snefruCopyData = this.snefruResult = await snefru.run(string, { length: parseInt(this.snefruSize, 10), rounds: parseInt(this.snefruSelected, 10) })
          if (this.whirlpoolSelected === 'Whirlpool') {
            this.whirlpoolCopyData = this.whirlpoolResult = await whirlpool.run(string, { type: '', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-T') {
            this.whirlpoolCopyData = this.whirlpoolResult = await whirlpool.run(string, { type: 't', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-0') {
            this.whirlpoolCopyData = this.whirlpoolResult = await whirlpool.run(string, { type: '0', rounds: parseInt(this.whirlpoolRounds, 10) })
          }
          this.sm3CopyData = this.sm3Result = await sm3.run(string, { length: parseInt(this.sm3Length, 10), rounds: parseInt(this.sm3Rounds, 10) })
          this.hmacCopyData = this.hmacResult = await hmac.run(string, [this.hmacKey, this.hmacSelected])
          break
        case 1:
          this.has160CopyData = this.has160Result = await has160.run(string, { rounds: parseInt(this.has160Rounds, 10) })
          break
        case 2:
          this.md2CopyData = this.md2Result = await md2.run(string, { rounds: parseInt(this.md2Rounds, 10) })
          break
        case 3:
          this.md6CopyData = this.md6Result = await md6.run(string, {
            size: parseInt(this.md6Size, 10),
            key: this.md6Key,
            levels: parseInt(this.md6Levels, 10)
          })
          break
        case 4:
          this.sha0CopyData = this.sha0Result = await sha0.run(string, { rounds: parseInt(this.sha0Rounds, 10) })
          break
        case 5:
          this.sha1CopyData = this.sha1Result = await sha1.run(string, { rounds: parseInt(this.sha1Rounds, 10) })
          break
        case 6:
          this.sha256CopyData = this.sha256Result = await sha256.run(string, { length: parseInt(this.sha256Selected, 10), rounds: parseInt(this.sha256Rounds, 10) })
          break
        case 7:
          this.sha512CopyData = this.sha512Result = await sha512.run(string, { length: parseInt(this.sha512Selected, 10), rounds: parseInt(this.sha512Rounds, 10) })
          break
        case 8:
          this.sha3CopyData = this.sha3Result = await sha3.run(string, parseInt(this.sha3Selected, 10))
          break
        case 9:
          this.snefruCopyData = this.snefruResult = await snefru.run(string, { length: parseInt(this.snefruSize, 10), rounds: parseInt(this.snefruSelected, 10) })
          break
        case 10:
          if (this.whirlpoolSelected === 'Whirlpool') {
            this.whirlpoolCopyData = this.whirlpoolResult = await whirlpool.run(string, { type: '', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-T') {
            this.whirlpoolCopyData = this.whirlpoolResult = await whirlpool.run(string, { type: 't', rounds: parseInt(this.whirlpoolRounds, 10) })
          } else if (this.whirlpoolSelected === 'Whirlpool-0') {
            this.whirlpoolCopyData = this.whirlpoolResult = await whirlpool.run(string, { type: '0', rounds: parseInt(this.whirlpoolRounds, 10) })
          }
          break
        case 11:
          this.sm3CopyData = this.sm3Result = await sm3.run(string, { length: parseInt(this.sm3Length, 10), rounds: parseInt(this.sm3Rounds, 10) })
          break
        case 12:
          this.hmacCopyData = this.hmacResult = await hmac.run(string, [this.hmacKey, this.hmacSelected])
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

</style>
