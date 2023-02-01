import Utils from '@/libs/utils'

/**
 * base32编码
 * @param {byteArray|Uint8Array|ArrayBuffer|string} data
 * @param {string} [alphabet="A-Z2-7="]
 * @returns {string}
 */
export function Encode(data, alphabet = 'A-Z2-7=') {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  alphabet = Utils.expandAlphRange(alphabet).join('')

  let output = ''
  let chr1; let chr2; let chr3; let chr4; let chr5
  let enc1; let enc2; let enc3; let enc4; let enc5; let enc6; let enc7; let enc8
  let i = 0

  while (i < data.length) {
    chr1 = data[i++]
    chr2 = data[i++]
    chr3 = data[i++]
    chr4 = data[i++]
    chr5 = data[i++]

    enc1 = chr1 >> 3
    enc2 = ((chr1 & 7) << 2) | (chr2 >> 6)
    enc3 = (chr2 >> 1) & 31
    enc4 = ((chr2 & 1) << 4) | (chr3 >> 4)
    enc5 = ((chr3 & 15) << 1) | (chr4 >> 7)
    enc6 = (chr4 >> 2) & 31
    enc7 = ((chr4 & 3) << 3) | (chr5 >> 5)
    enc8 = chr5 & 31

    if (isNaN(chr2)) {
      enc3 = enc4 = enc5 = enc6 = enc7 = enc8 = 32
    } else if (isNaN(chr3)) {
      enc5 = enc6 = enc7 = enc8 = 32
    } else if (isNaN(chr4)) {
      enc6 = enc7 = enc8 = 32
    } else if (isNaN(chr5)) {
      enc8 = 32
    }

    output += alphabet.charAt(enc1) + alphabet.charAt(enc2) + alphabet.charAt(enc3) +
            alphabet.charAt(enc4) + alphabet.charAt(enc5) + alphabet.charAt(enc6) +
            alphabet.charAt(enc7) + alphabet.charAt(enc8)
  }
  return output
}

/**
 * base32解码
 * @param {string} data
 * @param {string} [alphabet="A-Z2-7="]
 * @param {string} [returnType="string"] - Either "string" or "byteArray"
 * @param {boolean} [removeNonAlphaChars=true]
 * @returns {byteArray}
 */
export function Decode(data, alphabet = 'A-Z2-7=', returnType = 'string', removeNonAlphaChars = true) {
  if (!data) {
    return returnType === 'string' ? '' : []
  }

  alphabet = alphabet || 'A-Z2-7='
  alphabet = Utils.expandAlphRange(alphabet).join('')

  const output = []
  let chr1; let chr2; let chr3; let chr4; let chr5
  let enc1; let enc2; let enc3; let enc4; let enc5; let enc6; let enc7; let enc8
  let i = 0

  if (removeNonAlphaChars) {
    const re = new RegExp('[^' + alphabet.replace(/[\]\\\-^]/g, '\\$&') + ']', 'g')
    data = data.replace(re, '')
  }

  while (i < data.length) {
    enc1 = alphabet.indexOf(data.charAt(i++))
    enc2 = alphabet.indexOf(data.charAt(i++) || '=')
    enc3 = alphabet.indexOf(data.charAt(i++) || '=')
    enc4 = alphabet.indexOf(data.charAt(i++) || '=')
    enc5 = alphabet.indexOf(data.charAt(i++) || '=')
    enc6 = alphabet.indexOf(data.charAt(i++) || '=')
    enc7 = alphabet.indexOf(data.charAt(i++) || '=')
    enc8 = alphabet.indexOf(data.charAt(i++) || '=')

    chr1 = (enc1 << 3) | (enc2 >> 2)
    chr2 = ((enc2 & 3) << 6) | (enc3 << 1) | (enc4 >> 4)
    chr3 = ((enc4 & 15) << 4) | (enc5 >> 1)
    chr4 = ((enc5 & 1) << 7) | (enc6 << 2) | (enc7 >> 3)
    chr5 = ((enc7 & 7) << 5) | enc8

    output.push(chr1)
    if ((enc2 & 3) !== 0 || enc3 !== 32) output.push(chr2)
    if ((enc4 & 15) !== 0 || enc5 !== 32) output.push(chr3)
    if ((enc5 & 1) !== 0 || enc6 !== 32) output.push(chr4)
    if ((enc7 & 7) !== 0 || enc8 !== 32) output.push(chr5)
  }

  return returnType === 'string' ? Utils.byteArrayToUtf8(output) : output
}

