'use strict';

const
	homeRoute = require('./home'),
	loginRoute = require('./login'),
	registerRoute = require('./register'),
	logoutRoute = require('./logout'),
	profileRoute = require('./profile'),
	errorRoute = require('./error');

function init(server) {
	server.get('/', function(req, res){
		res.redirect('/home');
	});

	//GENERAL
	server.use('/home', homeRoute);
	server.use('/login', loginRoute);
	server.use('/register', registerRoute);
	server.use('/logout', logoutRoute);

	server.use('/profile', profileRoute);


	//404
	server.use('*', errorRoute);
}

module.exports = {
	init: init
};