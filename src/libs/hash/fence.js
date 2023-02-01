/**
 * 栅栏加密
 * @param {string} data
 * @param {object} args
 * @returns {string}
 */
export function Encrypt(data, args) {
  const [key, offset] = args

  const plaintext = data
  if (key < 2) {
    return '组数必须大于2'
  } else if (key > plaintext.length) {
    return '组数必须小于加密字符长度'
  }

  if (offset < 0) {
    return '偏移必须是正整数'
  }

  const cycle = (key - 1) * 2
  const rows = new Array(key).fill('')

  for (let pos = 0; pos < plaintext.length; pos++) {
    const rowIdx = key - 1 - Math.abs(cycle / 2 - (pos + offset) % cycle)

    rows[rowIdx] += plaintext[pos]
  }

  return rows.join('').trim()
}

/**
 * 栅栏解密
 * @param {string} data
 * @param {object} args
 * @returns {string}
 */
export function Decrypt(data, args) {
  const [key, offset] = args

  const cipher = data
  if (key < 2) {
    return '组数必须大于2'
  } else if (key > cipher.length) {
    return '组数必须小于加密字符长度'
  }

  if (offset < 0) {
    return '偏移必须是正整数'
  }

  const cycle = (key - 1) * 2
  const plaintext = new Array(cipher.length)

  let j = 0
  let x, y

  for (y = 0; y < key; y++) {
    for (x = 0; x < cipher.length; x++) {
      if ((y + x + offset) % cycle === 0 || (y - x - offset) % cycle === 0) {
        plaintext[x] = cipher[j++]
      }
    }
  }

  return plaintext.join('').trim()
}
