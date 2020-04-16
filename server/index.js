// CommonJS module import system -> Node only supports CommonJS
// React uses ES2015's import syntax instead
const express = require('express');
const app = express();

// app: express object to register route handlers with
// get: watches for incoming requests with GET
// '/': Route where we want to watch
// req: object representing incoming request
// res: object representing outgoing response
// res.send: send JSON back to requester
app.get('/', (req, res) => {
	res.send({
		hi: 'there'
	});
});

// Get the port number from an environment variable. Helps to deploy on Heroku.
const PORT  = process.env.PORT || 5000;
app.listen(PORT);