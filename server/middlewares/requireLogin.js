// This middleware will be applicable only on some routes, not all.
// That is why it won't be applied in index.js on the Express app.
module.exports = (req, res, next) => {
	// next is similar to the `done` callback in the passport code -:
	// It indicates that request will be passed off to the next middleware in the chain.
	if (!req.user) {
		return res.status(401).send({
			error: "You must login!"
		});
	}

	next();
};