const Joi = require('@hapi/joi');

const categoriesService = require('../services/categories');

const getCategoryValidation = {
	params: Joi.object({
		id: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required()
	})
};

const getCategories = async (ctx, next) => {
	const categories = await categoriesService.findCategories();
	ctx.status = 200;
	ctx.body = categories;
};

const getCategory = async (ctx, next) => {
	const category = await categoriesService.findCategory(ctx.params.id);
	if (!category) {
		ctx.status = 404;
		ctx.message = 'category not found';
		return;
	}
	ctx.status = 200;
	ctx.body = category;
};

module.exports = {
	getCategories,
	getCategory,
	getCategoryValidation
};
