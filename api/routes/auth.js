const Router = require('@koa/router');
const ctrl = require('../controllers/auth');
const { joi } = require('../middlewares/validate');

const router = new Router();
router.post('/sign-in', joi(ctrl.signInValidation), ctrl.signIn);

module.exports = router;
