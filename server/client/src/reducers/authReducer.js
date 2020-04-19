import { FETCH_USER } from '../actions/types';

// Default value of state is null, which represents the state where request has not yet completed
// or the app has just initialized.
export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			// Return false in-case action.payload is an empty object, or
			// the user is not logged in.
			return action.payload || false;
		default:
			return state;
	}
};