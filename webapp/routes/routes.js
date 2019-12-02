const Router = require('@koa/router');
const { request, apis } = require('../apiservice');

const router = new Router();

const isAuthenticated = async (ctx, next) => {
	if (!ctx.session.user) {
		await ctx.redirect('/sign-in');
	} else {
		await next();
	}
};

router
	.get('/', isAuthenticated, async (ctx, next) => {
		await ctx.redirect('/products');
	})
	.get('/sign-in', async (ctx, next) => {
		if (ctx.session.user) {
			await ctx.redirect('/');
		} else {
			await ctx.render('sign-in', {
				csrf: ctx.csrf,
				error: ctx.session.flashError
			});
			delete ctx.session.flashError;
		}
	})
	.post('/sign-in', async (ctx, next) => {
		const { login, password } = ctx.request.body;
		try {
			const { user } = await request(apis.auth.signIn, {
				login,
				password
			});
			ctx.session.user = user;
			ctx.redirect('/products');
		} catch (e) {
			ctx.session.flashError = e.error;
			await ctx.redirect('/sign-in');
		}
	})
	.get('/products', isAuthenticated, async (ctx, next) => {
		const products = await request(apis.products.list);
		const categories = await request(apis.categories.list);
		await ctx.render('products/list', {
			csrf: ctx.csrf,
			error: ctx.session.flashError,
			title: 'Products',
			categories,
			products
		});
		delete ctx.session.flashError;
	})
	.get('/products/new', isAuthenticated, async (ctx, next) => {
		const categories = await request(apis.categories.list);
		await ctx.render('products/new', {
			csrf: ctx.csrf,
			error: ctx.session.flashError,
			title: 'New Product',
			categories
		});
		delete ctx.session.flashError;
	})
	.post('/products', isAuthenticated, async (ctx, next) => {
		const { name, price, stockQuantity, categoryId } = ctx.request.body;
		try {
			await request(apis.products.add, {
				name,
				price,
				stockQuantity,
				categoryId
			});
			await ctx.redirect('/products');
		} catch (e) {
			ctx.session.flashError = e.error;
			await ctx.redirect('/products/new');
		}
	})
	.get('/products/:id/edit', isAuthenticated, async (ctx, next) => {
		try {
			const categories = await request(apis.categories.list);
			const product = await request(apis.products.one, null, {
				id: ctx.params.id
			});
			await ctx.render('products/edit', {
				csrf: ctx.csrf,
				error: ctx.session.flashError,
				title: 'Edit Product',
				product,
				categories
			});
			delete ctx.session.flashError;
		} catch (e) {
			ctx.status = 500;
		}
	})
	.put('/products/:id', isAuthenticated, async (ctx, next) => {
		const { name, price, stockQuantity, categoryId } = ctx.request.body;
		try {
			await request(
				apis.products.edit,
				{
					name,
					price,
					stockQuantity,
					categoryId
				},
				{
					id: ctx.params.id
				}
			);
			await ctx.redirect('/products');
		} catch (e) {
			ctx.session.flashError = e.error;
			await ctx.redirect(`/products/${ctx.params.id}/edit`);
		}
	})
	.del('/products/:id', isAuthenticated, async (ctx, next) => {
		try {
			await request(apis.products.del, null, { id: ctx.params.id });
		} catch (e) {
			ctx.session.flashError = e.error;
		}
		await ctx.redirect('/products');
	})
	.get('/logout', isAuthenticated, async (ctx, next) => {
		delete ctx.session.user;
		await ctx.redirect('/sign-in');
	})
	.get('/stat', isAuthenticated, async (ctx, next) => {
		try {
			const categories = await request(apis.categories.list);
			const avgPrice = await request(apis.products.stat.avgPrice);
			const sumQuantity = await request(apis.products.stat.sumQuantity);
			const sumTotal = await request(apis.products.stat.sumTotal);
			const minmaxPrice = await request(apis.products.stat.minmaxPrice);
			const merged = [].concat(
				avgPrice,
				sumQuantity,
				sumTotal,
				minmaxPrice.min,
				minmaxPrice.max
			);
			const stats = {};
			for (let i = 0; i < merged.length; i += 1) {
				const key = merged[i].categoryId;
				stats[key] = stats[key] || {};
				stats[key] = { ...stats[key], ...merged[i] };
			}
			await ctx.render('products/stat', {
				title: 'Statistic',
				categories,
				stats
			});
		} catch (e) {
			ctx.status = 500;
		}
	});

module.exports = router;
