const User = require('../models/user-model')

const findById = async (id) => {
    return await User.findById(id)
}

const findByEmail = async (email) =>{
    return await User.findOne({email})
}

const create = async (body) => {
    const user = await User(body)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.findByIdAndUpdate(id, {token})
}

const findByPass = async (password) =>{
    return await User.findOne({password})
}
const findByRepPass = async (repeatPassword) =>{
    return await User.findOne({repeatPassword})
}

module.exports = {findById, findByEmail, create, updateToken, findByPass, findByRepPass}