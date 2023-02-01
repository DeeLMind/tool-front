/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-12 09:54:02
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-15 16:24:24
 * @FilePath: \lab-front\src\api\admin\sys.ctf.js
 * @Description: 管理员ctf题目管理接口
 */

import request from '@/utils/request'

export function getTopicInfo(data) {
  return request({
    url: '/sys-ctf/getTopicInfo',
    method: 'post',
    data
  })
}

export function deleteTopic(data) {
  return request({
    url: '/sys-ctf/deleteTopic',
    method: 'post',
    data
  })
}

export function createTopic(data) {
  return request({
    url: '/sys-ctf/createTopic',
    method: 'post',
    data
  })
}

export function updateTopic(data) {
  return request({
    url: '/sys-ctf/updateTopic',
    method: 'post',
    data
  })
}
