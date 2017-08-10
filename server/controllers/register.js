'use strict';

const
	Hashids = require('hashids'),
	crypt = require('bcrypt'),
	validator = require('../services/validate'),
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
		let valid = true,
			errorMsg = [];
		//VERIFICATIONS VARIABLES
		if(req.body.mail === ''){
			valid = false;
			errorMsg.push('Veuillez renseigner un email');
		}else{
			if(!validator.email(req.body.mail)){
				valid = false;
				errorMsg.push('Veuillez entrer un email valide');
			}
		}
		if(req.body.pseudo === ''){
			valid = false;
			errorMsg.push('Veuilliez renseigner un pseudonnyme');
		}else{
			if(req.body.pseudo.length < 5){
				valid = false;
				errorMsg.push('Le pseudonnyme est trop court!');	
			}
		}
		if (req.body.password === '' || req.body.password_verif === '') {
			valid = false;
			errorMsg.push('Vous devez renseigner votre mot de passe ainsi que sa vérification');
		}else{
			if(!validator.passwordStrength(req.body.password)){
				valid = false;
				errorMsg.push('Le mot de passe doit au moins contenir 10 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial');
			}

			if(!validator.password(req.body.password, req.body.password_verif)){
				valid = false;
				errorMsg.push('Les mots de passe ne correspondent pas');
			}
		}
		if (valid === false){
			res.send(JSON.stringify(errorMsg));
		}else{
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
										sess.pseudo = req.body.pseudo;
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
		}
	}else{
		res.send('Tous les champs sont obligatoires!');
	}
}

module.exports = {
	index: index,
	create: create
};