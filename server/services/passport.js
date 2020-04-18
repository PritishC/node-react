const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// Instead of importing the User schema directly, we load it via Mongoose.
const User = mongoose.model('users');

// Serializer the user and help Passport generate a cookie for the user.
// Activates after the user callback function to `use()` below.
passport.serializeUser((user, done) => {
	// First argument: an error object, if any
	// Second argument: MongoDB User collection's ID. NOT the googleId.
	done(null, user.id);
});

// Opposite of serialization - get user from cookie identifier.
passport.deserializeUser(async (userId, done) => {
	const user = await User.findById(userId);

	done(null, user);
});

// Make Passport aware of the google strategy
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	// A relative callback URL confuses Google OAuth2 and makes it think we are redirecting the user back
	// to a HTTP URL, and not HTTPS as we've specified in the settings. GoogleStrategy causes the problem,
	// because Heroku controls requests coming to it through a proxy, and because the request is routed
	// through a proxy, it is assumed that the user no longer wants HTTPS.
	// We fix this by passing an additional option the GoogleStrategy (make it trust proxies).
	callbackURL: "/auth/google/callback",
	proxy: true
}, async (accessToken, refreshToken, profile, done) => {
	// Get the access token at the end of the flow in exchange for the auth code
	// Save it to the DB
	const existingUser = await User.findOne({
		googleId: profile.id
	});

	if (existingUser) {
		done(null, existingUser);
	} else {
		const user = await new User({
			googleId: profile.id
		}).save();

		done(null, user);
	}
}));