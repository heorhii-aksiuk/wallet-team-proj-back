class CustomError extends Error {
    constructor(statusCode, message, name = 'AppError') {
        super (message)
        this.statusCode = statusCode
        this.status = `$(statusCode)`.startsWith('4') ? 'error' : 'fail'
        this.name = name
        Error.captureStackTrace(this, this.constructor)

    }
}

module.exports =  {CustomError}