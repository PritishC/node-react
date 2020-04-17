// CommonJS module import system -> Node only supports CommonJS
// React uses ES2015's import syntax instead
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();

// app: express object to register route handlers with
// get: watches for incoming requests with GET
// '/': Route where we want to watch
// req: object representing incoming request
// res: object representing outgoing response
// res.send: send JSON back to requester
/*
app.get('/', (req, res) => {
	res.send({
		hi: 'there'
	});
});
*/

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

// OAuth2 Start URL
app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

// OAuth2 Callback URL
app.get('/auth/google/callback', passport.authenticate('google'));

// Get the port number from an environment variable. Helps to deploy on Heroku.
const PORT  = process.env.PORT || 5000;
app.listen(PORT);