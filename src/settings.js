/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-03-25 15:48:22
 * @LastEditors: Please set LastEditors
 * @Description: 全局配置文件
 * @FilePath: \gkattack-front\src\settings.js
 */
module.exports = {
  title: '極客方舟工具平台',

  /**
   * @type {boolean} true | false
   * @description 切换TAB页面按钮是否开启
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定TAB页面
   */
  fixedHeader: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
