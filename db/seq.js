const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const conf = {
  host: MYSQL_CONF.host,
  dialect: 'mysql'
}
if (isTest) {
  conf.logging = () => {}
}
if (isProd) {
  // 线上环境使用连接池
  conf.pool = {
    // 连接池中最大的连接数量
    max: 5,
    // 最小
    min: 0,
    // 如果一个连接池10s之内没有被使用则会释放
    idle: 10000
  }
}
const seq = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  conf
)

// 测试链接
seq
  .authenticate()
  .then(() => {
    console.log('ok')
  })
  .catch(() => {
    console.log('err')
  })
module.exports = seq
