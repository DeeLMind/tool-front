/*
 * @Author: DeeLMind
 * @Date: 2022-02-16 10:33:43
 * @LastEditTime: 2022-03-18 17:39:56
 * @LastEditors: Please set LastEditors
 * @Description: Token存储在LocalStorege（可能被XSS，不是我们的问题），不存储在Cookie中，日后有需求可以修改。
 * @FilePath: \gkattack-front\src\utils\auth.js
 */

// JWT Token Key
const TokenKey = 'GKF'

export function getToken() {
  return localStorage.getItem(TokenKey)
  // return Cookies.get(TokenKey)
}

// 设置jwt-cookie的安全属性
export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token, { sameSite: 'strict', secure: true })
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
  // return Cookies.remove(TokenKey)
}
