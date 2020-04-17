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
	callbackURL: "/auth/google/callback"
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