const Router = require('@koa/router');
const ctrl = require('../controllers/categories');
const { joi } = require('../middlewares/validate');

const router = new Router({ prefix: '/categories' });
router
	.get('/', ctrl.getCategories)
	.get('/:id', joi(ctrl.getCategoryValidation), ctrl.getCategory);

module.exports = router;
