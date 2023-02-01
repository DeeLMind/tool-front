/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-12-13 10:49:35
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: Axios请求接口拦截请求，响应处理
 * @FilePath: \gkattack-front\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar

// var load

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.GKF) {
      // 登录后，请求接口JWT鉴权
      config.headers['Authorization'] = 'GKF ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 20000 代表请求成功
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
        customClass: 'geekMsg'
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 20005 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('Token已过期，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          type: 'warning',
          customClass: 'dark-msgbox'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      if (res.code === 20006) {
        MessageBox.confirm('用户已在其他设备登录', '提示', {
          confirmButtonText: '重新登录',
          type: 'warning',
          customClass: 'dark-msgbox'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '服务器连接失败',
      type: 'error',
      duration: 3 * 1000,
      customClass: 'geekMsg'
    })
    NProgress.done()
    return Promise.reject(error)
  }
)

export default service
