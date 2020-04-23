import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user');

	dispatch({
		type: FETCH_USER,
		payload: response.data
	});
};

export const handleToken = (token) => async dispatch => {
	const response = await axios.post('/api/stripe', token);

	dispatch({
		type: FETCH_USER,
		payload: response.data
	});
};

export const submitSurvey = (values, history) => async dispatch => {
	const response = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({
		type: FETCH_USER,
		payload: response.data
	});
};

export const fetchSurveys = () => async dispatch => {
	const response = await axios.get('/api/surveys');

	dispatch({
		type: FETCH_SURVEYS,
		payload: response.data
	});
};