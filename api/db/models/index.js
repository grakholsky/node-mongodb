const mongoose = require('mongoose');

const schemaUser = new mongoose.Schema({
	login: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const schemaCategory = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

const schemaProduct = new mongoose.Schema({
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	stockQuantity: {
		type: Number,
		required: true,
		min: 0
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

schemaUser.set('toObject', { versionKey: false });
schemaCategory.set('toObject', { versionKey: false });
schemaProduct.set('toObject', { versionKey: false });

module.exports = {
	User: mongoose.model('User', schemaUser),
	Category: mongoose.model('Category', schemaCategory),
	Product: mongoose.model('Product', schemaProduct)
};
