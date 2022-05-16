const jwt = require('jsonwebtoken')
const Users = require ('../repository/user')
const {HttpCodes} = require('../helpers/http-codes')
const CustomError = require('../middlewares/custom-error')

const SECRET_KEY = process.env.JWT_SECRET_KEY

class authService {
    async create (body) {
        const user = await Users.findByEmail(body.email)
        if (user) {
            throw new CustomError (HttpCodes.CONFLICT, 'User already exists')
        }

        const newUser = await Users.create(body)

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar
        }
    }

    async login ({ email, password }) {
        const user = await this.getUser(email, password)
        const token = this.generateToken(user)
        await Users.updateToken(user.id, token)
        return {token}
    }

    async logout (id) {
        await Users.updateToken(id, null)
    }

    generateToken(user) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
        return token
    }
}

// eslint-disable-next-line new-cap
module.exports = new authService()