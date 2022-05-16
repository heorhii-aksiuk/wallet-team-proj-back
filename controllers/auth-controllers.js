const authService = require('../services/auth')
const {HttpCodes} = require('../helpers/http-codes')

const registration = async (req, res) => {
    const user = await authService.create(req.body)
    return res.status(HttpCodes.CREATED).json({ 
        status: 'success',
        code: HttpCodes.CREATED,
        data: { ...user }
})
}
const login = async (req, res) => {
    const token = await authService.login(req.body)
    return res.status(HttpCodes.OK).json({ 
        status: 'success', 
        code: HttpCodes.OK, 
        data: { token } }) 
}
const logout = async (req, res) => {
    await authService.logout(req.user.id)
    return res.status(HttpCodes.NO_CONTENT).json() 
}

module.exports = {registration, login, logout}