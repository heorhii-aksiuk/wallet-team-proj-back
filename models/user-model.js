const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs')
// const { v4: uuidv4 } = require('uuid');

const { Schema, model } = mongoose;

const userSchema = new Schema({
        name: {
            type: String,
            default: 'Guest',
            required:[true, 'Name is required']
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        repeatPassword: {
            type: String,
            required: [true, 'Password must be repeate'],
          },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        token: {
          type: String,
          default: null,
        },
        cloudId:{
          type: String,
          default: null
        }
        // isVerify:{
        //   type: Boolean,
        //   default: false
        // },
        // verifyEmailToken:{
        //   type: String,
        //   default: uuidv4()
        // }
      },
{
        versionKey: false,
        timestamps: true,
        toJSON: {
          virtuals: true,
          transform: (doc, ret) => {
            delete ret.favorite
            delete ret._id
            return ret
          },
        },
        toObject: { virtuals: true },
      },
    )

    userSchema.pre('save', async function (next) {
        if (this.isModified('password')){
            const salt = await bcrypt.genSalt(7)
            this.password = await bcrypt.hash(this.password, salt)
        }
        next()
    })

    userSchema.methods.isValidPassword = async function (password) {
        return await bcrypt.compare(password, this.password)
    }

 const User = model('user', userSchema)

module.exports = User