import axios from 'axios';

// export const baseURL = 'http://localhost:5000';
export const baseURL = 'http://ec2-54-234-159-103.compute-1.amazonaws.com'
axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 300000,
});