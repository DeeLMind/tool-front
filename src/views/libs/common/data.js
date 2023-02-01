/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-08-23 16:12:38
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-12-03 16:23:46
 * @FilePath: \gkattack-front\src\libs\common\data.js
 * @Description: 转换时间戳为字符串日期
 */

/**
 * 时间戳转换为日期（天）
 * @param {any} date - 传入时间戳日期
 * @returns {string}
 */
export function FormatDataToDay(date) {
  var year = date.getFullYear() + '-'
  var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var day = date.getDate() + ' '

  return year + month + day
}

/**
   * 时间戳转换为日期（秒）
   * @param {any} data - 传入时间戳日期
   * @returns {string}
   */
export function FormatDataToSecond(data) {
  var date = new Date(data)
  var year = date.getFullYear() + '-'
  var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var day = ('0' + date.getDate()).slice(-2) + ' '
  var hour = date.getHours() + ':'
  var minute = date.getMinutes() + ':'
  var second = date.getSeconds().toString()

  if (hour === '0:') {
    hour = '00:'
  }

  if (minute === '0:') {
    minute = '00:'
  }

  if (second === '0') {
    second = '00'
  }

  return year + month + day + hour + minute + second
}

