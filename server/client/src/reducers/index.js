import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
	// auth piece of state is manufactured by the auth reducer
	// authReducer records whether the user is logged in or not in our redux store
	auth: authReducer,
	// All form state data will be available under the `form` reducer.
	form: reduxForm,
	surveys: surveysReducer
});