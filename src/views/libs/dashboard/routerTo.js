/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-06-11 19:32:49
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-12 16:57:59
 * @FilePath: \gkattack-front\src\libs\dashboard\routerTo.js
 * @Description: 路由跳转处理
 */

/**
 * 根据传入的任务信息跳转到不同的页面
 * @param {Object} row
 * @returns {any}
 */
export function GetRouter(row) {
  var router

  switch (row.type) {
    case 'picTrojan':
      router = {
        name: 'trojan-pic',
        params: {
          script: row.cmd,
          taskName: row.name
        }
      }
      break
    case 'winExp':
      router = {
        name: 'info-winExp',
        params: {
        }
      }
      break
  }

  return router
}
