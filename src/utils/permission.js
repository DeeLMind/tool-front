import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    var roles = store.getters && store.getters.roles

    // 解决右上角注册登录按钮在guest角色下无法显示的问题
    if (roles.length === 0) {
      roles = ['guest']
    }

    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin']"`)
    return false
  }
}
