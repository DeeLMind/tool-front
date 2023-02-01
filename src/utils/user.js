/*
 * @Author: DeeLMind
 * @Date: 2022-03-21 10:01:12
 * @LastEditTime: 2022-03-21 10:24:19
 * @LastEditors: Please set LastEditors
 * @Description: 设置用户
 * @FilePath: \gkattack-front\src\utils\user.js
 */

const name = 'name'

export function getName() {
  return localStorage.getItem(name)
}

// 设置jwt-cookie的安全属性
export function setName(value) {
  localStorage.setItem(name, value)
}

export function removeName() {
  localStorage.removeItem(name)
}
