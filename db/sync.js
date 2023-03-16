/**
 * @description sequelize 同步
 */
const seq = require('./seq')
require('./model/index')

// 测试链接
seq
  .authenticate()
  .then(() => {
    console.log('11ok')
  })
  .catch(() => {
    console.log('11err')
  })

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('ojk')
  process.exit()
})
