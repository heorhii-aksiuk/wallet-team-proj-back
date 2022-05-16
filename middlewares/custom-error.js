class CustomError extends Error {
    constructor(statusCode, message, name = 'appError') {
        super (message)
        this.statusCode = statusCode
        this.status = `$(statusCode)`.startsWith('4') ? 'error' : 'fail'
        this.name = name
        Error.captureStackTrace(this, this.constructor)

    }
}

module.exports =  {CustomError}