const _ = require('lodash');
// We have to import { Path } to prevent the "Path is not a constructor" error.
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
requireLogin = require('../middlewares/requireLogin');
requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');

		// chain() allows us to chain in multiple helper methods, and the first argument to each
		// is the return result of the previous function in the chain.
		_.chain(req.body)
			.map(({ url, email }) => {
				// If the URL does not have *both* a survey ID and a choice, then `test()`
				// returns null as a result.
				// Can't destructure match according to ES6 syntax because it can be null also.
				const match = p.test(new URL(url).pathname);

				if (match) {
					return {
						email: email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				// MongoDB query to find a particular survey and update its properties.
				// Single query instruction, akin to doing a raw SQL query in Django so that all the work
				// is done by the database.
				// This query doesn't need async/await since this route does background processing, and is not
				// user facing.
				Survey.updateOne({
						// Mongo ID filters are done using _id and not id.
						_id: surveyId,
						recipients: {
							// $elemMatch performs a filter on the subdocument collection of recipients.
							// It then allows us to reference the filtered subdoc collection through the
							// use of the $ character in update and increment queries.
							$elemMatch: { email, responded: false }
						},
					}, {
						// The second argument to updateOne is an object with update/increment queries.
						// [choice] is key interpolation syntax - it may be "yes" or "no", we don't know
						// ahead of time, so we interpolate at runtime. It increases the yes or no vote by 1.
						// $set is an update query and here it sets the filtered recipient subdoc collection's
						// `responded` property to true.
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
				}).exec();
			})
			.value();
		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title, subject, body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		try {
			// Send an email
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});

};