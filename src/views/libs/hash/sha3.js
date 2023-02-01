import Utils from '@/libs/utils'
import JSSHA3 from 'js-sha3'

/**
  * @param {ArrayBuffer|string} input
  * @param {number} size
  * @returns {string}
  */
export function run(input, size) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }

  let algo

  switch (size) {
    case 224:
      algo = JSSHA3.sha3_224
      break
    case 384:
      algo = JSSHA3.sha3_384
      break
    case 256:
      algo = JSSHA3.sha3_256
      break
    case 512:
      algo = JSSHA3.sha3_512
      break
  }

  return algo(input)
}
