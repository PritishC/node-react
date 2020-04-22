// Shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}>Back</button>
			<button className="green btn-flat right white-text"
				onClick={() => submitSurvey(formValues, history)}>
				Send Survey <i className="material-icons right">email</i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	// Get form values from `state` argument to mapStateToProps.
	return {
		formValues: state.form.surveyForm.values
	};
};

// withRouter allows arbitrary components to access navigation related artifacts, such as the history object.
// It then attaches these to the component as props. We will pass the history object to the submitSurvey action
// creator.
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));