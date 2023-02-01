
/**
 * url编码
 * @param {string} input
 * @param {Object[]} args
 * @returns {string}
 */
export function urlEncode(input, args) {
  const encodeAll = args[0]
  return encodeAll ? encodeAllChars(input) : encodeURI(input)
}

/**
 * 在encodeURI函数之外的编码
 *
 * @param {string} str
 * @returns {string}
 */
export function encodeAllChars(str) {
  // TODO Do this programmatically
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/#/g, '%23')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/-/g, '%2D')
    .replace(/\./g, '%2E')
    .replace(/_/g, '%5F')
    .replace(/~/g, '%7E')
}

/**
 * url解码
 *
 * @param {string} str
 * @returns {string}
 */
export function urlDecode(input) {
  const data = input.replace(/\+/g, '%20')
  try {
    return decodeURIComponent(data)
  } catch (err) {
    return unescape(data)
  }
}

