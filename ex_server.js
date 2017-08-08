// load the things we need
var express 	= require('express');
var app 		= express();
var session 	= require('express-session');
var favicon 	= require('serve-favicon');
var bodyParser 	= require('body-parser');
var mongo = require('mongodb');
var server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
var database = new mongo.Db('videyoBDD', server);
/*Global Var*/
var sess;

/* -----> MAIL <----- */ 
/*var mail = require('nodemailer');
var transporter = mail.createTransport({
	service: 'gmail',
	auth: {
		user: 'user@gmail.com',
		pass: 'password'
	}
});
var mailOptions = {
	from: 'me@gmail.com',
	to: 'myfriend@anzen.com.mx',
	subject: 'Sending Email using Node.js',
	text: 'That was easy!'
};
transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
});*/

// set the view engine to pug
app.set('views','./public/pages/');
app.set('view engine', 'pug');
// use res.render to load up an pug view file
app.use(session({secret: 'simonTrichereauTrenyture'}));
app.use(favicon('./public/assets/img/favicon.ico'));
app.use('/assets', express.static('./public/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// index page 
app.get('/', function(req, res) {
	sess = req.session;
	if (sess.logged === true) {
		res.render('index', {logged: true, name: sess.pseudo});
	} else {
		res.redirect('/login');
	}
});

// LOGIN 
app.get('/login', function(req, res) {
	sess = req.session;
	if (sess.logged === true) {
		res.redirect('/');
	} else {
		res.render('login');
	}
});
app.post('/login', function(req, res) {
	if (req.body.pseudo && req.body.password) {
		database.open(function(err, database) {
			if(!err) {
				database.collection('usersDB', function(err, usersdb) { 
				    if (!err) {
						usersdb.find({ $or : [{pseudo: req.body.pseudo}, {email: req.body.pseudo}]}, function(err, doc) {
							res.send(doc);
						});
				    } else {
						red.send('Il y a un problème avec la Base de Donnée...');
				    }
				});
			}else{
				red.send('Il y a un problème avec la Base de Donnée...');
			}
		});
		database.close();
	} else {
		red.send('Vous devez entrer votre identifiant et votre mot de passe!');
	}
	// 	session = req.session;
	// 	db.close();
	// 	session.pseudo = req.body.pseudo;
	// 	session.password = req.body.password;
	// 	session.logged = true;
	// 	res.send(true);
	// }else{
	// 	res.send(false);
	// }
});

//NEW USER
app.get('/register', function(req, res){
	sess = req.session;
	if (sess.logged === true) {
		res.redirect('/');
	} else {
		res.render('register');
	}
});
app.post('/register', function(req, res){
	if(req.body.mail && req.body.pseudo && req.body.password && req.body.password_verif && req.body.conditions){
		sess = req.session;
		sess.pseudo = req.body.pseudo;
		sess.password = req.body.password;
		sess.logged = true;
		res.send(true);
	}else{
		res.send('Tous les champs sont obligatoires!');
	}
});

// LOGOUT
app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
			res.redirect('/');
		} else {
			res.redirect('/login');
		}
	});
});

// 404 page
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.listen(6565);