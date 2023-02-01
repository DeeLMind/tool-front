/*
 * @Author: DeeLMind DeeLMind@gmail.com
 * @Date: 2022-05-30 13:35:31
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-07-31 10:38:20
 * @FilePath: \lab\mock\api\ctf\pwn.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function pwn(data) {
  return request({
    url: '/ctf/pwn',
    method: 'post',
    data
  })
}

export function getPwnOne(data) {
  return request({
    url: '/ctf/getPwnOne',
    method: 'post',
    data
  })
}
