require('dotenv').config()

const setApiKeyHeader = async (req, res, next) => {
  if (req.headers['api-key'] !== process.env.API_KEY) {
    return res.status(401).json({ error: "You shall not pass!" })
  }
  next()
}

module.exports = { setApiKeyHeader }