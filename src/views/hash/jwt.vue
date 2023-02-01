<!--
 * @Author: QKSword
 * @Date: 2022-04-06 16:13:53
 * @LastEditTime: 2022-06-11 10:47:13
 * @LastEditors: DeeLMind DeeLMind@gmail.com
 * @Description: jwt编码解码实现
 * @FilePath: \gkattack-front\src\views\hash\jwt.vue
-->

<template>
  <div class="components-container">
    <div class="textarea-group">
      <div class="textarea-group-part">
        <span class="base-span">Jwt Token</span>
        <StringCopy v-model="jwtToken" />
        <el-input v-model="jwtToken" type="textarea" :rows="20" @input="jwtDecode" />
      </div>
      <div class="textarea-group-part">
        <div class="decode-textarea-group">
          <span class="base-span">Jwt Header</span>
          <StringCopy v-model="jwtHeader" />
          <el-input v-model="jwtHeader" type="textarea" :rows="5" @input="jwtEncode" />
        </div>
        <div class="decode-textarea-group">
          <span class="base-span">Jwt Payload</span>
          <StringCopy v-model="jwtPayload" />
          <el-input v-model="jwtPayload" type="textarea" :rows="5" @input="jwtEncode" />
        </div>
        <div class="decode-textarea-group">
          <span class="base-span">Jwt SecretKey</span>
          <el-select v-model="jwtSecretSelect" class="dark-el-select" :popper-append-to-body="false" size="small" filterable @change="changeSecretKey">
            <el-option v-for="option in jwtSecretOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <el-button v-if="rsaKey" icon="el-icon-refresh" type="primary" size="mini" @click="changeSecretKey" />
          <StringCopy v-model="jwtSecretKey" />
          <el-input v-model="jwtSecretKey" type="textarea" :rows="5" @input="jwtEncode" />
        </div>
      </div>
    </div>

    <div class="textarea-group">
      <template v-if="hmacKey">
        <div class="textarea-group-part">
          <span class="base-span">示例Key</span>
          <StringCopy v-model="hmacSecretKey" />
          <el-input v-model="hmacSecretKey" type="textarea" :rows="5" readonly="readonly" />
        </div>
      </template>
      <template v-if="rsaKey">
        <div class="textarea-group-part">
          <span class="base-span">示例Public Key</span>
          <StringCopy v-model="rsaPublicKey" />
          <el-input v-model="rsaPublicKey" type="textarea" :rows="5" readonly="readonly" />
        </div>
        <div class="textarea-group-part">
          <span class="base-span">示例Private Key</span>
          <StringCopy v-model="rsaPrivateKey" />
          <el-input v-model="rsaPrivateKey" type="textarea" :rows="5" readonly="readonly" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Utils from '@/libs/utils'
import jwt from 'jsonwebtoken'
import * as jose from 'jose'
import StringCopy from '@/components/ComonViews/stringCopy.vue'

export default {
  name: 'Jwt',
  components: { StringCopy },
  data() {
    return {
      jwtToken: '', // 编码后的jwt
      jwtHeader: '', // jwt头
      jwtPayload: '', // jwt载荷
      jwtSecretKey: '', // jwt秘钥
      jwtSecretSelect: 'HS256', // jwt秘钥选择
      jwtSecretOptions: [
        { label: 'HS256', value: 'HS256' },
        { label: 'HS384', value: 'HS384' },
        { label: 'HS512', value: 'HS512' },
        { label: 'RS256', value: 'RS256' },
        { label: 'RS384', value: 'RS384' },
        { label: 'RS512', value: 'RS512' },
        { label: 'PS256', value: 'PS256' },
        { label: 'PS384', value: 'PS384' },
        { label: 'PS512', value: 'PS512' },
        { label: 'ES256', value: 'ES256' },
        { label: 'ES384', value: 'ES384' },
        { label: 'ES512', value: 'ES512' }
      ],
      hmacKey: true, // 显示hmac密钥框
      hmacSecretKey: '', // hmac密钥
      rsaKey: false, // 显示rsa密钥框
      rsaPublicKey: '', // rsa公钥
      rsaPrivateKey: '', // rsa私钥
      keyType: true // true为普通，false为rsa密钥
    }
  },
  created() {
    this.jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkzMzYxMzcsImlzcyI6IualteWuouaWueiInyJ9.h1RnvLU5de4qm82uEZz66Ncrt2IgEygS4psSFdfsFFM'
    this.jwtSecretKey = this.hmacSecretKey = 'GeekFz'
    this.jwtDecode()
  },
  methods: {
    // feat(QKSword):jwt解码
    async jwtDecode() {
      if (this.jwtToken === '') {
        return
      }
      try {
        const decodedJwt = jwt.decode(this.jwtToken, {
          json: true,
          complete: true
        })
        this.jwtHeader = JSON.stringify(decodedJwt.header, null, 2)
        this.jwtPayload = JSON.stringify(decodedJwt.payload, null, 2)
      } catch (error) {
        this.$message({
          message: error,
          type: 'error',
          duration: 1.5 * 1000,
          customClass: 'geekMsg' })
      }
    },
    // feat(QKSword):jwt编码
    async jwtEncode() {
      // 检测header头是否正确
      if (this.jwtHeader === '') {
        return
      }

      const jsonHeader = JSON.parse(this.jwtHeader)
      if (Object.keys(jsonHeader).length === 2 &&
      Object.prototype.hasOwnProperty.call(jsonHeader, 'alg') &&
      Object.prototype.hasOwnProperty.call(jsonHeader, 'typ')) {
        // 设置jwt header
        var newHeader = {
          alg: this.jwtSecretSelect,
          typ: jsonHeader.typ
        }
        this.jwtHeader = JSON.stringify(newHeader, null, 2)

        // 设置jwt secretKey
        if (this.jwtSecretKey === '') {
          this.jwtSecretKey = 'GeekFz'
        }

        try {
          if (this.keyType === true) {
            this.jwtToken = await new jose.SignJWT(JSON.parse(this.jwtPayload))
              .setProtectedHeader(JSON.parse(this.jwtHeader))
              .sign(new Uint8Array(Utils.strToByteArray(this.jwtSecretKey)))
          } else {
            const privateKey = await jose.importPKCS8(this.jwtSecretKey, this.jwtSecretSelect)

            this.jwtToken = await new jose.SignJWT(JSON.parse(this.jwtPayload))
              .setProtectedHeader(JSON.parse(this.jwtHeader))
              .sign(privateKey)
          }
        } catch (error) {
          this.jwtToken = '请确认输入内容是否正确\n\n' + error
        }
      } else {
        this.jwtToken = 'header头不正确'
      }
    },
    // feat(QKSword):改变加密方式事件
    changeSecretKey() {
      // 判断选择的加密方式是否需要改变界面
      if (this.jwtSecretSelect === 'HS256' || this.jwtSecretSelect === 'HS384' || this.jwtSecretSelect === 'HS512') {
        this.hmacKey = true
        this.rsaKey = false
      } else {
        this.hmacKey = false
        this.rsaKey = true
      }

      // 根据不同的选择写入对应的示例key
      this.selectDemoKey().then(() => {
      // 进行编码
        this.jwtEncode()
      })
    },
    // feat(QKSword):选择对应的示例key
    async selectDemoKey() {
      const select = this.jwtSecretSelect

      if (select === 'HS256' || select === 'HS384' || select === 'HS512') {
        this.keyType = true
      } else {
        this.keyType = false
      }

      if (this.keyType === true) {
        this.jwtSecretKey = this.hmacSecretKey = 'GeekFz'
      } else {
        const { publicKey, privateKey } = await jose.generateKeyPair(select, { extractable: true })

        this.rsaPublicKey = await jose.exportSPKI(publicKey)

        this.jwtSecretKey = this.rsaPrivateKey = await jose.exportPKCS8(privateKey)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";
// feat(QKSword):刷新按钮样式
::v-deep.el-button--primary:hover,  // 悬浮不点击
::v-deep.el-button--primary:focus,  //抬起或移开鼠标
::v-deep.el-button--primary{
  color: $geekSecondaryColor;
  background-color: $inputColor;
  border-color: #555555;
  font-family: "Microsoft YaHei";
  float: right;
}

::v-deep.el-button--primary:active{ // 按下鼠标
  color: $geekColor;
  background-color: $inputColor;
  border-color: $geekColor;
  font-family: "Microsoft YaHei";
}

// feat(QKSword):textarea样式
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

  ::-webkit-scrollbar-track {
  background: #1e1e1e;
  border-radius: 0;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 3px;
    background: $geekColor;
    transition: color 0.2s ease;
  }
}

// feat(QKSword):文本框div样式
.decode-textarea-group{
    padding-top: 15px;
    position: relative;
    width: 100%;
}

// feat(QKSword):文本样式，这里不改变英文大小写
.base-span{
    color: $geekColor;
    padding-right: 20px;
    font-family: "Microsoft YaHei";
    text-transform: none;
}
</style>
