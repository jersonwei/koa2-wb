/**
 * @description 数据模型入口文件
 */

const Blog = require('./Blog')
const User = require('./User')
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
module.exports = {
  Blog,
  User
}
