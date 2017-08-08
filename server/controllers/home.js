'use strict';

var sess;

function index (req, res) {
	sess = req.session;
	if (sess.logged === true) {
		res.render('index', {logged: true, name: sess.pseudo, });
	} else {
		res.redirect('/login');
	}
}

function error(req, res) {
	res.status(404);
	res.render('404');
}

module.exports = {
	index: index,
	error: error
};