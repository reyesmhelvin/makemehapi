const Hapi = require('hapi');
const server = new Hapi.Server();
const Joi = require('joi');


server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/login',
	method: 'POST',
	handler: (request, reply) => {
		reply('login successful');
	},
	config: {
		validate: {
			payload: Joi.object({
				username: Joi.string(),
				password: Joi.string().alphanum(),
				accessToken: Joi.string().alphanum(),
				birthyear: Joi.number().integer().min(1900).max(2013),
				email: Joi.string().email()
			})
			.options({allowUnknown: true})
			.with('username','birthyear')
			.without('password', 'accessToken')
		}
	}
});

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('Server running at: ', server.info.uri);
});

