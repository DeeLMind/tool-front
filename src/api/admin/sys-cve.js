/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-12-15 15:48:21
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-15 15:48:48
 * @FilePath: \lab-front\src\api\admin\sys-cve.js
 * @Description: 管理员cve题目管理接口
 */

import request from '@/utils/request'

export function getTopicInfo(data) {
  return request({
    url: '/sys-cve/getTopicInfo',
    method: 'post',
    data
  })
}

export function deleteTopic(data) {
  return request({
    url: '/sys-cve/deleteTopic',
    method: 'post',
    data
  })
}

export function createTopic(data) {
  return request({
    url: '/sys-cve/createTopic',
    method: 'post',
    data
  })
}

export function updateTopic(data) {
  return request({
    url: '/sys-cve/updateTopic',
    method: 'post',
    data
  })
}

