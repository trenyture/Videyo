'use strict';

const
	express = require('express'),
	registerController = require('../controllers/register');

let router = express.Router();

	router.get('/', registerController.index);
	router.post('/', registerController.create);

module.exports = router;