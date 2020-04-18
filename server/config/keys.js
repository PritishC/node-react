// Figure out what set of creds to use
if (process.env.NODE_ENV === 'production') {
	// Heroku sets the above environment variable automatically
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}