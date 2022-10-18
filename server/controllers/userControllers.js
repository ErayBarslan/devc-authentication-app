require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { cloudinary } = require('../utils/cloudinary')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const loginManuel = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({ user, token })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

const signupManuel = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

    res.status(200).json({ user, token })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

//GOOGLE
const authGoogle = passport.authenticate("google", ["profile", "email"])

const loginGoogle = async (req, res) => {
  const user = await User.findOne({ googleid: req.user.googleid })

  const token = createToken(user._id)

  if (req.user) {
    res.status(200).json({ user, token })
  }
  else {
    res.status(403).json({ error: "Authentication failed, please try again." })
  }
}
//GOOGLE

//GITHUB
const authGithub = passport.authenticate("github", ["profile", "email"])

const loginGithub = async (req, res) => {
  const user = await User.findOne({ githubid: req.user.githubid })

  const token = createToken(user._id)

  if (req.user) {
    res.status(200).json({ user, token })
  }
  else {
    res.status(403).json({ error: "Authentication failed, please try again." })
  }
}
//GITHUB

const editInfo = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: 'Something went wrong, try to refresh the page.' })
  }

  const pass = req.body.password
  let user;

  if (pass) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass, salt)

    user = await User.findOneAndUpdate({
      _id: req.params.id
    }, { ...req.body, password: hash }, { returnDocument: 'after' })
  }
  else {
    user = await User.findOneAndUpdate({
      _id: req.params.id
    }, { ...req.body }, { returnDocument: 'after' })
  }

  if (!user) {
    return res.status(404).json({ error: 'Something went wrong, try to refresh the page.' })
  }

  const token = createToken(user._id)

  return res.status(200).json({ user, token })
}

const uploadPhoto = async (req, res) => {
  try {
    const file = req.body.data
    const response = await cloudinary.uploader.upload(file, {
      upload_preset: 'devc_authentication_app'
    })
    res.status(200).json({ url: response.url })
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: 'Something went wrong!' })
  }
}

module.exports = { signupManuel, loginManuel, editInfo, loginGoogle, authGoogle, uploadPhoto, loginGithub, authGithub }