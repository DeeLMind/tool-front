/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-12-16 10:00:05
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: 路由配置
 * @FilePath: \gkattack-front\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { roles: ['admin', 'user', 'guest'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true, keepAlive: true }
      }
    ]
  },
  {
    path: '/hash',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Hash',
    meta: {
      title: '编码解码',
      icon: 'hash',
      roles: ['guest', 'admin', 'user']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/hash/index'),
        name: 'Normal',
        meta: { title: '常用编码', noCache: true, keepAlive: true }
      },
      {
        path: 'ctf',
        component: () => import('@/views/hash/ctf'),
        name: 'Ctf',
        meta: { title: 'CTF编码', noCache: true, keepAlive: true }
      },
      {
        path: 'base',
        component: () => import('@/views/hash/base'),
        name: 'Base',
        meta: { title: 'BASE系列', noCache: true, keepAlive: true }
      },
      {
        path: 'hash',
        component: () => import('@/views/hash/hash'),
        name: 'HashHash',
        meta: { title: 'HASH系列', noCache: true, keepAlive: true }
      },
      {
        path: 'jwt',
        component: () => import('@/views/hash/jwt'),
        name: 'Jwt',
        meta: { title: 'JWT编解码', noCache: true, keepAlive: true }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.deelmind.com/',
        meta: { title: '帮助文档', icon: 'link', roles: ['guest', 'admin', 'user'] }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/dashboard', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
