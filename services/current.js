const Users = require ('../repositories/user-repository')
const HttpCodes = require('../helpers/http-codes')
const {CustomError} = require('../middlewares/custom-error')

class CurrentService {
    async current (req) {

        const user = await Users.findById(req.user.id)
        if (!user) {
            throw new CustomError (HttpCodes.UNAUTHORIZED, 'Invalid user')
        }
        return {
            name: user.name,
            email:user.email
        }
    }
}

module.exports = new CurrentService()