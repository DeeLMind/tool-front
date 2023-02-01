import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'
import Md2 from 'crypto-api-v1/src/hasher/md2'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  * md2.run(string, { rounds: 18 })
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }
  const hasher = new Md2(args)
  hasher.update(input)
  return CryptoApi.encoder.toHex(hasher.finalize())
}

