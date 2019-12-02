const { User } = require('../db/models');
const { toObject } = require('./serviceutil');

const findUser = async login => {
	const user = await User.findOne({ login });
	return user ? toObject(user) : null;
};

module.exports = {
	findUser
};
