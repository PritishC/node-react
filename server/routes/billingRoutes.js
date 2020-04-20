const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			// the course follows the USD currency but we set to INR to avoid a Stripe API error which
			// says that additional details must be sent.
			currency: 'inr',
			description: '500INR for 5 credits',
			source: req.body.id
		});

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};