const Hapi = require('hapi');
const server = new Hapi.Server();
const Fs = require('fs');
const path = require('path');
const rot13 = require("rot13-transform");

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.register(rot13, (err) => {
	if (err) throw err;
});

server.route({
	path: '/',
	method: 'GET',
	handler: (request, reply) => {
		reply('asd');
	}
});

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('Server running at: ', server.info.uri);
});

