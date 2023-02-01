import Utils from '@/libs/utils'

/**
 * base64编码
 * @param {byteArray|Uint8Array|ArrayBuffer|string} data
 * @param {string} [alphabet="A-Za-z0-9+/="]
 * @returns {string}
 *
 * @example
 * // returns "SGVsbG8="
 * Encode([72, 101, 108, 108, 111]);
 *
 * // returns "SGVsbG8="
 * Encode("Hello");
 */
export function Encode(data, alphabet = 'A-Za-z0-9+/=') {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  alphabet = Utils.expandAlphRange(alphabet).join('')

  let output = ''
  let chr1; let chr2; let chr3
  let enc1; let enc2; let enc3; let enc4
  let i = 0

  while (i < data.length) {
    chr1 = data[i++]
    chr2 = data[i++]
    chr3 = data[i++]

    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63

    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }

    output += alphabet.charAt(enc1) + alphabet.charAt(enc2) +
            alphabet.charAt(enc3) + alphabet.charAt(enc4)
  }
  return output
}

/**
 * base64解码
 * @param {string} data
 * @param {string} [alphabet="A-Za-z0-9+/="]
 * @param {string} [returnType="string"] - Either "string" or "byteArray"
 * @param {boolean} [removeNonAlphaChars=true]
 * @returns {byteArray}
 *
 * @example
 * // returns "Hello"
 * Decode("SGVsbG8=");
 *
 * // returns [72, 101, 108, 108, 111]
 * Decode("SGVsbG8=", null, "byteArray");
 */
export function Decode(data, alphabet = 'A-Za-z0-9+/=', returnType = 'string', removeNonAlphaChars = true) {
  if (!data) {
    return returnType === 'string' ? '' : []
  }

  alphabet = alphabet || 'A-Za-z0-9+/='
  alphabet = Utils.expandAlphRange(alphabet).join('')

  const output = []
  let chr1; let chr2; let chr3
  let enc1; let enc2; let enc3; let enc4
  let i = 0

  if (removeNonAlphaChars) {
    const re = new RegExp('[^' + alphabet.replace(/[[\]\\\-^$]/g, '\\$&') + ']', 'g')
    data = data.replace(re, '')
  }

  while (i < data.length) {
    enc1 = alphabet.indexOf(data.charAt(i++))
    enc2 = alphabet.indexOf(data.charAt(i++) || '=')
    enc3 = alphabet.indexOf(data.charAt(i++) || '=')
    enc4 = alphabet.indexOf(data.charAt(i++) || '=')

    enc2 = enc2 === -1 ? 64 : enc2
    enc3 = enc3 === -1 ? 64 : enc3
    enc4 = enc4 === -1 ? 64 : enc4

    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4

    output.push(chr1)

    if (enc3 !== 64) {
      output.push(chr2)
    }
    if (enc4 !== 64) {
      output.push(chr3)
    }
  }
  return returnType === 'string' ? Utils.byteArrayToUtf8(output) : output
}
