/*
 * @Author: DeeLMind DeeLMind@gmail.com
 * @Date: 2022-06-01 14:52:18
 * @LastEditors: DeeLMind DeeLMind@gmail.com
 * @LastEditTime: 2022-06-01 14:52:47
 * @FilePath: \lab\src\api\ctf\flag.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function flag(data) {
  return request({
    url: '/ctf/flag',
    method: 'post',
    data
  })
}
