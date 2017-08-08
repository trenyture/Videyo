'use strict';

const
	mongo = require('../services/database'),
	database = mongo.init(),
	crypt = require('bcrypt');

function index(req, res)
{
	let sess = req.session;
	if (sess.logged === true)
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
		let valid = true,
			errorMsg = [];
		if (req.body.pseudo === ''){
			valid = false;
			errorMsg.push('Veuillez entrer un Identifiant ou une Adresse Mail');
		}
		if (req.body.password === ''){
			valid = false;
			errorMsg.push('Veuillez entrer un mot de passe');
		}
		if(valid === false) {
			res.send(JSON.stringify(errorMsg));
		}else{
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
												sess.pseudo = req.body.pseudo;
												sess.logged = true;
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