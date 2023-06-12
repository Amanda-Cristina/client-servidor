import React, { useEffect, useState } from 'react';
import UserPosts from './userPosts';
import PostLoadingComponent from './postLoading';
import { baseURL } from '../globals';
import { makeStyles } from '@material-ui/core/styles';

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
    const PostLoading = PostLoadingComponent(UserPosts);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});


	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = baseURL+'occurrences';
		fetch(apiUrl)
			.then((data) => data.json())
			.then((posts) => {
				setAppState({ loading: false, posts: posts });
			}).catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
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
	}, [setAppState]);
    const classes = useStyles();

	return (
		<div className={classes.paper}>
			<h1>Occurrence History</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
           
		</div>

   
	);

}