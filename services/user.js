/**
 * @description  user service
 */

const { User } = require('../db/model')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */

async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {
      password
    })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'password', 'city', 'picture'],
    where: whereOpt
  })
  if (result === null) return result

  // 格式化
  return formatUser(result.dataValues)
}

module.exports = {
  getUserInfo
}
