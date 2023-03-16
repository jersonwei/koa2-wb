/**
 * @description user API 路由
 */

const { isExist } = require('../../controller/user')

const router = require('koa-router')()

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller 返回
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
