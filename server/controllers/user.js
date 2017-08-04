'use strict';

var sess;

function loginIndex(req, res){
	sess = req.session;
	if (sess.logged === true) {
		res.redirect('/');
	} else {
		res.render('login');
	}
}

function login(req, res){
	if (req.body.pseudo && req.body.password) {
		database.open(function(err, database) {
			if(!err) {
				database.collection('usersDB', function(err, usersdb) { 
				    if (!err) {
						usersdb.find({ $or : [{pseudo: req.body.pseudo}, {email: req.body.pseudo}]}, function(err, doc) {
							res.send(doc);
						});
				    } else {
						res.send('Il y a un problème avec la Base de Donnée...');
				    }
				});
			}else{
				res.send('Il y a un problème avec la Base de Donnée...');
			}
		});
		database.close();
	} else {
		res.send('Vous devez entrer votre identifiant et votre mot de passe!');
	}
}

function registerIndex(req, res){
	sess = req.session;
	if (sess.logged === true) {
		res.redirect('/');
	} else {
		res.render('register');
	}
}

function register(req, res){
	if(req.body.mail && req.body.pseudo && req.body.password && req.body.password_verif && req.body.conditions){
		sess = req.session;
		sess.pseudo = req.body.pseudo;
		sess.password = req.body.password;
		sess.logged = true;
		res.send(true);
	}else{
		res.send('Tous les champs sont obligatoires!');
	}
}

function logout(req, res){
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
	loginIndex: loginIndex,
	login: login,
	registerIndex: registerIndex,
	register: register,
	logout: logout
};