'use strict';

const
	express = require('express'),
	userController = require('../controllers/user');

let router = express.Router();

	router.get('/logout', userController.logout);

module.exports = router;