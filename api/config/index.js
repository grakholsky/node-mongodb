require('dotenv').config();

module.exports = {
	API_PORT: process.env.API_PORT,
	API_MONGO_URL: process.env.API_MONGO_URL,
	API_USER_SALT: process.env.API_USER_SALT,
	API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN
};
