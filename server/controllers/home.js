'use strict';

let sess;

function index (req, res) {
	sess = req.session;
	if (sess._id) {
		res.render('index', {_id: sess._id, name: sess.pseudo, });
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