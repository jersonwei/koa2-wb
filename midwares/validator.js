/**
 * @description json scheme 验证中间件
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

function genValidator (validateFn) {
  // 定义中间件函数
  async function validator (ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      console.log('验证失败')
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    console.log('验证通过')
    // 验证成功
    await next()
  }
  // 返回中间件
  return validator
}

module.exports = { genValidator }
