/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-03-25 17:19:25
 * @LastEditors: Please set LastEditors
 * @Description: gettter 配置
 * @FilePath: \gkattack-front\src\store\getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  GKF: state => state.user.GKF,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  avatar: state => state.user.avatar,
  activeName: state => state.login.activeName,
  email: state => state.login.email
}
export default getters
