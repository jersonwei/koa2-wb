/**
 * @description 基础数据模型
 */

class BaseModel {
  constructor ({ errno, data, message }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * @description 成功数据模型
 */
class SuccessModel extends BaseModel {
  constructor (data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * @description 失败数据模型
 */

class ErrorModel extends BaseModel {
  constructor ({ errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
