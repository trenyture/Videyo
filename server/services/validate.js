'use strict';

function email(val){
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(val);
}

function password(val1, val2){
	return val1 == val2;
}

function passwordStrength(password){
	var reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\|\^\+\@\#\$\%\!\*\?\&\-\_\{\}\[\]\(\)\/\\\'\"\`\~\,\;\:\.\<\>])[A-Za-z\d\|\^\+\@\#\$\%\!\*\?\&\-\_\{\}\[\]\(\)\/\\\'\"\`\~\,\;\:\.\<\>]{10,}/;
	return reg.test(password);
}

module.exports = {
	email: email,
	password: password,
	passwordStrength: passwordStrength
};