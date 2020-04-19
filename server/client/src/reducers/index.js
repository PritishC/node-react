import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
	// auth piece of state is manufactured by the auth reducer
	// authReducer records whether the user is logged in or not in our redux store
	auth: authReducer
});