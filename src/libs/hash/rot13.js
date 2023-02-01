import Utils from '@/libs/utils'

/**
 * rot13加密
 * @param {string} data
 * @param {Object[]} args
 * @returns {string}
 */
export function Encrypt(data, args) {
  data = Utils.strToByteArray(data)

  const output = data
  const rot13Lowercase = args[0]
  const rot13Upperacse = args[0]
  const rotNumbers = args[1]
  const amount = args[2]
  var chr = 0

  if (amount) {
    for (let i = 0; i < data.length; i++) {
      chr = data[i]
      if (rot13Upperacse && chr >= 65 && chr <= 90) {
        chr = (chr - 65 + amount) % 26
        output[i] = chr + 65
      } else if (rot13Lowercase && chr >= 97 && chr <= 122) {
        chr = (chr - 97 + amount) % 26
        output[i] = chr + 97
      } else if (rotNumbers && chr >= 48 && chr <= 57) {
        chr = (chr - 48 + amount) % 10
        output[i] = chr + 48
      }
    }
  }

  return Utils.byteArrayToChars(output)
}

/**
 * rot13解密
 * @param {string} data
 * @param {Object[]} args
 * @returns {string}
 */
export function Decrypt(data, args) {
  data = Utils.strToByteArray(data)

  const output = data
  const rot13Lowercase = args[0]
  const rot13Upperacse = args[0]
  const rotNumbers = args[1]
  const amount = args[2]
  var chr = 0

  if (amount) {
    for (let i = 0; i < data.length; i++) {
      chr = data[i]
      if (rot13Upperacse && chr >= 65 && chr <= 90) {
        const numberAmount = amount % 26
        if (chr - numberAmount < 65) {
          output[i] = (90 - (numberAmount - (output[i] - 65))) + 1
        } else {
          output[i] = chr - numberAmount
        }
      } else if (rot13Lowercase && chr >= 97 && chr <= 122) {
        const numberAmount = amount % 26
        if (chr - numberAmount < 97) {
          output[i] = (122 - (numberAmount - (output[i] - 97))) + 1
        } else {
          output[i] = chr - numberAmount
        }
      } else if (rotNumbers && chr >= 48 && chr <= 57) {
        const numberAmount = amount % 10
        if (chr - numberAmount < 48) {
          output[i] = (57 - (numberAmount - (output[i] - 48))) + 1
        } else {
          output[i] = chr - numberAmount
        }
      }
    }
  }

  return Utils.byteArrayToChars(output)
}
