import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Sha256 from 'crypto-api-v1/src/hasher/sha256'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  * sha256.run(string, { length: 256, rounds: 64 })
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Sha256(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}

