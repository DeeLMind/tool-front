import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Sha512 from 'crypto-api-v1/src/hasher/sha512'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  * sha512.run(string, { length: 512, rounds: 160 })
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Sha512(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}

