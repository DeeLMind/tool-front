import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Sha1 from 'crypto-api-v1/src/hasher/sha1'

/**
    * @param {ArrayBuffer|string} input
    * @param {Object[]} args
    * @returns {string}
    * sha1.run(string, { rounds: 80 })
    */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Sha1(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}

