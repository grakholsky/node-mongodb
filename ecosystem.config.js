module.exports = {
	apps: [
		{
			name: 'api',
			script: './api/app.js',
			node_args: '-r dotenv/config',
			instances: '2',
			exec_mode: 'cluster'
		},
		{
			name: 'webapp',
			script: './webapp/app.js',
			node_args: '-r dotenv/config',
			instances: '2',
			exec_mode: 'cluster'
		}
	]
};
