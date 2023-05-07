import React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));

function Header() {

	const [currentUser, setCurrentUser] = useState(false);

	console.log('header');
	console.log(currentUser);
	const location = useLocation();

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("access_token"));
		console.log(data)
		if (data) {
			setCurrentUser(true);
		}
		
	  }, []);

	


	

	useEffect(() => {
		// Update the header based on the current location
		switch (location.pathname) {
		  case '/':
			document.title = 'Home - My App';
			break;
		  case '/login':
			document.title = 'Login - My App';
			break;
		  case '/register':
			document.title = 'Register - My App';
			break;
		  default:
			document.title = 'My App';
			break;
		}
	  }, [location.pathname]);

	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							SAOITR
						</Link>
					</Typography>
					{currentUser ? (
					<nav>
						<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
						</Button>

					
					</nav>) : (
					<nav>
						<Button
							href="#"
							color="primary"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Sign Up
						</Button>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					</nav>)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;