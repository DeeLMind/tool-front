/*
 * @Author: DeeLMind
 * @Date: 2022-03-21 21:36:04
 * @LastEditTime: 2022-03-25 12:55:21
 * @LastEditors: Please set LastEditors
 * @Description: 鼠标信息
 * @FilePath: \gkattack-front\src\store\modules\mouse.js
 */

const state = {
  position: []
}

const mutations = {
  UPDATE_POSITION: (state, data) => {
    var X = data[0]
    var Y = data[1]
    var position = X + ',' + Y
    // 大约10K
    if (state.position.length < 1000) {
      state.position.push(position)
    } else {
      state.position.shift()
      state.position.push(position)
    }
  }
}

const actions = {
  updatePosition({ commit }, data) {
    commit('UPDATE_POSITION', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

