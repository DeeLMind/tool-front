import Utils from '@/libs/utils'

/**
 * rot17加密
 * @param {string} data
 * @param {number} amount
 * @returns {string}
 */
export function Encrypt(data, amount) {
  data = Utils.strToByteArray(data)

  const output = data
  var chr = 0

  for (let i = 0; i < data.length; i++) {
    chr = data[i]
    if (chr >= 33 && chr <= 126) {
      chr = (chr - 33 + amount) % 94
      output[i] = chr + 33
    }
  }

  return Utils.byteArrayToChars(output)
}

/**
 * rot47加密
 * @param {string} data
 * @param {number} amount
 * @returns {string}
 */
export function Decrypt(data, amount) {
  data = Utils.strToByteArray(data)

  const output = data
  var chr = 0

  for (let i = 0; i < data.length; i++) {
    chr = data[i]
    if (chr - amount < 33) {
      output[i] = (126 - (amount - (output[i] - 33))) + 1
    } else {
      output[i] = chr - amount
    }
  }

  return Utils.byteArrayToChars(output)
}
