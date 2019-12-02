const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const views = require('koa-views');
const koaLogger = require('koa-logger');
const serve = require('koa-static');
const CSRF = require('koa-csrf');
const session = require('koa-session');
const methodOverride = require('koa-methodoverride');
const config = require('./config');
const router = require('./routes/routes');

const app = new Koa();
app.keys = [config.WEBAPP_SESSION_SECRET];
app
	.use(views(path.join(__dirname, '/views'), { extension: 'pug' }))
	.use(serve(path.join(__dirname, '/views/static')))
	.use(koaLogger())
	.use(session(app))
	.use(koaBody())
	.use(
		new CSRF({
			invalidTokenMessage: 'Invalid CSRF token',
			invalidTokenStatusCode: 403,
			excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
			disableQuery: false
		})
	)
	.use(methodOverride('_method'))
	.use(router.routes());

(async () => {
	app.listen(config.WEBAPP_PORT);
})();
