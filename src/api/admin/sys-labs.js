/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-12-16 15:46:19
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-16 15:46:39
 * @FilePath: \lab-front\src\api\admin\sys-labs.js
 * @Description: 管理员labs题目管理接口
 */
import request from '@/utils/request'

export function getTopicInfo(data) {
  return request({
    url: '/sys-labs/getTopicInfo',
    method: 'post',
    data
  })
}

export function deleteTopic(data) {
  return request({
    url: '/sys-labs/deleteTopic',
    method: 'post',
    data
  })
}

export function createTopic(data) {
  return request({
    url: '/sys-labs/createTopic',
    method: 'post',
    data
  })
}

export function updateTopic(data) {
  return request({
    url: '/sys-labs/updateTopic',
    method: 'post',
    data
  })
}

