/*
 * @Author: DeeLMind DeeLMind@gmail.com
 * @Date: 2022-06-02 13:37:23
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-16 10:25:00
 * @FilePath: \lab\src\api\cve.js
 * @Description: cve接口
 */
import request from '@/utils/request'

export function getTopic(data) {
  return request({
    url: '/cve/getTopic',
    method: 'post',
    data
  })
}

export function getTopicOne(data) {
  return request({
    url: '/cve/getTopicOne',
    method: 'post',
    data
  })
}
