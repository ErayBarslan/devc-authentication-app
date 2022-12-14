const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportConfig = require('./utils/passport')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()

app.use(express.json({ limit: "10mb" }))

app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(
	cookieSession({
		name: "session",
		keys: ["keys"],
		maxAge: 24 * 60 * 60 * 100,
		sameSite: "none",
		secure: true,
		httpOnly: true
	})
);

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => res.send('Authentication App API'))

app.use(`/api`, userRoutes)

mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('listening...')
		})
	})
	.catch(error => console.log(error))

module.exports = app