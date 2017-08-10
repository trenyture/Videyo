'use strict';


const
	mongo = require('../services/database'),
	database = mongo.init();

let sess;

function index (req, res) {
	sess = req.session;
	if (sess._id){
		let id = req.params.id;
		database.open(function(err, db){
			if (!err) {
				db.collection('usersBDD', function(err, usersdb) {
					if (!err) {
						let cursor = usersdb.find({"_id": id});
						cursor.toArray(function(err, doc) {
							database.close();
							if(!err){
								console.log(doc);
								res.render('user', {_id: sess._id, name: sess.pseudo, });
							}else{
								res.redirect('/');
							}
						});
					}else{
						res.redirect('/');
					}
				});
			}else{
				res.redirect('/');
			}
		});
	} else {
		res.redirect('/login');
	}
}

module.exports = {
	index: index
};