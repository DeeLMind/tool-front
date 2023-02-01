import Utils from '@/libs/utils'

/**
 * base85编码
 * @param {byteArray|Uint8Array|ArrayBuffer|string} data
 * @param {string}
 * @returns {string}
 */
export function Encode(data, alphabet = '!-u') {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  alphabet = Utils.expandAlphRange(alphabet).join('')
  const includeDelim = false
  let result = ''

  // eslint-disable-next-line no-unused-vars
  let block
  for (let i = 0; i < data.length; i += 4) {
    block = (
      ((data[i]) << 24) +
          ((data[i + 1] || 0) << 16) +
          ((data[i + 2] || 0) << 8) +
          ((data[i + 3] || 0))
    ) >>> 0

    if (block > 0) {
      let digits = []
      for (let j = 0; j < 5; j++) {
        digits.push(block % 85)
        block = Math.floor(block / 85)
      }

      digits = digits.reverse()

      if (data.length < i + 4) {
        digits.splice(data.length - (i + 4), 4)
      }

      result += digits.map(digit => alphabet[digit]).join('')
    } else {
      result += 'z'
    }
  }

  return includeDelim ? `<~${result}~>` : result
}

/**
 * base85解码
 * @param {string} data
 * @param {string} '!-u'
 * @param {string} [returnType="string"] - Either "string" or "byteArray"
 * @param {boolean} [removeNonAlphaChars=true]
 * @returns {byteArray}
 */
export function Decode(data, alphabet = '!-u', returnType = 'string', removeNonAlphaChars = true) {
  if (!data) {
    return returnType === 'string' ? '' : []
  }

  alphabet = Utils.expandAlphRange(alphabet).join('')
  const output = []

  const matches = data.match(/<~(.+?)~>/)
  if (matches !== null) data = matches[1]

  let i = 0
  let block, blockBytes

  while (i < data.length) {
    if (data[i] === 'z') {
      output.push(0, 0, 0, 0)
      i++
    } else {
      let digits = []
      digits = data
        .substr(i, 5)
        .split('')
        .map((chr, idx) => {
          const digit = alphabet.indexOf(chr)
          if (digit < 0 || digit > 84) {
            return returnType === 'string' ? '' : []
          }
          return digit
        })

      block =
              digits[0] * 52200625 +
              digits[1] * 614125 +
              (i + 2 < data.length ? digits[2] : 84) * 7225 +
              (i + 3 < data.length ? digits[3] : 84) * 85 +
              (i + 4 < data.length ? digits[4] : 84)

      blockBytes = [
        (block >> 24) & 0xff,
        (block >> 16) & 0xff,
        (block >> 8) & 0xff,
        block & 0xff
      ]

      if (data.length < i + 5) {
        blockBytes.splice(data.length - (i + 5), 5)
      }

      output.push.apply(output, blockBytes)
      i += 5
    }
  }

  return returnType === 'string' ? Utils.byteArrayToUtf8(output) : output
}
