const Hapi = require('hapi');
const server = new Hapi.Server();
const Joi = require('joi');


server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/chicken/{breed}',
	method: 'GET',
	handler: (request, reply) => {
		reply(request.params.breed);
	},
	config: {
		validate: {
			params: {
				with: Joi.string().required(),
				parameters: Joi.string().required()
			}
		}
	}
});

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('Server running at: ', server.info.uri);
});

