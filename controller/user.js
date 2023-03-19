/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require('../services/user')
const doCropto = require('../utils/cryp')
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
    return new ErrorModel(registerUserNameExistInfo)
  }
  // 注册 service
  try {
    await createUser({ userName, password: doCropto(password), gender })
    return new SuccessModel()
  } catch (error) {
    console.err(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login (ctx, userName, password) {
  // 登陆成功 ctx.session.userInfo = xxx
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCropto(password))
  // 登陆失败
  if (!userInfo) return new ErrorModel(loginFailInfo)
  if (ctx.session.userInfo === null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser (userName) {
  // service
  const res = await deleteUser(userName)
  if (res) {
    // 删除成功
    return new SuccessModel()
  } else {
    return new ErrorModel(deleteUserFailInfo)
  }
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  // service
  const result = updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    {
      userName
    }
  )
  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  // 执行失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * @param {string} userName
 * @param {string} password
 * @param {string} newPassword
 */
async function changePassword (userName, password, newPassword) {
  const result = await updateUser(
    { newPassword: doCropto(newPassword) },
    {
      userName,
      password: doCropto(password)
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登陆
 * @param {Object} ctx ctx
 */

async function logout (ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}
module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}
