const joi = schema => {
	return async (ctx, next) => {
		try {
			if (schema.params) {
				await schema.params.validateAsync({ ...ctx.params });
			}
			if (schema.body) {
				await schema.body.validateAsync({ ...ctx.request.body });
			}
			await next();
		} catch (e) {
			ctx.status = 400;
			ctx.message = e.message;
		}
	};
};

module.exports.joi = joi;
