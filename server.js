// load the things we need
var express = require('express');
var app = express();
var session = require('express-session');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

/*Global Var*/
var sess;

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
	sess=req.session;
	if (sess.connected === true) {
		res.render('index', {connected:sess.connected, role:'administrateur'});
	} else {
		res.render('index');
	}
});

// connection page 
app.get('/connection', function(req, res) {
	sess=req.session;
	if (sess.connected === true) {
		res.redirect('/');
	} else {
	    res.render('connection');
	}
});
app.post('/connection', function(req, res) {
	sess=req.session;
	if (req.body.pseudo && req.body.password) {
		sess.pseudo = req.body.pseudo;
		sess.password = req.body.password;
		sess.role = 'administrateur';
		sess.connected = true;
		res.send(true);
	}else{
		res.send(false);
	}
});

// déconnection
app.get('/deconnection', function(req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

// 404 page
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.listen(6565);