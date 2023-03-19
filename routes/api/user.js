/**
 * @description user API 路由
 */

const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword
} = require('../../controller/user')
const { loginCheck } = require('../../midwares/loginCheck')
const { genValidator } = require('../../midwares/validator')
const { isTest } = require('../../utils/env')
const userValidate = require('../../validator/user')

const router = require('koa-router')()

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  console.log(ctx)
  const { userName, password, gender } = ctx.request.body
  // 调用controller 返回
  ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})
// 登陆
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下 测试账号删除自己
    const { userName } = ctx.session.userInfo
    // 调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改个人信息
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    // controller
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)
router.patch(
  '/changePassword',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    // controller
    ctx.body = changePassword(userName, password, newPassword)
  }
)
module.exports = router
