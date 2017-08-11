'use strict';

const
	mongo = require('../services/database'),
	validator = require('../services/validate'),
	htmlspecialchars = require('../services/htmlspecialchars'),
	database = mongo.init(),
	crypt = require('bcrypt');

function index(req, res)
{
	let sess = req.session;
	if (sess._id)
	{
		res.redirect('/');
	}
	else
	{
		res.render('login');
	}
}

function create(req, res)
{
	if (req.body.pseudo && req.body.password) {
		Object.keys(req.body).map(function(objectKey, index) {
			req.body[objectKey]  = htmlspecialchars.encode(req.body[objectKey].trim());
		});
		let validPseudo = validator.pseudo(req.body.pseudo),
			validPass = validator.password(req.body.password);
		if(validPseudo === true && validPass === true){
			database.open(function(err, db) {
				if(!err) {
					db.collection('usersBDD', function(err, usersdb) { 
						if (!err) {
							var cursor = usersdb.find({ 
								$or : [{"pseudo": req.body.pseudo}, {"mail": req.body.pseudo}]
							}); 
							cursor.toArray(function(err, doc) {
								database.close();
								if(!err){
									if(doc.length > 0){
										crypt.compare(req.body.password, doc[0].password, function(err, cond) {
											if(cond === true){
												let sess = req.session;
												sess.pseudo = htmlspecialchars.decode(doc[0].pseudo);
												sess._id = doc[0]._id;
												database.close();
												res.send(true);
											}else{
												res.send('Le mot de passe est incorrect');
											}							    	 
										});
									}else{
										database.close();
										res.send("Cet identifiant ou cette adresse mail n'existe pas");
									}
								}else{
									database.close();
									res.send('Il y a un problème avec la Base de Donnée...');
								}
							});
						} else {
							database.close();
							res.send('Il y a un problème avec la connection à la Base de donnée');
					    }
					});
				}else{
					database.close();
					res.send('Il y a un problème avec la connection à la Base de Donnée...');
				}
			});
		}else{
			res.send(JSON.stringify(errorMsg));
		}
	} else {
		res.send('Vous devez entrer votre identifiant et votre mot de passe!');
	}
}

function destroy(req, res){
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
			res.redirect('/');
		} else {
			res.redirect('/login');
		}
	});
}

module.exports = {
	index: index,
	create: create,
	destroy: destroy
};