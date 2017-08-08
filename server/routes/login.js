'use strict';

const
	express = require('express'),
	loginController = require('../controllers/login');

let router = express.Router();

	router.get('/', loginController.index);
	router.post('/', loginController.create);

module.exports = router;