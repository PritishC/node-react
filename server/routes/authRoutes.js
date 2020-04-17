const passport = require('passport');

module.exports = (app) => {
	// OAuth2 Start URL
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	// OAuth2 Callback URL
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		// logout() is automatically attached to the request object by Passport
		req.logout();
		res.send(req.user);
	});

	// Auth test route
	app.get('/api/current_user', (req, res) => {
		// the user object has been deserialized from the cookie and
		// is being maintained by the application.
		res.send(req.user);
	});
};