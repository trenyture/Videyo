function Validator ()
{
	var $this = this,
		regPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\|\^\+\@\#\$\%\!\*\?\&\-\_\{\}\[\]\(\)\/\\\'\"\`\~\,\;\:\.\<\>])[A-Za-z\d\|\^\+\@\#\$\%\!\*\?\&\-\_\{\}\[\]\(\)\/\\\'\"\`\~\,\;\:\.\<\>]{10,}/,
		regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	$this.password = function(pass, passConf)
	{
		if (pass !== '')
		{
			if(regPass.test(pass) === true)
			{
				return (typeof(passConf) !== 'undefined' && pass !== passConf) ? 'Les mots de passes ne correspondent pas!' : true;
			}
			else
			{
				return 'Le mot de passe doit au moins contenir 10 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial';
			}
		}
		else
		{
			return 'Veuillez renseigner le mot de Passe';
		}
	};

	$this.email = function(email)
	{
		if(email !== '')
		{
			return (regMail.test(email) === true) ? true : 'Veuillez renseigner un email valide!' ;
		}
		else
		{
			return "Veuillez renseigner l'email";
		}
	};

	$this.pseudo = function(pseudo)
	{
		if (pseudo !== '')
		{
			return (pseudo.length < 5) ? "L'identifiant est trop court" : true ;
		}
		else
		{
			return "Veuillez renseigner votre identifiant";
		}
	};
}