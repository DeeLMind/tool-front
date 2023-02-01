import Utils from '@/libs/utils'

/**
 * base62编码
 * @param {byteArray|Uint8Array|ArrayBuffer|string} data
 * @param {string} [alphabet="0-9A-Za-z"]
 * @returns {string}
 */
export function Encode(data, alphabet = '0-9A-Za-z') {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  alphabet = Utils.expandAlphRange(alphabet).join('')

  var bs62 = require('base-x')(alphabet)

  return bs62.encode(data)
}

/**
 * base62解码
 * @param {string} data
 * @param {string} [alphabet="0-9A-Za-z"]
 * @param {string} [returnType="string"] - Either "string" or "byteArray"
 * @param {boolean} [removeNonAlphaChars=true]
 * @returns {byteArray}
 */
export function Decode(data, alphabet = '0-9A-Za-z', returnType = 'string', removeNonAlphaChars = true) {
  if (!data) {
    return returnType === 'string' ? '' : []
  }

  alphabet = alphabet || '0-9A-Za-z'
  alphabet = Utils.expandAlphRange(alphabet).join('')

  if (removeNonAlphaChars) {
    const re = new RegExp('[^' + alphabet.replace(/[[\]\\\-^$]/g, '\\$&') + ']', 'g')
    data = data.replace(re, '')
  }

  var bs62 = require('base-x')(alphabet)

  return Utils.byteArrayToUtf8(bs62.decode(data))
}
