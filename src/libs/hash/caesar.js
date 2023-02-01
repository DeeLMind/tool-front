import Utils from '@/libs/utils'

/**
 * caesar加密
 * @param {string} data
 * @param {number} offset
 * @returns {string}
 */
export function Encrypt(data, offset) {
  data = Utils.strToByteArray(data)

  const output = data
  var chr = 0

  for (let i = 0; i < data.length; i++) {
    chr = data[i]
    if (chr >= 65 && chr <= 90) {
      chr = (chr - 65 + offset) % 26
      output[i] = chr + 65
    } else if (chr >= 97 && chr <= 122) {
      chr = (chr - 97 + offset) % 26
      output[i] = chr + 97
    }
  }

  return Utils.byteArrayToChars(output)
}

/**
 * caesar解密
 * @param {string} data
 * @param {number} offset
 * @returns {string}
 */
export function Decrypt(data, offset) {
  data = Utils.strToByteArray(data)

  const output = data

  var chr = 0

  for (let i = 0; i < data.length; i++) {
    chr = data[i]
    if (chr >= 65 && chr <= 90) {
      const numberAmount = offset % 26
      if (chr - numberAmount < 65) {
        output[i] = (90 - (numberAmount - (output[i] - 65))) + 1
      } else {
        output[i] = chr - numberAmount
      }
    } else if (chr >= 97 && chr <= 122) {
      const numberAmount = offset % 26
      if (chr - numberAmount < 97) {
        output[i] = (122 - (numberAmount - (output[i] - 97))) + 1
      } else {
        output[i] = chr - numberAmount
      }
    }
  }

  return Utils.byteArrayToChars(output)
}
