'use strict';

const
	Hashids = require('hashids'),
	crypt = require('bcrypt'),
	validator = require('../services/validate'),
	htmlspecialchars = require('../services/htmlspecialchars'),
	mongo = require('../services/database'),
	database = mongo.init();

function index(req, res)
{
	let sess = req.session;
	if (sess._id)
	{
		res.redirect('/');
	}
	else
	{
		res.render('register');
	}
}

function create(req, res)
{
	if(req.body.mail && req.body.pseudo && req.body.password && req.body.password_verif && req.body.conditions){
		Object.keys(req.body).map(function(objectKey, index) {
			req.body[objectKey]  = htmlspecialchars.encode(req.body[objectKey].trim());
		});
		//VERIFICATIONS VARIABLES
		let validEmail = validator.email(req.body.mail),
			validPseudo = validator.pseudo(req.body.pseudo),
			validPass = validator.password(req.body.password, req.body.password_verif);
		if (validEmail === true && validPseudo === true && validPass === true) {
			//BASE DE DONNÉE
			database.open(function(err, db){
				if(!err){
					db.collection('usersBDD', function(err, usersdb){
						usersdb.count({}, function(err, result){
							if (!err){
								let 
									hashids = new Hashids('', 10),
									datas = {
										"_id": hashids.encode(result),
										"mail": req.body.mail.toLowerCase(),
										"pseudo": req.body.pseudo
									};

								usersdb.insert(datas, function(err, result){
									if(!err){
										let sess = req.session;
										sess.pseudo = htmlspecialchars.decode(req.body.pseudo);
										sess._id = datas._id;
										crypt.hash(req.body.password, 10, function(err, hash) {
											usersdb.update({"mail":req.body.mail.toLowerCase()}, {$set: {password:hash}}, {multi:true}, function (err) {
												database.close();
												if(!err){
													res.send(true);
												}else{
													res.send('Il y a un problème avec la base de donnée');
												}
											}); 
										});
									}else{
										if(err.code === 11000){
											usersdb.count({"mail": req.body.mail}, function(err, result){
												if(!err){
													database.close();
													if (result === 1){
														res.send('Cette adresse mail est déjà prise');
													}else{
														res.send('Ce pseudonnyme est déjà utilisé');	
													}
												}else{
													database.close();
													res.send('Il y a un problème avec la base de donnée');
												}
											});
										}else{
											database.close();
											res.send('Il y a un problème avec la base de donnée');
										}
									}
								});
							}else{
								database.close();
								res.send('Il y a un problème avec la base de donnée');
							}
						});
					});
				}else{
					database.close();
					res.send('Il y a un problème avec la base de donnée');
				}
			});
		} else {
			res.send([validEmail, validPseudo, validPass]);
		}
	}else{
		res.send('Tous les champs sont obligatoires!');
	}
}

module.exports = {
	index: index,
	create: create
};