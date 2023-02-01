/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-07-08 11:36:38
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: 路由跳转权限控制
 * @FilePath: \gkattack-front\src\permission.js
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // feat(DeeLMind):获取JWT Token
  const hasToken = getToken()
  // console.log('to', to)
  // console.log('from', from)
  if (hasToken) {
    if (to.path === '/login') {
      // console.log('logingggg')
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // console.log('has token')
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0 && store.getters.roles[0] !== 'guest' // 修改动态路由刷新空白
      if (hasRoles) {
        // console.log(store.getters.roles[0])
        const { roles } = await store.dispatch('user/getInfo')
        // console.log(roles)
        const user = roles[0]

        const users = to['matched'][0]['meta']['roles']

        if (users.includes(user)) {
          next()
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          await store.dispatch('tagsView/updateVisitedView', store.getters.permission_routes)
        } else {
          Message({
            message: '权限不足',
            type: 'error',
            duration: 2 * 1000,
            customClass: 'geekMsg'
          })
          NProgress.done()
          // next({path:from.path})
        }
      } else {
        try {
          // get user info
          // console.log('try')
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message({
            message: error || 'Has Error',
            type: 'error',
            duration: 2 * 1000,
            customClass: 'geekMsg'
          })

          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // // fix(DeeLMind):修复退出，登录界面浏览器回退死循环

    if (from.path.includes('login')) {
      next()
    } else {
      const users = to['matched'][0]['meta']['roles']
      // fix(DeeLMind):只有admin才可以添加管理路由,默认guest用户
      const roles = ['guest']
      // fix(DeeLMind):前端权限控制，guest,user,admin
      const user = roles[0]
      try {
        if (users.includes(user)) {
          next()
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
        } else {
          Message({
            message: '权限不足',
            type: 'error',
            duration: 2 * 1000,
            customClass: 'geekMsg'
          })
          NProgress.done()
        // next({ path: from.path })
        }
      } catch {
        next()
        // console.log('catch')
        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
