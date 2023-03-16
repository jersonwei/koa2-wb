/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser } = require('../services/user')
/**
 * @description 用户是否存在
 */
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
/**
 *
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男 2 女 3 保密）
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerUserNameExistInfo)
  }
  // 注册 service
  try {
    await createUser({ userName, password, gender })
    return new SuccessModel()
  } catch (error) {
    console.err(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}
module.exports = {
  isExist,
  register
}
