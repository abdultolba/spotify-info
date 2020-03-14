import Spotify from 'spotify-web-api-js';
import config from '../config';
const s = new Spotify();

const EXPIRATION_TIME = 3600 * 1000;
export const setLocalAccessToken = token => {
	setExpirationTimestamp();
	localStorage.setItem('spotify_access_token', token);
};
export const setLocalRefreshToken = token => {
	localStorage.setItem('spotify_refresh_token', token);
};
export const setExpirationTimestamp = () => {
	const dateObj = new Date(Date.now() + EXPIRATION_TIME).getTime();
	window.localStorage.setItem('spotify_expiration_timestamp', dateObj);
};

export const getLocalAccessToken = () =>
	window.localStorage.getItem('spotify_access_token');
export const getLocalRefreshToken = () => {
	localStorage.getItem('spotify_refresh_token');
};
export const getExpirationTimestamp = () =>
	window.localStorage.getItem('spotify_expiration_timestamp');

export const spotify = () => {
	s.setAccessToken(getLocalAccessToken());
	return s;
};

export const logout = () => {
	window.localStorage.removeItem('spotify_access_token');
	window.localStorage.removeItem('spotify_refresh_token');
	window.localStorage.removeItem('spotify_expiration_timestamp');
	window.location.reload();
};

let expirationChecker;

const refreshAccessToken = async () => {
	try {
		const res = await fetch(
			`${
				config.backendUrl
			}/refresh_token?refresh_token=${getLocalRefreshToken()}`
		);
		const { access_token } = await res.json();
		setLocalAccessToken(access_token);
	} catch (e) {
		logout();
	}
};

const runExpirationChecker = () => {
	// Clear existing checker
	if (expirationChecker) clearTimeout(expirationChecker);
	// Get expiration in milliseconds
	const expiresInMillis = getExpirationTimestamp() - new Date().getTime();
	console.log(`Token expires in ${expiresInMillis}`);
	expirationChecker = setTimeout(async () => {
		await refreshAccessToken();
		runExpirationChecker();
	}, expiresInMillis);
};

export const checkAuth = async () => {
	if (!getLocalAccessToken()) {
		throw new Error('Missing tokens');
	}

	if (new Date().getTime() > getExpirationTimestamp()) {
		await refreshAccessToken();
		window.location.reload();
		return;
	}

	s.setAccessToken(getLocalAccessToken());
	try {
		await s.getMe();
		runExpirationChecker();
	} catch (e) {
		throw e;
	}
};
