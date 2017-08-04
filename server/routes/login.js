'use strict';

const
	express = require('express'),
	userController = require('../controllers/user');

let router = express.Router();

	router.get('/', userController.loginIndex);
	router.post('/', userController.login);

module.exports = router;