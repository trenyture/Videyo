'use strict';

const
	mongo = require('mongodb');

function init() {
	return new mongo.Db('videyoBDD', new mongo.Server('localhost', 27017, {auto_reconnect: true}));
}

module.exports = {
	init: init
};