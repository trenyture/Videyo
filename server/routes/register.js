'use strict';

const
	express = require('express'),
	userController = require('../controllers/user');

let router = express.Router();

	router.get('/', userController.registerIndex);
	router.post('/', userController.register);

module.exports = router;