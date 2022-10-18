const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    console.log("noauth")
    return res.status(401).json({ error: "Authorization token missing." })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    req.userID = await User.findOne({ _id }).select('_id')
    next()
  } catch (error) {
    res.status(401).json({ error: "You shall not pass!" })
  }
}

module.exports = { verifyAuth }