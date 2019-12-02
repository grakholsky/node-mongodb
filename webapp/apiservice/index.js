const requestPromise = require('request-promise-native');
const config = require('../config');

const apis = {
	auth: {
		signIn: {
			method: 'POST',
			path: '/sign-in'
		}
	},
	products: {
		list: {
			path: '/products'
		},
		one: {
			path: '/products/:id'
		},
		add: {
			method: 'POST',
			path: '/products'
		},
		edit: {
			method: 'PUT',
			path: '/products/:id'
		},
		del: {
			method: 'DELETE',
			path: '/products/:id'
		},
		stat: {
			avgPrice: {
				path: '/products/stat/avg-price'
			},
			sumQuantity: {
				path: '/products/stat/sum-quantity'
			},
			sumTotal: {
				path: '/products/stat/sum-total'
			},
			minmaxPrice: {
				path: '/products/stat/min-max-price'
			}
		}
	},
	categories: {
		list: {
			path: '/categories'
		},
		one: {
			path: '/products/:id'
		}
	}
};

const makeRequest = (opts, timeout) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			requestPromise(opts)
				.then(resolve)
				.catch(reject);
		}, timeout);
	});
};

const request = (api, body, params) => {
	const method = api.method || 'GET';
	let { path } = api;
	Object.keys(params || {}).forEach(key => {
		const re = new RegExp(`:${key}`, 'g');
		if (path.match(re)) {
			path = path.replace(re, params[key]);
		}
	});
	const options = {
		method,
		uri: `${config.API_URL}${path}?API_ACCESS_TOKEN=${config.API_ACCESS_TOKEN}`,
		body,
		json: true
	};
	return makeRequest(options, config.WEBAPP_REQUEST_TIMEOUT);
};

module.exports = {
	request,
	apis
};
