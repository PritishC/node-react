const passport = require('passport');

module.exports = (app) => {
	// OAuth2 Start URL
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	// OAuth2 Callback URL
	// passport.authenticate() is a "middleware", we can add a function that
	// handles the request after the authenticate middleware is done.
	// Basically express allows for a chain of handler functions for a single route.
	app.get('/auth/google/callback',
			passport.authenticate('google'),
			(req, res) => {
				res.redirect('/surveys');
			});

	app.get('/api/logout', (req, res) => {
		// logout() is automatically attached to the request object by Passport
		req.logout();
		res.redirect('/');
	});

	// Auth test route
	app.get('/api/current_user', (req, res) => {
		// the user object has been deserialized from the cookie and
		// is being maintained by the application.
		res.send(req.user);
	});
};