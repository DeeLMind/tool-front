
/**
    * @param {ArrayBuffer|string} input
    * @param {Object[]} args
    * @returns {string}
    * md6.run(string, {
            size: 256,
            key: '',
            levels: 64
          })
    */
export function run(input, args) {
  const md6 = require('md6-hash')

  return md6(input, args)
}

