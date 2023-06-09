import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts';
import PostLoadingComponent from './components/postLoading';
import { baseURL } from './globals';



function App() {
	const PostLoading = PostLoadingComponent(Posts);
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

	return (
		<div className="App">
			<h1>Ocorrências</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;
