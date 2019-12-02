const crypto = require('crypto');
const util = require('util');
const Joi = require('@hapi/joi');
const usersService = require('../services/users');
const config = require('../config');

const pbkdf2 = util.promisify(crypto.pbkdf2);

const signInValidation = {
	body: Joi.object({
		login: Joi.string().required(),
		password: Joi.string().required()
	})
};

const signIn = async (ctx, next) => {
	const { login, password } = ctx.request.body;
	try {
		const user = await usersService.findUser(login);
		if (!user) {
			ctx.status = 400;
			ctx.message = 'invalid login/password';
			return;
		}
		const derivedKey = await pbkdf2(
			password,
			config.API_USER_SALT,
			100000,
			64,
			'sha512'
		);
		const passwordHash = derivedKey.toString('hex');
		if (user.password !== passwordHash) {
			ctx.status = 400;
			ctx.message = 'invalid login/password';
			return;
		}
		ctx.status = 200;
		ctx.body = {
			user: {
				id: user.id,
				name: user.name
			}
		};
	} catch (e) {
		ctx.status = 500;
		ctx.message = e.message;
	}
};

module.exports = {
	signIn,
	signInValidation
};
