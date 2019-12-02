const Koa = require('koa');
const mongoose = require('mongoose');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const config = require('./config');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

const MONGOOSE_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const app = new Koa();
app
	.use(koaBody())
	.use(koaLogger())
	.use(async (ctx, next) => {
		if (ctx.query.API_ACCESS_TOKEN !== config.API_ACCESS_TOKEN) {
			ctx.throw(401, 'Access denied');
			return;
		}
		await next();
	})
	.use(authRouter.routes())
	.use(categoriesRouter.routes())
	.use(productsRouter.routes());

(async () => {
	await mongoose.connect(config.API_MONGO_URL, {
		...MONGOOSE_OPTIONS
	});
	app.listen(config.API_PORT);
})();
