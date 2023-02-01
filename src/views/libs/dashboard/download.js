/*
 * @Author: QKSword 1064615639@qq.com
 * @Date: 2022-06-13 16:05:47
 * @LastEditors: QKSword 1064615639@qq.com
 * @LastEditTime: 2022-10-23 16:00:43
 * @FilePath: \gkattack-front\src\libs\dashboard\download.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * 处理获取到的结果
 * @param {Object} row
 * @param {Object} result
 * @returns {any}
 */
export function resultProcess(row, result) {
  var fileBuffer
  var fileName

  switch (row.type) {
    case 'picTrojan':
      var picTrojanResult = picTrojanProcess(row, result)
      fileBuffer = picTrojanResult.fileBuffer
      fileName = picTrojanResult.fileName
      break
    case 'winExp':
      var winExpResult = winExpProcess(row, result)
      fileBuffer = winExpResult.fileBuffer
      fileName = winExpResult.fileName
      break
  }

  return { 'fileBuffer': fileBuffer, 'fileName': fileName }
}

/**
 * 处理WindowsExploit查询结果
 * @param {Object} row
 * @param {Object} result
 * @returns {any}
 */
function winExpProcess(row, result) {
  var fileName = row.name + '.csv'

  var fileBuffer = new File([result], row.name, { type: 'text/plain' })

  return { 'fileBuffer': fileBuffer, 'fileName': fileName }
}

/**
 * 处理图片Trojan结果
 * @param {Object} row
 * @param {Object} result
 * @returns {any}
 */
function picTrojanProcess(row, result) {
  var arr = result.split(',')
  var fileType = arr[0].match(/:(.*?);/)
  var fileSuffix = fileType[1].split('/')
  var fileBits = Buffer.from(arr[1], 'base64')

  var fileBuffer = new File([fileBits], row.name, { type: fileType })

  var fileName = row.name + '.' + fileSuffix[1]

  return { 'fileBuffer': fileBuffer, 'fileName': fileName }
}
