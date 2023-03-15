/**
 * @description json test
 */

const server = require('./server')
test('json 测试接口成功', async () => {
  const res = await server.get('/json')
  expect(res.body.title).toEqual('koa2 json')
})
