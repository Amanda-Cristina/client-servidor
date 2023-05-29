import axios from 'axios';
import { baseURL } from './globals';


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('token')
			? `Bearer ${localStorage.getItem("token")}`
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

console.log(axiosInstance.Authorization)

export default axiosInstance;