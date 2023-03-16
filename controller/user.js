/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */

const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo } = require('../services/user')

async function isExist (userName) {
  // 业务逻辑处理
  // 调用services 获取数据
  const userInfo = await getUserInfo(userName)
  // 统一返回格式
  if (userInfo) {
    // 成功返回
    return new SuccessModel(userInfo)
  } else {
    // 返回异常
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}
