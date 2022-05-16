const User = require('../models/user-model')

const findById = async (id) => {
    return await User.findById(id)
}

const findByEmail = async (email) =>{
    return await User.findOne({email})
}

// const findByToken = async (verifyEmailToken) =>{
//     return await User.findOne({verifyEmailToken})
// }

const create = async (body) => {
    const user = await User(body)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.findByIdAndUpdate(id, {token})
}

// const verifyUser = async (id) =>{
//     return await User.findByIdAndUpdate(id, {isVerify: true})
// }

module.exports = {findById, findByEmail, create, updateToken}