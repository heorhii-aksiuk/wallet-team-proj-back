const {HttpCodes} = require('../helpers/http-codes')

const wrapper = (fn) => async (req, res, next) => {
    try {
        const result = await fn( req, res, next )
        return result
    } catch (error){
        switch (error.name) {
            case 'ValidationError':
                res.status(HttpCodes.BAD_REQUEST).json({
                    status: 'error',
                    code: HttpCodes.BAD_REQUEST,
                    message: error.message
                })
                break;
                case 'AppError':
                    res.status(error.statusCode).json({
                        status: error.status,
                        code: error.statusCode,
                        message: error.message
                    })
          
              // eslint-disable-next-line no-fallthrough
                default:
                next (error)
                break;
        }
    }
}

module.exports = { wrapper }