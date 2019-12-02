const Joi = require('@hapi/joi');

const productsService = require('../services/products');

const getProductValidation = {
	params: Joi.object({
		id: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required()
	})
};

const addProductValidation = {
	body: Joi.object({
		categoryId: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required(),
		name: Joi.string().required(),
		price: Joi.number()
			.precision(2)
			.required(),
		stockQuantity: Joi.number()
			.integer()
			.required()
	})
};

const editProductValidation = {
	body: Joi.object({
		categoryId: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required(),
		name: Joi.string().required(),
		price: Joi.number()
			.precision(2)
			.required(),
		stockQuantity: Joi.number()
			.integer()
			.required()
	}),
	params: Joi.object({
		id: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required()
	})
};

const deleteProductValidation = {
	params: Joi.object({
		id: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required()
	})
};

const getProducts = async (ctx, next) => {
	const products = await productsService.findProducts();
	ctx.status = 200;
	ctx.body = products;
};

const getProduct = async (ctx, next) => {
	const product = await productsService.findProduct(ctx.params.id);
	if (!product) {
		ctx.status = 404;
		ctx.message = 'product not found';
		return;
	}
	ctx.status = 200;
	ctx.body = product;
};

const addProduct = async (ctx, next) => {
	const { id } = await productsService.createProduct(ctx.request.body);
	ctx.status = 201;
	ctx.body = { id };
};

const editProduct = async (ctx, next) => {
	const product = await productsService.findProduct(ctx.params.id);
	if (!product) {
		ctx.status = 404;
		ctx.message = 'product not found';
		return;
	}
	await productsService.updateProduct(ctx.params.id, ctx.request.body);
	ctx.status = 200;
};

const deleteProduct = async (ctx, next) => {
	const product = await productsService.findProduct(ctx.params.id);
	if (!product) {
		ctx.status = 404;
		ctx.message = 'product not found';
		return;
	}
	await productsService.deleteProduct(ctx.params.id);
	ctx.status = 200;
};

const avgPrice = async (ctx, next) => {
	const result = await productsService.avgPriceByCategory();
	ctx.status = 200;
	ctx.body = result;
};

const sumQuantity = async (ctx, next) => {
	const result = await productsService.sumQuantityByCategory();
	ctx.status = 200;
	ctx.body = result;
};

const sumTotal = async (ctx, next) => {
	const result = await productsService.sumTotalByCategory();
	ctx.status = 200;
	ctx.body = result;
};

const minmaxPrice = async (ctx, next) => {
	const { min, max } = await productsService.minmaxPriceByCategory();
	ctx.status = 200;
	ctx.body = { min, max };
};

module.exports = {
	getProducts,
	getProduct,
	getProductValidation,
	addProduct,
	addProductValidation,
	editProduct,
	editProductValidation,
	deleteProduct,
	deleteProductValidation,
	avgPrice,
	sumQuantity,
	sumTotal,
	minmaxPrice
};
