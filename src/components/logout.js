import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default function Logout() {
	const history = useHistory();
	const [error, setError] = useState(false);

	const handleErrorClose = () => {
		setError(false);
		history.push('/login');
	  };

	useEffect(() => {
		axiosInstance.get('/logout').then((res) => {
			console.log(res);
			localStorage.removeItem('access_token');
			localStorage.removeItem('name');
			localStorage.removeItem('email');
			axiosInstance.defaults.headers['Authorization'] = null;
			history.push('/login');		
		}).catch((error) => {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				setError(error.response.data.message); // set the error message state
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
	});
	return (
		<Dialog open={error} onClose={handleErrorClose}>
		<DialogTitle>Error</DialogTitle>
		<DialogContent>
		<p>{error}</p>
		</DialogContent>
		<DialogActions>
		<Button onClick={handleErrorClose} color="primary">
			OK
		</Button>
		</DialogActions>
		</Dialog>
	)
}