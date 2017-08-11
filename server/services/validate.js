'use strict';

const
	regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	regPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\|\^\+\@\#\$\%\!\*\?\&\-\_\{\}\[\]\(\)\/\\\'\"\`\~\,\;\:\.\<\>])[A-Za-z\d\|\^\+\@\#\$\%\!\*\?\&\-\_\{\}\[\]\(\)\/\\\'\"\`\~\,\;\:\.\<\>]{10,}/;

function email(val){
	if (val !== '') {
		return (regEmail.test(val) === true)?true:'Veuillez renseigner un email valide!';
	}else{
		return "Veuillez renseigner l'email";
	}
}

function pseudo(val){
	if(val !== ''){
		return (val.length < 5) ? "L'identifiant est trop court" : true ;
	}else{
		return 'Veuillez renseigner un Identifiant';
	}
}

function password(val1, val2){
	if (val1 !== '') {
		if(regPass.test(val1) === true){
			return (typeof(val2) !== 'undefined' && val1 !== val2)?'Les mots de passes ne correspondent pas!':true;
		}else{
			return 'Le mot de passe doit au moins contenir 10 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial';
		}
	}else{
		return 'Veuillez renseigner le mot de Passe';
	}
}

module.exports = {
	email: email,
	pseudo: pseudo,
	password: password
};