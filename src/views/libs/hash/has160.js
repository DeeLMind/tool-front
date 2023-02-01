import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Has160 from 'crypto-api-v1/src/hasher/has160'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  * has160.run(string, { rounds: 80 })
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Has160(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}
