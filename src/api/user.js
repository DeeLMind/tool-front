/*
 * @Author: QKSword
 * @Date: 2022-02-25 10:39:59
 * @LastEditTime: 2022-08-14 14:39:07
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: 用户操作数据接口
 * @FilePath: \gkattack-front\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}

// 用户注册接口
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// 发送邮件验证码接口
export function emailcaptcha(data) {
  return request({
    url: '/email',
    method: 'post',
    data
  })
}

// 发送图片验证码接口
export function imagecaptcha() {
  return request({
    url: '/captcha',
    method: 'post'
  })
}

// 更新用户图片接口
export function updateavatar(data) {
  return request({
    url: '/user/updateAvatar',
    method: 'post',
    data
  })
}

export function getTaskOne(data) {
  return request({
    url: '/user/getTaskOne',
    method: 'post',
    data
  })
}
