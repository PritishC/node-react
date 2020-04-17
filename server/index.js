// CommonJS module import system -> Node only supports CommonJS
// React uses ES2015's import syntax instead
const express = require('express');
// No variable is exported from passport.js; we're just requiring it so that it's executed
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const app = express();

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