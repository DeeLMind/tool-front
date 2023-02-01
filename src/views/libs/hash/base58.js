import Utils from '@/libs/utils'

/**
 * base58编码
 * @param {byteArray|Uint8Array|ArrayBuffer|string} data
 * @param {string} alphabet
 * @returns {string}
 */
export function Encode(data, alphabet) {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  let output = [0]

  let zeroPrefix = 0
  for (let i = 0; i < data.length && data[i] === 0; i++) {
    zeroPrefix++
  }

  data.forEach(function(b) {
    let carry = (output[0] << 8) + b
    output[0] = carry % 58
    carry = (carry / 58) | 0

    for (let i = 1; i < output.length; i++) {
      carry += output[i] << 8
      output[i] = carry % 58
      carry = (carry / 58) | 0
    }

    while (carry > 0) {
      output.push(carry % 58)
      carry = (carry / 58) | 0
    }
  })

  output = output.map(function(b) {
    return alphabet[b]
  }).reverse().join('')

  while (zeroPrefix--) {
    output = alphabet[0] + output
  }

  return output
}

/**
 * base58解码
 * @param {string} data
 * @param {string} alphabet
 * @param {string} [returnType="string"] - Either "string" or "byteArray"
 * @param {boolean} [removeNonAlphaChars=true]
 * @returns {byteArray}
 */
export function Decode(data, alphabet, returnType = 'string', removeNonAlphaChars = true) {
  if (!data) {
    return returnType === 'string' ? '' : []
  }

  const output = [0]
  let zeroPrefix = 0
  for (let i = 0; i < data.length && data[i] === alphabet[0]; i++) {
    zeroPrefix++
  }

  [].forEach.call(data, function(c, charIndex) {
    const index = alphabet.indexOf(c)

    if (index === -1) {
      if (removeNonAlphaChars) {
        return
      }
    }

    let carry = output[0] * 58 + index
    output[0] = carry & 0xFF
    carry = carry >> 8

    for (let i = 1; i < output.length; i++) {
      carry += output[i] * 58
      output[i] = carry & 0xFF
      carry = carry >> 8
    }

    while (carry > 0) {
      output.push(carry & 0xFF)
      carry = carry >> 8
    }
  })

  while (zeroPrefix--) {
    output.push(0)
  }
  return returnType === 'string' ? Utils.byteArrayToUtf8(output.reverse()) : output.reverse()
}

