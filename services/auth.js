const jwt = require('jsonwebtoken')
const Users = require ('../repositories/user-repository')
const HttpCodes = require('../helpers/http-codes')
const {CustomError} = require('../middlewares/custom-error')

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
            email: newUser.email
        }
    }

    async login ({ email, password }) {
        const user = await this.getUser(email, password)
        if (!user) {
            throw new CustomError (HttpCodes.UNAUTHORIZED, 'Invalid user, user not found!')
        }
        const token = this.generateToken(user)
        await Users.updateToken(user.id, token)
        return {
            id:user.id,
            name: user.name,
            token
        }
    }

    async logout (id) {
        await Users.updateToken(id, null)
    }

    async getUser(email, password){
        const user = await Users.findByEmail(email)
        if (!user) {
            return null
        }

        if (!(await user?.isValidPassword(password))) {
            return null
        }

        return user
    }

    generateToken(user) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
        return token
    }
}

// eslint-disable-next-line new-cap
module.exports = new authService()