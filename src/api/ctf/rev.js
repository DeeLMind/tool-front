/*
 * @Author: DeeLMind DeeLMind@gmail.com
 * @Date: 2022-05-30 13:35:36
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-07-12 15:25:00
 * @FilePath: \lab\mock\api\ctf\rev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function rev(data) {
  return request({
    url: '/ctf/rev',
    method: 'post',
    data
  })
}

export function getRevOne(data) {
  return request({
    url: '/ctf/getRevOne',
    method: 'post',
    data
  })
}
