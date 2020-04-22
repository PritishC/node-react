const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
	const invalidEmailsArray = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => email && (re.test(email) === false));

	if (invalidEmailsArray.length) {
		return `These emails are invalid: ${invalidEmailsArray}`;
	}

	return;
};