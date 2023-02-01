/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-13 15:41:07
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-06 17:00:19
 * @FilePath: \lab-front\src\api\admin\sys-user.js
 * @Description: 管理员用户管理接口
 */

import request from '@/utils/request'

export function createUser(data) {
  return request({
    url: '/sys-user/createUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/sys-user/updateUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/sys-user/deleteUser',
    method: 'post',
    data
  })
}

export function searchUser(data) {
  return request({
    url: '/sys-user/searchUser',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/sys-user/getUserInfo',
    method: 'post',
    data
  })
}

export function getUserTasksInfo(data) {
  return request({
    url: '/sys-user/getUserTasksInfo',
    method: 'post',
    data
  })
}

export function deleteUserTasks(data) {
  return request({
    url: '/sys-user/deleteUserTasks',
    method: 'post',
    data
  })
}

export function getUserTaskOverInfo(data) {
  return request({
    url: '/sys-user/getUserTaskOverInfo',
    method: 'post',
    data
  })
}
