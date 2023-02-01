import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Sha0 from 'crypto-api-v1/src/hasher/sha0'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  * sha0.run(string, { rounds: 80 })
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Sha0(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}

