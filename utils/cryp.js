/**
 * @description  加密方法
 */

const crypto = require('crypto')
const { SECRET_KEY } = require('../conf/constant')

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 铭文
 */
function doCropto (content) {
  const str = `password=${content}&key=${SECRET_KEY}`
  return _md5(str)
}

module.exports = doCropto
