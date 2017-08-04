'use strict';

const
	express 	= require('express'),
	session 	= require('express-session'),
	favicon 	= require('serve-favicon'),
	bodyParser 	= require('body-parser'),
	mongo 		= require('mongodb'),
	database 	= new mongo.Db('videyoBDD', new mongo.Server('localhost', 27017, {auto_reconnect: true})),
	server 		= express();

function create(config){
	let routes = require('./routes');

	// Server settings
	server.set('hostname', config.hostname);
	server.set('port', config.port);
	server.set('views', config.views);
	server.set('view engine', config.engine);

	// Returns middleware that parses json
	server.use(bodyParser.json());
	server.use(session({secret: config.secret}));
	server.use(favicon(config.favicon));
	server.use('/assets', express.static(config.assets));
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));

	// Set up routes
	routes.init(server);
}

function start(){
	let hostname = server.get('hostname'),
		port = server.get('port');

	server.listen(port, function () {
		console.log('Express server listening on - http://' + hostname + ':' + port);
	});
}

module.exports = {
	create: create,
	start: start
};
