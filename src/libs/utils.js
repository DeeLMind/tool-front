/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import * as base64Func from '@/libs/hash/base64'
import utf8 from 'utf8'
import { fromHex } from '@/libs/common/hex'
import { fromBinary } from '@/libs/common/binary'
import { fromDecimal } from '@/libs/common/decimal'

class Utils {
/**
 * 将数字转换为字符
 *
 * @param {number} o
 * @returns {char}
 *
 * @example
 * // returns 'a'
 * chr(97);
 */
  static chr(o) {
    // Detect astral symbols
    // Thanks to @mathiasbynens for this solution
    // https://mathiasbynens.be/notes/javascript-unicode
    if (o > 0xffff) {
      o -= 0x10000
      const high = String.fromCharCode(o >>> 10 & 0x3ff | 0xd800)
      o = 0xdc00 | o & 0x3ff
      return high + String.fromCharCode(o)
    }

    return String.fromCharCode(o)
  }

  /**
 * 把字符转换为数字
 *
 * @param {char} c
 * @returns {number}
 *
 * @example
 * // returns 97
 * Utils.ord('a');
 */
  static ord(c) {
    // Detect astral symbols
    // Thanks to @mathiasbynens for this solution
    // https://mathiasbynens.be/notes/javascript-unicode
    if (c.length === 2) {
      const high = c.charCodeAt(0)
      const low = c.charCodeAt(1)
      if (high >= 0xd800 && high < 0xdc00 &&
        low >= 0xdc00 && low < 0xe000) {
        return (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000
      }
    }

    return c.charCodeAt(0)
  }

  /**
 * Converts a string to a byte array.
 * Treats the string as UTF-8 if any values are over 255.
 *
 * @param {string} str
 * @returns {byteArray}
 *
 * @example
 * // returns [72,101,108,108,111]
 * Utils.strToByteArray("Hello");
 *
 * // returns [228,189,160,229,165,189]
 * Utils.strToByteArray("你好");
 */
  static strToByteArray(str) {
    const byteArray = new Array(str.length)
    let i = str.length; let b
    while (i--) {
      b = str.charCodeAt(i)
      byteArray[i] = b
      // If any of the bytes are over 255, read as UTF-8
      if (b > 255) return Utils.strToUtf8ByteArray(str)
    }
    return byteArray
  }

  /**
 * Converts a string to a UTF-8 byte array.
 *
 * @param {string} str
 * @returns {byteArray}
 *
 * @example
 * // returns [72,101,108,108,111]
 * Utils.strToUtf8ByteArray("Hello");
 *
 * // returns [228,189,160,229,165,189]
 * Utils.strToUtf8ByteArray("你好");
 */
  static strToUtf8ByteArray(str) {
    const utf8Str = utf8.encode(str)

    return Utils.strToByteArray(utf8Str)
  }

  /**
 * 将字母范围字符串扩展为该范围内的字符列表
 *
 * @param {string} alphStr
 * @returns {char[]}
 *
 * @example
 * // returns ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
 * Utils.expandAlphRange("0-9");
 *
 * // returns ["a", "b", "c", "d", "0", "1", "2", "3", "+", "/"]
 * Utils.expandAlphRange("a-d0-3+/");
 *
 * // returns ["a", "b", "c", "d", "0", "-", "3"]
 * Utils.expandAlphRange("a-d0\\-3")
 */
  static expandAlphRange(alphStr) {
    const alphArr = []

    for (let i = 0; i < alphStr.length; i++) {
      if (i < alphStr.length - 2 &&
            alphStr[i + 1] === '-' &&
            alphStr[i] !== '\\') {
        const start = Utils.ord(alphStr[i])
        const end = Utils.ord(alphStr[i + 2])

        for (let j = start; j <= end; j++) {
          alphArr.push(Utils.chr(j))
        }
        i += 2
      } else if (i < alphStr.length - 2 &&
            alphStr[i] === '\\' &&
            alphStr[i + 1] === '-') {
        alphArr.push('-')
        i++
      } else {
        alphArr.push(alphStr[i])
      }
    }
    return alphArr
  }

  /**
 * Attempts to convert a byte array to a UTF-8 string.
 *
 * @param {byteArray|Uint8Array} byteArray
 * @returns {string}
 *
 * @example
 * // returns "Hello"
 * Utils.byteArrayToUtf8([72,101,108,108,111]);
 *
 * // returns "你好"
 * Utils.byteArrayToUtf8([228,189,160,229,165,189]);
 */
  static byteArrayToUtf8(byteArray) {
    const str = Utils.byteArrayToChars(byteArray)
    try {
      const utf8Str = utf8.decode(str)
      return utf8Str
    } catch (err) {
      // If it fails, treat it as ANSI
      return str
    }
  }

  /**
 * Converts a charcode array to a string.
 *
 * @param {byteArray|Uint8Array} byteArray
 * @returns {string}
 *
 * @example
 * // returns "Hello"
 * Utils.byteArrayToChars([72,101,108,108,111]);
 *
 * // returns "你好"
 * Utils.byteArrayToChars([20320,22909]);
 */
  static byteArrayToChars(byteArray) {
    if (!byteArray) return ''
    let str = ''
    // String concatenation appears to be faster than an array join
    for (let i = 0; i < byteArray.length;) {
      str += String.fromCharCode(byteArray[i++])
    }
    return str
  }

  /**
   * Converts an ArrayBuffer to a string.
   *
   * @param {ArrayBuffer} arrayBuffer
   * @param {boolean} [utf8=true] - Whether to attempt to decode the buffer as UTF-8
   * @returns {string}
   *
   * @example
   * // returns "hello"
   * Utils.arrayBufferToStr(Uint8Array.from([104,101,108,108,111]).buffer);
   */
  static arrayBufferToStr(arrayBuffer, utf8 = true) {
    const arr = new Uint8Array(arrayBuffer)
    return utf8 ? Utils.byteArrayToUtf8(arr) : Utils.byteArrayToChars(arr)
  }

  /**
 * 把不同类型的数据转换成字节数组，
 * 接受Binary，hex, Base64, UTF8和Latin1字符串
 *
 * @param {string} str
 * @param {string} type
 * @returns {byteArray}
 *
 * @example
 * // returns [208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]
 * Utils.convertToByteArray("Привет", "utf8");
 *
 * // returns [208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]
 * Utils.convertToByteArray("d097d0b4d180d0b0d0b2d181d182d0b2d183d0b9d182d0b5", "hex");
 *
 * // returns [208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]
 * Utils.convertToByteArray("0JfQtNGA0LDQstGB0YLQstGD0LnRgtC1", "base64");
 */
  static convertToByteArray(str, type) {
    switch (type.toLowerCase()) {
      case 'binary':
        return fromBinary(str)
      case 'hex':
        return fromHex(str)
      case 'decimal':
        return fromDecimal(str)
      case 'base64':
        return base64Func.Decode(str, null, 'byteArray')
      case 'utf8':
        return Utils.strToUtf8ByteArray(str)
      case 'latin1':
      default:
        return Utils.strToByteArray(str)
    }
  }

  /**
 * 把不同类型的数据转换成字符串，
 * 接受Binary，hex, Base64, UTF8和Latin1字符串
 *
 * @param {string} str
 * @param {string} type
 * @returns {byteArray}
 *
 * @example
 * // returns [208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]
 * Utils.convertToByteArray("Привет", "utf8");
 *
 * // returns [208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]
 * Utils.convertToByteArray("d097d0b4d180d0b0d0b2d181d182d0b2d183d0b9d182d0b5", "hex");
 *
 * // returns [208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130]
 * Utils.convertToByteArray("0JfQtNGA0LDQstGB0YLQstGD0LnRgtC1", "base64");
 */
  static convertToByteString(str, type) {
    switch (type.toLowerCase()) {
      case 'binary':
        return Utils.byteArrayToChars(fromBinary(str))
      case 'hex':
        return Utils.byteArrayToChars(fromHex(str))
      case 'decimal':
        return Utils.byteArrayToChars(fromDecimal(str))
      case 'base64':
        return Utils.byteArrayToChars(base64Func.Decode(str, null, 'byteArray'))
      case 'utf8':
        return utf8.encode(str)
      case 'latin1':
      default:
        return str
    }
  }

  /**
 * A mapping of names of delimiter characters to regular expressions which can select them.
 *
 * @param {string} token
 * @returns {RegExp}
 */
  static regexRep(token) {
    return {
      'Space': /\s+/g,
      'Percent': /%/g,
      'Comma': /,/g,
      'Semi-colon': /;/g,
      'Colon': /:/g,
      'Line feed': /\n/g,
      'CRLF': /\r\n/g,
      'Forward slash': /\//g,
      'Backslash': /\\/g,
      '0x with comma': /,?0x/g,
      '0x': /0x/g,
      '\\x': /\\x/g,
      'None': /\s+/g // Included here to remove whitespace when there shouldn't be any
    }[token]
  }

  /**
     * A mapping of names of delimiter characters to their symbols.
     *
     * @param {string} token
     * @returns {string}
     */
  static charRep(token) {
    return {
      'Space': ' ',
      'Percent': '%',
      'Comma': ',',
      'Semi-colon': ';',
      'Colon': ':',
      'Tab': '\t',
      'Line feed': '\n',
      'CRLF': '\r\n',
      'Forward slash': '/',
      'Backslash': '\\',
      '0x': '0x',
      '\\x': '\\x',
      'Nothing (separate chars)': '',
      'None': ''
    }[token]
  }
}

export default Utils
