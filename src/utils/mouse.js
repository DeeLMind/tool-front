/*
 * @Author: DeeLMind
 * @Date: 2022-03-22 10:17:42
 * @LastEditTime: 2022-03-25 13:08:28
 * @LastEditors: Please set LastEditors
 * @Description: 鼠标信息结构
 * @FilePath: \gkattack-front\src\utils\mouse.js
 */

import store from '@/store'
// import { JSEncrypt } from 'jsencrypt'
// import md5, { base64 } from 'js-md5'
const Base64 = require('js-base64').Base64

// const P1 = 1
// const P2 = 3
// const P3 = 10
// const P4 = 20
// const P5 = 50
// const P6 = 51

function copy(array) {
  const newArray = []
  for (const item of array) {
    newArray.push(item)
  }
  return newArray
}

// function P(tp) {
//   var position = copy(tp)
//   position.splice(P1, 0, '345,890')
//   position.splice(P2, 0, '89,64')
//   position.splice(P3, 0, '9876,0')
//   position.splice(P4, 0, '1234,654')
//   position.splice(P5, 0, '8912,90')
//   position.splice(P6, 0, '5,890')
//   return position
// }

// 鼠标位置1030个，真实1024个，6个校验点
export function packMouse() {
  // console.log('原始数据:', store.state.mouse.position)
  // console.log('原始数据长度:', store.state.mouse.position.length)
  // 深copy，不修改原始state里面的数据
  var position = copy(store.state.mouse.position)

  var result = ''
  // 数组转字符串x1,y1|x2,y2
  for (var p of position) {
    result = result + '|' + p
  }

  var baseResult = Base64.encode(result)
  return baseResult

  //   console.log('P数据:', position)
  //   console.log('P数据长度:', position.length)

//   var vmd5 = md5(result)
//   console.log(vmd5)
//   // RSA加密
//   const encryptor = new JSEncrypt()
//   // 设置公钥
//   const PUBLIC_KEY = `
//   -----BEGIN PUBLIC KEY-----
// MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHAXSxT6OsoYJc03ikKliNJIuxxb
// c4iyqL3LkWmMXDeDZSdK+NLIF/A2T2gWTlTM40Npy5x4mkCLqy5J4/cOsJ1O4QGa
// /DfjoJVQlAy9MfflfdWTnJvhGRNCXEg/lRKfMpmpS8YNxIDq9X9+PMPnj5Q0Ah+3
// h5P1Fwn+DY4eWSNvAgMBAAE=
// -----END PUBLIC KEY-----`
//   encryptor.setPublicKey(PUBLIC_KEY)
//   // 加密数据
//   var enresult = encryptor.encrypt(vmd5)
//   // rsa 加密base64数据第74位拼接md5
//   var r = enresult.slice(0, 74) + vmd5 + enresult.slice(74)
//   console.log(r)
//   console.log(result + '.' + r)
//   return result + enresult
}
