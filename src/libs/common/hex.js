
import Utils from '@/libs/utils'

/**
 * tohex调用入口
 * @param {byteArray|Uint8Array|ArrayBuffer} input
 * @param {Object[]} args
 * @returns {string}
 */
export function toHexRun(input, args) {
  let delim, comma
  if (args[0] === '0x with comma') {
    delim = '0x'
    comma = ','
  } else {
    delim = Utils.charRep(args[0] || 'Space')
  }
  const lineSize = args[1]

  return toHex(input, delim, 2, comma, lineSize)
}

/**
 * hex编码
 *
 * @param {byteArray|Uint8Array|ArrayBuffer} data
 * @param {string} [delim=" "]
 * @param {number} [padding=2]
 * @returns {string}
 *
 * @example
 * // returns "0a 14 1e"
 * toHex([10,20,30]);
 *
 * // returns "0a:14:1e"
 * toHex([10,20,30], ":");
 *
 * // returns "0x0a,0x14,0x1e"
 * toHex([10,20,30], "0x", 2, ",")
 */
export function toHex(data, delim = ' ', padding = 2, extraDelim = '', lineSize = 0) {
  if (!data) return ''
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  }
  if (typeof data === 'string') {
    data = Utils.strToByteArray(data)
  }

  let output = ''
  const prepend = (delim === '0x' || delim === '\\x')

  for (let i = 0; i < data.length; i++) {
    const hex = data[i].toString(16).padStart(padding, '0')
    output += prepend ? delim + hex : hex + delim

    if (extraDelim) {
      output += extraDelim
    }

    if ((i !== data.length - 1) && ((i + 1) % lineSize === 0)) {
      output += '\n'
    }
  }

  const rTruncLen = extraDelim.length + (prepend ? 0 : delim.length)
  if (rTruncLen) {
    return output.slice(0, -rTruncLen)
  } else {
    return output
  }
}

/**
 * hex字符串转化为字节数组
 *
 * @param {string} data
 * @param {string} [delim]
 * @param {number} [byteLen=2]
 * @returns {string}
 *
 * @example
 * // returns [10,20,30]
 * fromHex("0a 14 1e");
 *
 * // returns [10,20,30]
 * fromHex("0a:14:1e", "Colon");
 */
export function fromHex(data, delim = 'Auto', byteLen = 2) {
  if (byteLen < 1 || Math.round(byteLen) !== byteLen) {
    return ''
  }

  if (delim !== 'None') {
    const delimRegex = delim === 'Auto' ? /[^a-f\d]|(0x)/gi : Utils.regexRep(delim)
    data = data.replace(delimRegex, '')
  }

  const output = []
  for (let i = 0; i < data.length; i += byteLen) {
    output.push(parseInt(data.substr(i, byteLen), 16))
  }
  return Utils.byteArrayToUtf8(output)
}

