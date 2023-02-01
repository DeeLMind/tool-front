/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-03-14 22:01:44
 * @LastEditors: DeeLMind
 * @Description: 设置浏览器Title
 * @FilePath: \gkattack-front\src\utils\get-page-title.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '極客方舟'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
