'use strict';


const
	htmlspecialchars = require('../services/htmlspecialchars'),
	mongo = require('../services/database'),
	database = mongo.init();

let sess;

function index (req, res) {
	sess = req.session;
	if (sess._id && req.params.id){
		let id = req.params.id;
		database.open(function(err, db){
			if (!err) {
				db.collection('usersBDD', function(err, usersdb) {
					if (!err) {
						let cursor = usersdb.find({"_id": id});
						cursor.toArray(function(err, doc) {
							database.close();
							if(!err){
								Object.keys(doc[0]).map(function(objectKey, index) {
									doc[0][objectKey]  = htmlspecialchars.decode(doc[0][objectKey].trim());
								});
								res.render('user', {_id: sess._id, name: sess.pseudo, profile: doc[0]});
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
		res.redirect('/');
	}
}

module.exports = {
	index: index
};