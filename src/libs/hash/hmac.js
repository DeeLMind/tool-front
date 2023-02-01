import Utils from '@/libs/utils'
import CryptoApi from 'crypto-api-v1/src/crypto-api'

/**
  * @param {ArrayBuffer|string} input
  * @param {Object[]} args
  * @returns {string}
  */
export function run(input, args) {
  if (input instanceof ArrayBuffer) {
    input = Utils.arrayBufferToStr(input, false)
  }

  const key = args[0]
  const hashFunc = args[1].toLowerCase()
  const hasher = CryptoApi.getHasher(hashFunc)

  const mac = CryptoApi.getHmac(key, hasher)
  mac.update(input)
  return CryptoApi.encoder.toHex(mac.finalize())
}
