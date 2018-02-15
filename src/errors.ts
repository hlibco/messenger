export class CustomError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, CustomError)
  }

  type (type) {
    this['type'] = type
  }

  context (context) {
    this['context'] = context
  }
}

export class ServerError extends CustomError {
  constructor (name, context?) {
    super(name)
    this.type('ServerError')
    this.context(context)
    Error.captureStackTrace(this, ServerError)
  }
}
