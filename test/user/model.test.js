/**
 * @description user model test
 */

const { User } = require('../../db/model/index')

test('User 模型的各个属性 符合', () => {
  // build会构建一个内存的实例 但不会添加到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: 'p123123',
    nickName: '张三',
    picture: '/xxx.png',
    city: '北京'
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('p123123')
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
  expect(user.gender).toBe(3)
})
