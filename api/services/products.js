const { ObjectId } = require('mongoose').Types;
const { Product } = require('../db/models');
const { toObject, mapIdToCategoryId } = require('./serviceutil');

const findProducts = async () => {
	const products = await Product.find();
	return products.map(toObject);
};

const findProduct = async productId => {
	const product = await Product.findById(new ObjectId(productId));
	return product ? toObject(product) : null;
};

const createProduct = async data => {
	const newProduct = new Product({ ...data });
	await newProduct.save();
	return { id: newProduct._id };
};

const updateProduct = async (productId, data) => {
	await Product.findByIdAndUpdate(new ObjectId(productId), { ...data });
};

const deleteProduct = async productId => {
	await Product.findByIdAndDelete(new ObjectId(productId));
};

const avgPriceByCategory = async () => {
	const grouped = await Product.aggregate([
		{ $group: { _id: '$categoryId', avgPriceByCategory: { $avg: '$price' } } }
	]);
	return grouped.map(mapIdToCategoryId);
};

const sumQuantityByCategory = async () => {
	const grouped = await Product.aggregate([
		{
			$group: {
				_id: '$categoryId',
				sumQuantityByCategory: { $sum: '$stockQuantity' }
			}
		}
	]);
	return grouped.map(mapIdToCategoryId);
};

const sumTotalByCategory = async () => {
	const grouped = await Product.aggregate([
		{
			$group: {
				_id: '$categoryId',
				sumTotalByCategory: {
					$sum: { $multiply: ['$price', '$stockQuantity'] }
				}
			}
		}
	]);
	return grouped.map(mapIdToCategoryId);
};

const minmaxPriceByCategory = async () => {
	const groupedMax = await Product.aggregate([
		{ $group: { _id: '$categoryId', maxPriceByCategory: { $max: '$price' } } }
	]);
	const groupedMin = await Product.aggregate([
		{ $group: { _id: '$categoryId', minPriceByCategory: { $min: '$price' } } }
	]);
	return {
		min: groupedMin.map(mapIdToCategoryId),
		max: groupedMax.map(mapIdToCategoryId)
	};
};

module.exports = {
	findProducts,
	findProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	avgPriceByCategory,
	sumQuantityByCategory,
	sumTotalByCategory,
	minmaxPriceByCategory
};
