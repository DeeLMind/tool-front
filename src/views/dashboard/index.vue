<!--
 * @Author: DeeLMind
 * @Date: 2022-03-19 15:50:57
 * @LastEditTime: 2023-02-08 11:09:25
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: Dashboard
 * @FilePath: \gkattack-front\src\views\dashboard\index.vue
 -->
<template>
  <div class="components-container">
    <func-info :func-data="funcData" />
  </div>
</template>

<script>
import FuncInfo from '@/views/dashboard/components/FuncInfo.vue'

export default {
  name: 'Dashboard',
  components: {
    FuncInfo
  },

  data() {
    return {
      funcData: [
        {
          name: '进制转换',
          value: 25
        },
        // {
        //   name: '随机密码生成',
        //   value: 25
        // },
        // {
        //   name: 'IP地址转换',
        //   value: 25
        // },
        // {
        //   name: '时间戳转换',
        //   value: 25
        // },
        // {
        //   name: 'crontab执行时间计算',
        //   value: 25
        // },
        // {
        //   name: '二维码操作',
        //   value: 25
        // },
        {
          name: '编码解码',
          children: [
            {
              name: '常用编码',
              value: 5,
              children: [
                { name: 'HEX', value: 5 },
                { name: 'BASE64', value: 5 },
                { name: 'URLENCODE', value: 5 },
                { name: 'URLDNCODE', value: 5 },
                { name: 'MD4', value: 5 },
                { name: 'MD5', value: 5 },
                { name: 'SHA0', value: 5 },
                { name: 'SHA1', value: 5 },
                { name: 'SHA256', value: 5 },
                { name: 'SHA512', value: 5 }
              ]
            },
            {
              name: 'CTF编码',
              value: 5,
              children: [
                { name: 'JSFUNK', value: 5 },
                { name: 'BRAINFUCK', value: 5 },
                { name: '摩斯密码', value: 5 },
                { name: 'ROT13', value: 5 },
                { name: 'ROT47', value: 5 },
                { name: '栅栏密码', value: 5 },
                { name: '凯撒密码', value: 5 }
              ]
            },
            {
              name: 'BASE系列',
              value: 5,
              children: [
                { name: 'BASE16', value: 5 },
                { name: 'BASE32', value: 5 },
                { name: 'BASE58', value: 5 },
                { name: 'BASE62', value: 5 },
                { name: 'BASE64', value: 5 },
                { name: 'BASE85', value: 5 }
              ]
            },
            {
              name: 'HASH系列',
              value: 5,
              children: [
                { name: 'HAS160', value: 5 },
                { name: 'MD2', value: 5 },
                { name: 'MD4', value: 5 },
                { name: 'MD5', value: 5 },
                { name: 'MD6', value: 5 },
                { name: 'SHA0', value: 5 },
                { name: 'SHA1', value: 5 },
                { name: 'SHA2-256', value: 5 },
                { name: 'SHA2-512', value: 5 },
                { name: 'SHA3', value: 5 },
                { name: 'SNEFRU', value: 5 },
                { name: 'WHIRLPOOL', value: 5 },
                { name: 'SM3', value: 5 },
                { name: 'HMAC', value: 5 }
              ]
            },
            {
              name: 'JWT编解码',
              value: 5
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app-main.scss";

</style>
