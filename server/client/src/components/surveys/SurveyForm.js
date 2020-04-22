// Shows a form to the user to enter survey details.
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		// Let Field's component be SurveyField, which delegates field level responsibilities to us.
		return _.map(formFields, ({ label, name }) => {
			return <Field component={SurveyField} type="text"
					label={label} name={name} key={name} />
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '')

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
};

// reduxForm adds the prop handleSubmit to the form.
export default reduxForm({
	validate, form: 'surveyForm',
	// We don't want redux-form to dump the form inputs if the component is unmounted.
	// This happens when we click Next and go to the review screen, and setting to false
	// prevents it from happening.
	destroyOnUnmount: false
})(SurveyForm);