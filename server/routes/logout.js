'use strict';

const
	express = require('express'),
	loginController = require('../controllers/login');

let router = express.Router();

	router.get('/', loginController.destroy);

module.exports = router;