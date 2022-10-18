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

app.use(
	cookieSession({
		name: "session",
		keys: ["keys"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize())
app.use(passport.session())

app.use(
	cors({
		origin: ["https://devc-authentication-app.netlify.app", "https://devc-authentication-app.netlify.app/redirect/google", "https://devc-authentication-app.netlify.app/redirect/github"],
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

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