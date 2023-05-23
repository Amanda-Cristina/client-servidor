import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import md5 from 'md5';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Perfil(props) {
	const history = useHistory();

	
	const initialFormData = Object.freeze({
		email: '',
		name: '',
		password: '',
	});

	
	const getStoredData = () => {
		const storedData = {
		  name: localStorage.getItem('name'),
		  email: localStorage.getItem('email'),
		  password: ''
		};
		if (storedData.name && storedData.email) {
		  return storedData;
		}
		return initialFormData;
	  };

	  useEffect(() => {
		const id = localStorage.getItem('id');
		axiosInstance
				.get(`/users/${id}`)
				.then((res) => {
					updateFormData(
						{name:res.data.name,
						email:res.data.email,
						password: ''
						})
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
	  }, []);

	const [formData, updateFormData] = useState(initialFormData)
	const [formErrors, setFormErrors] = useState(initialFormData)
	const [error, setError] = useState(false);
	

	const validateForm = () => {
		const { email, name, password} = formData;
		const errors = {};
	  
		if (!email) {
			errors.email = 'Email is required';
		  } else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid';
		  }
  
		  if (!name) {
			  errors.name = 'Name is required';
			} else if (name.length < 2) {
			  errors.name = 'Name must be at least 2 characters';
			}
		
		 

	  
		setFormErrors(errors);
	  
		// Return true if there are no errors, false otherwise
		return Object.keys(errors).length === 0;
	  };

	const handleErrorClose = () => {
		setError(false);
	  };

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		if (validateForm()){
			const id = localStorage.getItem('id');
			axiosInstance
				.put(`/users/${id}`, {
					email: formData.email,
					name: formData.name,
					password: formData.password.length === 0 ? null : md5(formData.password)
				})
				.then((res) => {
					history.push('/perfil');
					console.log(res);
					console.log(res.data);
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
		}
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Perfil
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							
							<TextField
								variant="outlined"
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								error={!!formErrors.email}
								helperText={formErrors.email}
								value={formData.email}
							  
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								id="name"
								label="Username"
								name="name"
								autoComplete="username"
								onChange={handleChange}
								error={!!formErrors.name}
								helperText={formErrors.name}
								value={formData.name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
								error={!!formErrors.password}
								helperText={formErrors.password}
							/>
						</Grid>
						
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update
					</Button>
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
				</form>
			</div>
		</Container>
	);
}