const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
// 模拟登陆
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  let userInfo
  if (userName === 'zhangsan' && password === 'abc') {
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1
    }
  }
  if (userInfo === null) {
    ctx.body = {
      errno: 1,
      msg: '登录失败 '
    }
    return
  }
  ctx.body = {
    errno: 0,
    data: userInfo
  }
})
module.exports = router
