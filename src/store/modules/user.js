/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-07-08 10:55:51
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: 用户存储配置
 * @FilePath: \gkattack-front\src\store\modules\user.js
 */
import { login, logout, getInfo, updateavatar } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getName, removeName } from '@/utils/user'

import { resetRouter } from '@/router'

import logo from '@/assets/logo/geek.js'

const state = {
  GKF: getToken(),
  name: getName(),
  roles: ['guest'],
  avatar: logo.avatar,
  email: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.GKF = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const data = response.data

        if (data.error === '') {
          // feat(DeeLMind):设置JWT Token
          if (data.GKF !== '') {
            setToken(data.GKF)
            commit('SET_TOKEN', data.GKF)
          }
        }

        resolve(data.error)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 获取当前用户的信息
      getInfo(state.name).then(response => {
        // console.log(state.name)
        const data = response.data
        if (data.error !== '') {
          reject(data.error)
        }

        // feat(QKSword):修改用户名
        commit('SET_NAME', data.info.name)

        // feat(DeeLMind):设置头像store
        if (data.info.avatar === '') {
          commit('SET_AVATAR', logo.avatar)
        } else {
          commit('SET_AVATAR', data.info.avatar)
        }

        // feat(DeeLMind):设置角色store
        commit('SET_ROLES', data.info.roles)

        // feat(DeeLMind):设置email store
        commit('SET_EMAIL', data.info.email)

        resolve(data.info)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, dispatch }, mouseInfo) {
    return new Promise((resolve, reject) => {
      // 退出当前用户
      logout(mouseInfo).then(() => {
        commit('SET_TOKEN', '')

        // feat(DeeLMind):设置头像store为空
        commit('SET_AVATAR', '')

        // feat(DeeLMind):设置角色store为,guest
        commit('SET_ROLES', ['guest'])

        // feat(DeeLMind):设置权限store为空
        commit('SET_PERMISSION', '-1')

        // feat(DeeLMind):设置email store为空
        commit('SET_EMAIL', '')

        removeToken()
        removeName()

        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logoutOffine({ commit, dispatch }) {
    commit('SET_TOKEN', '')

    // feat(DeeLMind):设置头像store为空
    commit('SET_AVATAR', '')

    // feat(DeeLMind):设置角色store为,guest
    commit('SET_ROLES', ['guest'])

    // feat(DeeLMind):设置权限store为空
    commit('SET_PERMISSION', '-1')

    // feat(DeeLMind):设置email store为空
    commit('SET_EMAIL', '')

    removeToken()
    removeName()

    resetRouter()

    // reset visited views and cached views
    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // feat(QKSword):更新用户图片action
  updateAvatar({ commit }, avatar) {
    return new Promise((resolve, reject) => {
      updateavatar(avatar).then(response => {
        const data = response.data
        console.log(data)
        if (data.error === '') {
          // feat(DeeLMind):设置头像store为空
          console.log(data.avatar)
          commit('SET_AVATAR', data.avatar)
          // commit('SET_AVATAR', avatar)
        }

        // data.avatar = avatar
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
