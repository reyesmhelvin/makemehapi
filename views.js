const Hapi = require('hapi');
const server = new Hapi.Server();
const Vision = require('vision');
const path = require('path');

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.register(Vision, (err) => {
	if (err) throw err;
});

server.route({
	path: '/{foo}',
	method: 'GET',
	handler: {
		view: 'index.html'
	}
});

server.views({
	engines: {
		html: require('handlebars')
	},
	path: path.join(__dirname, 'templates')
});

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('Server running at: ', server.info.uri);
});

