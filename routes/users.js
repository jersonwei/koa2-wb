const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SECRET_CODE } = require('../conf/constant')
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
  // 加密userinfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET_CODE, {
      expiresIn: '1h'
    })
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
    userInfo,
    data: token
  }
})
module.exports = router
