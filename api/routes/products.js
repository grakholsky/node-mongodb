const Router = require('@koa/router');
const ctrl = require('../controllers/products');
const { joi } = require('../middlewares/validate');

const router = new Router({ prefix: '/products' });
router
	.get('/', ctrl.getProducts)
	.get('/:id', joi(ctrl.getProductValidation), ctrl.getProduct)
	.post('/', joi(ctrl.addProductValidation), ctrl.addProduct)
	.put('/:id', joi(ctrl.editProductValidation), ctrl.editProduct)
	.del('/:id', joi(ctrl.deleteProductValidation), ctrl.deleteProduct)
	.get('/stat/avg-price', ctrl.avgPrice)
	.get('/stat/sum-quantity', ctrl.sumQuantity)
	.get('/stat/sum-total', ctrl.sumTotal)
	.get('/stat/min-max-price', ctrl.minmaxPrice);

// db.products.aggregate([ { $group: { _id: "$categoryId", total: { $avg: "$price" } } } ]);

// db.products.aggregate([ { $group: { _id: "$categoryId", total: { $sum: "$stockQuantity" } } } ])

// db.products.aggregate([ { $group: { _id: "$categoryId", total: { $sum: { $multiply: [ "$price", "$stockQuantity" ] } } } } ])

// db.products.aggregate([ { $group: { _id: "$categoryId", total: { $max: "$price" } } } ])
// db.products.aggregate([ { $group: { _id: "$categoryId", total: { $min: "$price" } } } ])

module.exports = router;
