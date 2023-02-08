/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2023-02-06 15:25:06
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2023-02-07 11:11:18
 * @FilePath: \tool-front\src\libs\tool\convert.js
 * @Description: 进制转换函数
 */
/**
 * 进制转换
 * @param {string} data
 * @param {number} srcb
 * @param {number} destb
 * @returns {string}
 * https://gist.github.com/antimatter15/2bf0fcf5b924b4387174d5f84f35277c
 * **/
export function Convert(data, srcb, destb) {
  // eslint-disable-next-line no-undef
  var tempdata = 0n
  var digits = []

  const result = []

  // 检测参数是否在指定范围内
  if (srcb === destb || !checkRadixRange(srcb) || !checkRadixRange(destb)) {
    return data
  }

  // eslint-disable-next-line no-undef
  srcb = BigInt(srcb)
  // eslint-disable-next-line no-undef
  destb = BigInt(destb)

  // 转换为十进制
  for (let i = 0; i < data.length; i++) {
    tempdata = tempdata * srcb
    tempdata = tempdata + transformCharToNum(data.charAt(i))
  }

  if (destb === 10) {
    return tempdata.toString()
  } else {
    digits = tempdata.toString().split('')
  }

  // 十进制转换为对应进制
  let val = 0n
  for (let i = 0; i < digits.length; i++) {
    // eslint-disable-next-line no-undef
    val = val * 10n + BigInt(digits[i])
  }
  while (val !== 0n) {
    result.unshift(Number(val % destb))
    val = val / destb
  }

  // 结果转换为对应进制数据
  for (let i = 0; i < result.length; i++) {
    result[i] = transformNumToChar(result[i])
  }

  return result.join('')
}

/**
 * 检测进制范围是否在指定范围内
 * @param {number} radix
 * @returns {boolean}
 *  * **/
function checkRadixRange(radix) {
  return radix >= 2 && radix <= 62
}

/**
 * 转换字符为数值
 * @param {string} char
 * @returns {bigint}
 * **/
function transformCharToNum(char) {
  if (char >= '0' && char <= '9') {
    // eslint-disable-next-line no-undef
    return BigInt(char.charCodeAt() - '0'.charCodeAt())
  } else if (char >= 'a' && char <= 'z') {
    // eslint-disable-next-line no-undef
    return BigInt((char.charCodeAt() - 'a'.charCodeAt()) + 10)
  } else if (char >= 'A' && char <= 'Z') {
    // eslint-disable-next-line no-undef
    return BigInt((char.charCodeAt() - 'A'.charCodeAt()) + 36)
  } else {
    // eslint-disable-next-line no-undef
    return BigInt(0)
  }
}

/**
 * 转换数值转换为字符
 * @param {number} num
 * @returns {string}
 * **/
function transformNumToChar(num) {
  var transformTable = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return transformTable[num]
}
