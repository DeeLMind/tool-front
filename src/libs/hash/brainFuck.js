// refer to https://github.com/splitbrain/ook

// note:原版使用php的chr和ord，在处理中文时也是转换为ascii
// 在js中使用charCodeAt和fromCharCode，转换为utf-16，加密字符会膨胀

/**
 * brainFuck加密 text to brainFuck
 * @param {string} data
 * @returns {string}
 */
export function Encrypt(data) {
  var pointer = 0 // 指针
  var index = 0 // 索引
  var dataLength = data.length // 数据长度
  var diffValue = 0 // 用于对比
  var result = ''
  var loopValue = 0 // 用于循环

  do {
    // 获取当前数据和前一个数据相差值
    diffValue = data[index].charCodeAt(0) - pointer
    pointer = data[index].charCodeAt(0)

    // 相同则重复
    if (diffValue === 0) {
      result += '>.<'
      index++
      continue
    }

    // 如果相差过小则直接用+和-表示，不使用循环
    if (Math.abs(diffValue) < 10) {
      if (diffValue > 0) {
        result += '>' + '+'.repeat(diffValue)
      } else if (diffValue < 0) {
        result += '>' + '-'.repeat(Math.abs(diffValue))
      }
    } else {
      // 如果相差过大则使用循环
      loopValue = Math.sqrt(Math.abs(diffValue))

      // 向下取整，不需要浮点
      loopValue = Math.floor(loopValue)

      result += '+'.repeat(loopValue)

      // 进行循环
      if (diffValue > 0) {
        result += '[->' + '+'.repeat(loopValue) + '<]'
        result += '>' + '+'.repeat(diffValue - Math.pow(loopValue, 2))
      } else if (diffValue < 0) {
        result += '[->' + '-'.repeat(loopValue) + '<]'
        result += '>' + '-'.repeat(Math.abs(diffValue) - Math.pow(loopValue, 2))
      }
    }

    result += '.<'

    index++
  } while (index < dataLength)

  result = result.replace(/<>/g, '')

  return result
}

/**
 * 模拟brainFuck执行
 * @param {object} decryptObj
 * @returns {string}
 */
function brainFuckInterpret(decryptObj) {
  do {
    switch (decryptObj.source[decryptObj.sourceIndex]) {
      case '+':
        decryptObj.memoryData[decryptObj.memoryDataIndex] = String.fromCharCode(decryptObj.memoryData[decryptObj.memoryDataIndex].charCodeAt(0) + 1)
        break
      case '-':
        decryptObj.memoryData[decryptObj.memoryDataIndex] = String.fromCharCode(decryptObj.memoryData[decryptObj.memoryDataIndex].charCodeAt(0) - 1)
        break
      case '>':
        decryptObj.memoryDataIndex++
        if (typeof decryptObj.memoryData[decryptObj.memoryDataIndex] === 'undefined') {
          decryptObj.memoryData[decryptObj.memoryDataIndex] = String.fromCharCode(0)
        }
        break
      case '<':
        decryptObj.memoryDataIndex--
        break
      case '.':
        decryptObj.result += decryptObj.memoryData[decryptObj.memoryDataIndex]
        break
      case ',':
        decryptObj.memoryData[decryptObj.memoryDataIndex] = decryptObj.inputIndex === decryptObj.input.length ? String.fromCharCode(0) : decryptObj.input[decryptObj.inputIndex++]
        break
      // 解析循环
      case '[':
        if (parseInt(decryptObj.memoryData[decryptObj.memoryDataIndex].charCodeAt(0), 10) === 0) {
          // 忽略循环
          var brackets = 1
          while (brackets && decryptObj.sourceIndex++ < decryptObj.source.length) {
            if (decryptObj.source[decryptObj.sourceIndex] === '[') {
              brackets++
            } else if (decryptObj.source[decryptObj.sourceIndex] === ']') {
              brackets--
            }
          }
        } else {
          // 执行循环
          var pos = decryptObj.sourceIndex++ - 1
          if (brainFuckInterpret(decryptObj)) {
            decryptObj.sourceIndex = pos
          }
        }
        break
      case ']':
        return (parseInt(decryptObj.memoryData[decryptObj.memoryDataIndex].charCodeAt(0), 10) !== 0)
    }
  } while (++decryptObj.sourceIndex < decryptObj.source.length)
}

/**
 * brainFuck解密  brainFuck to text
 * @param {string} data
 * @returns {string}
 */
export function Decrypt(data) {
  var tempMemoryData = []
  tempMemoryData[0] = String.fromCharCode(0)

  var decryptData = {
    source: data, // 要解密数据
    sourceIndex: 0, // 要解密数据索引
    memoryData: tempMemoryData, // 模拟brainFuck内存
    memoryDataIndex: 0, // 内存索引
    input: '', // 模拟输入
    inputIndex: 0, // 输入索引
    result: '' // 解密结果
  }

  brainFuckInterpret(decryptData)

  return decryptData.result
}

