import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import md5 from 'md5';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login(props) {
	const history = useHistory();
	const { setIsLoading } = props;
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [formErrors, setFormErrors] = useState(initialFormData);
	const [error, setError] = useState(false);

	const validateForm = () => {
		const { email, password} = formData;
		const errors = {};
	  
		if (!email) {
		  errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
		  errors.email = 'Email is invalid';
		}

	  
		if (!password) {
		  errors.password = 'Password is required';
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
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		if (validateForm()){
			const hashedPassword = md5(formData.password);
			axiosInstance
				.post(`/login`, {
					email: formData.email,
					password: hashedPassword,
				})
				.then((res) => {
					localStorage.setItem('token', res.data.token);
					localStorage.setItem('name', res.data.name);
					localStorage.setItem('email', res.data.email);
					localStorage.setItem('id', res.data.id);
					axiosInstance.defaults.headers['Authorization'] =
						'Bearer ' + localStorage.getItem('token');
					setIsLoading(true);
					history.push('/');
					//console.log(res);
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
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
						error={!!formErrors.email}
						helperText={formErrors.email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
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
					
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
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