/*
 * @Author: QKSword
 * @Date: 2022-03-17 16:41:42
 * @LastEditTime: 2022-03-25 17:18:35
 * @LastEditors: Please set LastEditors
 * @Description: 注册登录存储信息
 * @FilePath: \gkattack-front\src\store\modules\tabs.js
 */

const state = {
  activeName: '', // tabs显示的页面
  email: ''
}

const mutations = {
  SET_ACTIVENAME: (state, activeName) => {
    state.activeName = activeName
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  }

}

const actions = {

  login({ commit }, email) {
    return new Promise(resolve => {
      commit('SET_ACTIVENAME', 'userlogin')
      commit('SET_EMAIL', email)

      resolve()
    })
  },

  register({ commit }) {
    return new Promise(resolve => {
      commit('SET_ACTIVENAME', 'userreg')

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
