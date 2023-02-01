import Utils from '@/libs/utils'

/**
 * base16编码
 * @param {byteArray|Uint8Array|ArrayBuffer|string} data
 * @param {string} [alphabet="0-9A-F"]
 * @returns {string}
 */
export function Encode(data, alphabet = '0-9A-F') {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  alphabet = Utils.expandAlphRange(alphabet).join('')

  let output = ''
  let chr1
  let enc1; let enc2
  let i = 0

  while (i < data.length) {
    chr1 = data[i++]

    enc1 = chr1 >> 4
    enc2 = chr1 & 15

    output += alphabet.charAt(enc1) + alphabet.charAt(enc2)
  }

  return output
}

/**
 * base16解码
 * @param {string} data
 * @param {string} [alphabet="0-9A-F"]
 * @param {string} [returnType="string"] - Either "string" or "byteArray"
 * @param {boolean} [removeNonAlphaChars=true]
 * @returns {byteArray}
 */
export function Decode(data, alphabet = '0-9A-F', returnType = 'string', removeNonAlphaChars = true) {
  if (!data) {
    return returnType === 'string' ? '' : []
  }

  alphabet = alphabet || '0-9A-F'
  alphabet = Utils.expandAlphRange(alphabet).join('')

  if (removeNonAlphaChars) {
    const re = new RegExp('[^' + alphabet.replace(/[[\]\\\-^$]/g, '\\$&') + ']', 'g')
    data = data.replace(re, '')
  }

  const output = []
  let chr1
  let enc1; let enc2
  let i = 0

  while (i < data.length) {
    enc1 = alphabet.indexOf(data.charAt(i++))
    enc2 = alphabet.indexOf(data.charAt(i++))

    chr1 = (enc1 << 4) | enc2

    output.push(chr1)
  }
  return returnType === 'string' ? Utils.byteArrayToUtf8(output) : output
}

