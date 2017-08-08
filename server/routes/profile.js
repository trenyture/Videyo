'use strict';

const
	express = require('express'),
	userController = require('../controllers/user');

let router = express.Router();

	router.get('/:id', userController.index);

module.exports = router;