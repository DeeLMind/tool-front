import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Snefru from 'crypto-api-v1/src/hasher/snefru'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Snefru(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}
