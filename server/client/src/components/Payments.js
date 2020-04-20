import React, { Component } from 'react';
// React library that creates a component out of the Stripe checkout form
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		// 500 cents = $5
		// token: a callback function which is called after we have received our token object from the Strip server
		// Note: On the client side, environment variables and keys are dumped in .env files. Subsequently they are
		// automatically available on process.env.
		// We add a button element as a child inside the StripeCheckout component to customize the look.
		return (
			<StripeCheckout amount={500} token={token => this.props.handleToken(token)} 
				stripeKey={process.env.REACT_APP_STRIPE_KEY} 
				description="500INR for 5 email credits">
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);