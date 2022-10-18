const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    default: 'Include country code'
  },
  name: {
    type: String,
    default: 'Unknown'
  },
  bio: {
    type: String,
    default: 'I love coding!'
  },
  avatar: {
    type: String,
    default: '/mock-avatar.png'
  },
  googleid: {
    type: String,
  },
  githubid: {
    type: String,
  },
}, { timestamps: true })

// static signup method
UserSchema.statics.signup = async function (email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || !password) throw new Error('Please fill in both fields')
  if (!emailRegex.test(email)) throw new Error('Please provide a valid email')

  const exists = await this.findOne({ email, password: { $exists: true } })
  if (exists) throw new Error('Email already in use')

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

// static login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw new Error('Please fill in both fields')

  const user = await this.findOne({ email })
  if (!user) throw new Error('Invalid credentials')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Invalid credentials')

  return user
}

module.exports = mongoose.model('user', UserSchema)