/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-03-25 15:48:13
 * @LastEditors: Please set LastEditors
 * @Description: 全局配置
 * @FilePath: \gkattack-front\src\store\modules\settings.js
 */
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { tagsView, fixedHeader } = defaultSettings

const state = {
  theme: variables.theme,
  tagsView: tagsView,
  fixedHeader: fixedHeader
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

