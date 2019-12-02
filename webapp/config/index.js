require('dotenv').config();

module.exports = {
	API_URL: process.env.API_URL,
	API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
	WEBAPP_PORT: process.env.WEBAPP_PORT,
	WEBAPP_URL: process.env.WEBAPP_URL,
	WEBAPP_SESSION_SECRET: process.env.WEBAPP_SESSION_SECRET,
	WEBAPP_REQUEST_TIMEOUT: process.env.WEBAPP_REQUEST_TIMEOUT
};
