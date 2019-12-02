const { ObjectId } = require('mongoose').Types;
const { toObject } = require('./serviceutil');
const { Category } = require('../db/models');

const findCategories = async () => {
	const categories = await Category.find();
	return categories.map(toObject);
};

const findCategory = async categoryId => {
	const category = await Category.findById(new ObjectId(categoryId));
	return category ? toObject(category) : null;
};

module.exports = {
	findCategories,
	findCategory
};
