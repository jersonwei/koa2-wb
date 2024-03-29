/**
 * @description 存储配置
 */

const { isProd } = require('../utils/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}
let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'w580230.',
  port: 3306,
  database: 'koa2test'
}
if (isProd) {
  REDIS_CONF = {
    // 线上环境的redis配置
    port: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'w580230.',
    port: 3306,
    database: 'koa2test'
  }
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
