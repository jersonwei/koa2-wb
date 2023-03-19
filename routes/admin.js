/**
 * @description 用户路由
 */

const { loginRedirect } = require('../midwares/loginCheck')

const router = require('koa-router')()

/**
 * 获取登陆状态
 * @param {object} ctx ctx
 */
function getLoginState (ctx) {
  let data = {
    isLogin: false
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  console.log(data)
  return data
}
router.get('/login', async (ctx, next) => {
  console.log(ctx.session.userInfo)
  await ctx.render('login', getLoginState(ctx))
})
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginState(ctx))
})
router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})
module.exports = router
