const Hapi = require('hapi');
const server = new Hapi.Server();
const Inert = require('inert');
const path = require('path');

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.register(Inert, (err) => {
	if (err) throw err;
})

server.route({
	path: '/foo/bar/baz/{file}',
	method: 'GET',
	handler: {
		directory: {
			path: path.join(__dirname, '/public')
		}
	}
});

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('Server running at: ', server.info.uri);
})

