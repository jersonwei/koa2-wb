const Sequelize = require('sequelize')
const conf = {
  host: 'localhost',
  dialect: 'mysql'
}
// 线上环境使用连接池
// conf.pool = {
//   连接池中最大的连接数量
//   max: 5,
//   最小
//   min: 0,
//   如果一个连接池10s之内没有被使用则会释放
//   idle: 10000
// }
const seq = new Sequelize('koa2test', 'root', 'w580230.', conf)

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
