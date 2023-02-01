import * as jsFuck5 from '@/libs/hash/jsFuck@0.5'

/**
 * jsFuck加密
 * @param {string} data
 * @param {boolean} evalCheck
 * @param {boolean} scopeCheck
 * @returns {string}
 */
export function Encrypt(data, evalCheck, scopeCheck) {
  return jsFuck5.JSFuck.encode(data, evalCheck, scopeCheck)
}

/**
 * jsFuck解密
 * refer to https://github.com/enkhee-Osiris/Decoder-JSFuck
 * @param {string} data
 * @param {boolean} evalCheck
 * @returns {string}
 */
export function Decrypt(data, evalCheck) {
  if (evalCheck) {
    var output = ''
    var functionNames = ['flat', 'fill', 'filter']
    var prefix = ''
    var postfix = ''
    var result = null

    for (let i = 0; i < functionNames.length; i++) {
      var functionName = functionNames[i]

      if (functionName !== 'filter') {
        prefix = '[][' + jsFuck5.JSFuck.encode(functionName) + ']' +
                   '[' + jsFuck5.JSFuck.encode('constructor') + ']' +
                   '(' + jsFuck5.JSFuck.encode('return eval') + ')()('
        postfix = ')'
        result = isMatching(data, patternCreator(prefix, postfix))

        if (result) {
          output = myEval(result)
          break
        }
      }

      prefix = '[][' + jsFuck5.JSFuck.encode(functionName) + ']' +
               '[' + jsFuck5.JSFuck.encode('constructor') + ']('
      postfix = ')()'
      result = isMatching(data, patternCreator(prefix, postfix))

      if (result) {
        output = myEval(result)
        break
      }
    }
  } else {
    output = myEval(data)
  }

  return output
}

function myEval(js) {
  var Fun = Function
  return new Fun('return ' + js)()
}

function patternCreator(prefix, postfix) {
  var replacedPrefix = prefix.replace(/[\[\]\(\)\+\!]/g, '\\$&')
  var replacedPostfix = postfix.replace(/[\[\]\(\)\+\!]/g, '\\$&')

  return replacedPrefix + '(.*)' + replacedPostfix
}

function isMatching(string, pattern) {
  var result = string.match(new RegExp(pattern))
  if (result) return result[1]

  return null
}
