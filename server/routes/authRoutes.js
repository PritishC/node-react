const passport = require('passport');

module.exports = (app) => {
	// OAuth2 Start URL
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	// OAuth2 Callback URL
	app.get('/auth/google/callback', passport.authenticate('google'));
};