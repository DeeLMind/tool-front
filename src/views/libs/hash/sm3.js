import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Sm3 from 'crypto-api-v1/src/hasher/sm3'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Sm3(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}

