const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Make Passport aware of the google strategy
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
	// Get the access token at the end of the flow in exchange for the auth code
	// Save it to the DB
	console.log(accessToken);
}));