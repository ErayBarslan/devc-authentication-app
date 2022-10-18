const express = require('express')
const router = express.Router()
const passport = require('passport')
const { loginManuel, signupManuel, editInfo, loginGoogle, authGoogle, uploadPhoto, loginGithub, authGithub } = require('../controllers/userControllers')
const { setApiKeyHeader } = require('../middleware/verifyApiKey')
const { verifyAuth } = require('../middleware/verifyAuth')

//GOOGLE ROUTES
router.get('/auth/google/login', setApiKeyHeader, loginGoogle)

router.get(`/auth/google`, authGoogle)

router.get('/auth/google/redirect', passport.authenticate('google', {
  successRedirect: 'https://devc-authentication-app.netlify.app/redirect/google',
  failureRedirect: 'https://devc-authentication-app.netlify.app/redirect/google'
}),)


//GITHUB ROUTES
router.get('/auth/github/login', setApiKeyHeader, loginGithub)

router.get(`/auth/github`, authGithub)

router.get('/auth/github/redirect', passport.authenticate('github', {
  successRedirect: 'https://devc-authentication-app.netlify.app/redirect/github',
  failureRedirect: 'https://devc-authentication-app.netlify.app/redirect/github'
}),)

//LOGOUT SOCIAL
router.get('/auth/logout', setApiKeyHeader, (req, res) => {
  req.logout()
})

//REST ROUTES
router.use(setApiKeyHeader)

router.post(`/login`, loginManuel)

router.post(`/signup`, signupManuel)

//Verify auth middleware
router.use(verifyAuth)

router.patch(`/:id`, editInfo)

router.post('/upload', uploadPhoto)

module.exports = router