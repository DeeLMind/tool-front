/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-07-17 15:30:16
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-07-17 16:12:34
 * @FilePath: \lab-front\src\api\docker.js
 * @Description: 开启靶场
 */
import request from '@/utils/request'

export function dockerstart(data) {
  return request({
    url: '/docker/start',
    method: 'post',
    data
  })
}

export function dockerstop(data) {
  return request({
    url: '/docker/stop',
    method: 'post',
    data
  })
}
