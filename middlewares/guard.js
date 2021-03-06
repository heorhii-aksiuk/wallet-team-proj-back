const jwt = require('jsonwebtoken');
const Users = require ('../repositories/user-repository');
const HttpCodes = require('../helpers/http-codes');
const Messages = require('../helpers/messages');

const SECRET_KEY = process.env.JWT_SECRET_KEY


const guard = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1]
    if (!verifyToken(token)) {
        return res.status(HttpCodes.UNAUTHORIZED). send({
            status: 'error',
            code: HttpCodes.UNAUTHORIZED,
            message: Messages.UNAUTHORIZED_USER_AUTH
        })
    }

    const payload = jwt.decode(token)
    const user = await Users.findById({_id: payload.id})
    if (!user || user.token !== token) {
        return res.status(HttpCodes.UNAUTHORIZED). send({
            status: 'error',
            code: HttpCodes.UNAUTHORIZED,
            message: Messages.UNAUTHORIZED_USER_AUTH
        })
    }

    req.user = user
    next()
}

const verifyToken = (token) => {
    try {
        const t = jwt.verify(token, SECRET_KEY)
        return !!t
    } catch (error) {
        return false
    }
}

module.exports = guard