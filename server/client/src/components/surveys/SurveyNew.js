// SurveyNew is used to show SurveyForm and SurveyFormReview components
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	// Component level state can co-exist with redux global state. This state is local to the component,
	// and the redux store has no idea about this state.
	state = {
		showFormReview: false
	};

	renderContent() {
		if (this.state.showFormReview) {
			return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>;
		}

		return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
	}

	render() {
		return (
			<div>{this.renderContent()}</div>
		);
	}
}

export default reduxForm({
	// If we use the same namespace as other forms, then we will get the same form data in this component
	// as in the other component.
	// Note: We did not provide the destroyOnUnmount: false property that we did in SurveyForm. SurveyNew is
	// the parent of SurveyForm and SurveyFormReview. So if we toggle between SurveyForm and SurveyFormReview,
	// the form values are *not* dumped, but if we click Cancel, then SurveyNew is unmounted, and the form values
	// *will* be dumped. After this, if I click the add button, the old data will no longer appear.
	form: 'surveyForm'
})(SurveyNew);