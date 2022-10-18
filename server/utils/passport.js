require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github')
const User = require('../models/User')

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "/api/auth/google/redirect",
	scope: ["profile", "email"]
}, (accessToken, refreshToken, profile, done) => {

	User.findOne({ googleid: profile.id })
		.then((googleUser) => {
			if (googleUser) {
				done(null, googleUser)
			}
			else {
				new User({
					email: profile._json.email,
					googleid: profile.id,
					name: profile.displayName,
					avatar: profile._json.picture
				}).save()
					.then((googleUser) => {
						done(null, googleUser)
					})
			}
		})
})
)

passport.use(new GitHubStrategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: "/api/auth/github/redirect",
	scope: ["profile", "email"]
}, (accessToken, refreshToken, profile, done) => {
	
	User.findOne({ githubid: profile.id })
		.then((githubUser) => {
			if (githubUser) {
				done(null, githubUser)
			}
			else {
				new User({
					email: profile._json.email,
					githubid: profile.id,
					name: profile.displayName,
					avatar: profile._json.avatar_url
				}).save()
					.then((githubUser) => {
						done(null, githubUser)
					})
			}
		})
})
)

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});