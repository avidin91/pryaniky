import axios from 'axios';
import {getTokenFromLocalStorage} from "../utils/localstorage.helper";

export const instanceNoHeaders = axios.create({
	baseURL: 'https://test.v5.pryaniky.com',
});

export const instanceWithHeaders = axios.create({
	baseURL: 'https://test.v5.pryaniky.com',
	headers: {
		'x-auth': getTokenFromLocalStorage()
	},
});
