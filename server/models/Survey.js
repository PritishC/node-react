const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

/* Subdocument collections in MongoDB and their weaknesses -:
 * We set up subdoc collections for the Recipient model under the Survey model. While this ties
 * the Recipient to the Survey, it imposes a limitation due to size constraints in Mongo, where
 * a record's max size is 4MB. If we assume an email to be 20B in size, we can store only 4M / 20 =
 * 4 * 10^6 / 20 (not taking powers of 2 for simplification) = 200000 recipients for a single survey.
 * This is fine, but if we were to make a Survey a subdoc of a User, that would not bode well, because
 * we want the user to create as many surveys as they can as it brings us cash. Limiting that due to size
 * constraints inherent in Mongo would be bad for business.
 */
const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema], // array of RecipientSchema
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// _user is a relationship field, like a FK in a relational DB.
	// Prefixing with _ is a matter of convention.
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);