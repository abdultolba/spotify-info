const config = {
	backendUrl:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:9000/.netlify/functions/app'
			: 'https://spotify-info-server.netlify.com/.netlify/functions/app',
	repoUrl: 'https://github.com/abdultolba/spotify-info',
};

export default config;
