export type ISuccess = {
  success: boolean
  message: string
  context?: Object
}

export type IFailure = {
  success: boolean
  message: string
  context?: Object
}

export type IError = {
  success: boolean
  message: string
  context?: Object
  error: Error
}

export class Reply {
  static success (message: string, context?: Object) {
    return (cb: Function) => {
      const payload: ISuccess = {
        success: true,
        message,
        context
      }

      cb(JSON.stringify(payload))
    }
  }

  static failure (message: string, context?: Object) {
    return (cb: Function) => {
      const payload: IFailure = {
        success: false,
        message,
        context
      }

      cb(JSON.stringify(payload))
    }
  }

  static error (error: Error, message: string, context?: Object) {
    return (cb: Function) => {
      const payload: IError = {
        success: false,
        message,
        context,
        error
      }

      cb(JSON.stringify(payload))
    }
  }
}

export default Reply
