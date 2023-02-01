/*
 * @Author: DeeLMind DeeLMind@gmail.com
 * @Date: 2022-05-30 13:35:18
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-07-31 10:21:39
 * @FilePath: \lab\mock\api\ctf\web.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function web(data) {
  return request({
    url: '/ctf/web',
    method: 'post',
    data
  })
}

export function getWebOne(data) {
  return request({
    url: '/ctf/getWebOne',
    method: 'post',
    data
  })
}
