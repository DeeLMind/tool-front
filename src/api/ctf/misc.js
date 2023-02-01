/*
 * @Author: DeeLMind DeeLMind@gmail.com
 * @Date: 2022-05-30 13:35:41
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-07-31 15:10:06
 * @FilePath: \lab\mock\api\ctf\misc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function misc(data) {
  return request({
    url: '/ctf/misc',
    method: 'post',
    data
  })
}

export function getMiscOne(data) {
  return request({
    url: '/ctf/getMiscOne',
    method: 'post',
    data
  })
}
