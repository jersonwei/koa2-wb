/**
 * @description user api test
 */

const server = require('../server')

//  用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储cookie
let COOKIE = ''

// 注册
test('注册一个用户 应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser)

  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册 应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })

  expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json scheme 检测 提交内容', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123',
    password: 'a',
    gender: 'asd'
  })

  expect(res.body.errno).not.toBe(0)
})

// 登陆
test('登陆应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  expect(res.body.errno).toBe(0)

  // 获取COOKIE
  // COOKIE = res.headers['set-cookie'].join(';')
  const resCookie = res.headers['set-cookie'][0]
  const str1 = resCookie.match(/weibo.sid=(\S*);\s/)[0]
  const str2 = resCookie.match(/weibo.sid.sig=(\S*);\s/)[0]
  COOKIE = str1 + str2
})

// 删除
test('删除用户 应该成功', async () => {
  const res = await server.post('/api/user/delete').send('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 再次查询用户，应该不存在
test('再次查询注册的用户名应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })

  expect(res.body.errno).not.toBe(0)
})
