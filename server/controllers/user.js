'use strict';

let sess;

function index (req, res) {
	let id = req.params.id;
	console.log(id);
	sess = req.session;
	if (sess.logged === true) {
		res.render('index', {logged: true, name: sess.pseudo, });
	} else {
		res.redirect('/login');
	}
}

module.exports = {
	index: index
};