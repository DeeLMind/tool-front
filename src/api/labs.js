/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-12-16 10:24:29
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-16 10:25:26
 * @FilePath: \lab-front\src\api\labs.js
 * @Description:  labs接口
 */
import request from '@/utils/request'

export function getTopic(data) {
  return request({
    url: '/labs/getTopic',
    method: 'post',
    data
  })
}

export function getTopicOne(data) {
  return request({
    url: '/labs/getTopicOne',
    method: 'post',
    data
  })
}
