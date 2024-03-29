const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
// 路由
const userApiRouter = require('./routes/api/user')
const index = require('./routes/index')
// const users = require('./routes/users')
const userViewRouter = require('./routes/admin')
// const jwtKoa = require('koa-jwt')
const { REDIS_CONF } = require('./conf/db')
const { SECRET_CODE } = require('./conf/constant')
// const { SECRET_CODE } = require('./conf/constant')

// error handler
onerror(app)
// app.use(
//   jwtKoa({
//     secret: SECRET_CODE
//   }).unless({
//     自定义忽略jwt验证目录
//     path: [/^\/users\/login/]
//   })
// )
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = [SECRET_CODE]
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认是 koa.sid
    prefix: 'weibo:sess:', // redis key 的前缀 默认是 koa:sess:
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    // ttl: 24*60*60*1000,
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)
// routes
app.use(index.routes(), index.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
