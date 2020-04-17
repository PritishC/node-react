// CommonJS module import system -> Node only supports CommonJS
// React uses ES2015's import syntax instead
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

// Import the user model *before* passport otherwise we won't have the User model loaded into Mongoose
// when Passport tries to save a User instance.
require('./models/User');
// No variable is exported from passport.js; we're just requiring it so that it's executed
require('./services/passport');

const app = express();

// app.use() calls basically plug middlewares into the app.
// Tell the app to use cookie sessions and Passport to generate cookie sessions.
// Request -> cookie-session pulls out cookie data -> Passport pulls out ID from cookie data and dumps
// it into req.session object -> Passport passes req.session to deserializeUser function
// -> deserializeUser uses req.session.passport.user property (the ID) and retrieves the user instance.
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey] // used to encrypt the cookie
	})
);
app.use(passport.initialize());
app.use(passport.session());

// We want to be able to include the app object inside authRoutes, but doing so is a bit difficult
// due to circular imports. So we wrap the routes in that file into an arrow function and export
// the arrow function. We import the arrow function here and call it with `app` as an argument.
authRoutes(app);

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

// Get the port number from an environment variable. Helps to deploy on Heroku.
const PORT  = process.env.PORT || 5000;
app.listen(PORT);