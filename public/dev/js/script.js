(function($){
	/*GLOBAL VARS*/
	var pageHeight = 0,
		pageWidth = 0;

	var app = {
		init : function()
		{
			app.resize();
			app.search();

			var idPage = $('main').attr('id');
			/*****
			//DOESN'T WORK
			app.idPage.init();
			*****/
			idPage = idPage.split(' ');
			for(var i = 0; i < idPage.length; i++){
				switch(idPage[i])
				{
					case 'home':
					case 'index':
						app.home.init();
						break;
					case 'login':
						app.login.init();
						break;
					case 'register':
						app.register.init();
						break;
					default :
						break;
				}
			}
			if ($('form.formulaire').length>0)
			{
				app.forms.init();
			}

		},
		search : function()
		{
			$('header form#search input#query').keyup(function(e)
			{
				// console.log($(this).val().length);
				if( $(this).val().length >= 3 )
				{
					console.log($(this).val());
				}
			});
			$('header form#search').submit(function(e)
			{
				e.preventDefault();
				app.forms.submit(this);
			});
		},
		resize : function()
		{
			pageWidth = $(window).width();
			pageHeight = $(window).height();
			$('header form#search').outerWidth(pageWidth - parseInt($('header h1').outerWidth() + $('header nav').outerWidth() + 60));
			($(window).height() - $('footer').outerHeight() > $('html').outerHeight()) ? $('footer').addClass('to_bottom') : $('footer').removeClass('to_bottom');
		}
	};
	
	/*INDEX*/
	app.home = {
		init : function()
		{
			console.log('Bienvenue sur la home page');
		}
	};

	/*LOGIN*/
	app.login = {
		init : function()
		{
			$('form#login_form').submit(function(e)
			{
				e.preventDefault();
				var valid = app.login.validate(this);
				if (valid === true)
				{
					var modal = new Modal('Connexion', '<p>Veuillez patienter</p>');
					modal.run();
					app.forms.submit(this);
				}
				else
				{
					var lisError = '';
					for(var i = 0; i < valid.length; i++){
						if (valid[i] !== true) {
							lisError += '<li>'+valid[i]+'</li>';
						}
					}
					$('ul#error').html(lisError);
				}
			});
		},
		validate : function(form)
		{
			var validate =	new Validator();
			var pseudo = validate.pseudo($(form).find('input#pseudo').val());
			var password = validate.password($(form).find('input#password').val());
			if (pseudo === true && password === true)
			{
				return true;
			}
			else
			{
				return [pseudo, password];
			}
		}
	};

	app.register = {
		init : function()
		{
			$('form#register_form').submit(function(e)
			{
				e.preventDefault();
				var valid = app.register.validate(this);
				if (valid === true)
				{
					var modal = new Modal('Inscription', '<p>Veuillez patienter</p>');
					modal.run();
					app.forms.submit(this);
				}
				else
				{
					var lisError = '';
					for(var i = 0; i < valid.length; i++){
						if (valid[i] !== true) {
							lisError += '<li>'+valid[i]+'</li>';
						}
					}
					$('ul#error').html(lisError);
				}
			});
		},
		validate : function(form)
		{
			var validate = new Validator();
			var mail = validate.email($(form).find('#mail').val());
			var pseudo = validate.pseudo($(form).find('#pseudo').val());
			var password = validate.email($(form).find('#password').val(),$(form).find('#password_verif').val());
			if (mail === true && pseudo === true && password === true)
			{
				return true;
			}else{
				return [mail, pseudo, password];
			}
		}
	};

	/*FORMULAIRES*/
	app.forms = {
		init : function()
		{
			$('form.formulaire').each(function()
			{
				app.forms.run(this);
			});
		},
		run : function(form)
		{
			$(form).find('.form-group').each(function()
			{
				$(this).find('input,textarea,select').focus(function()
				{
					$(this).siblings('label').addClass('active');
				});
				$(this).find('input,textarea,select').focusout(function()
				{
					if($(this).val() === '')
					{
						$(this).siblings('label').removeClass('active');
					}
					($(this).is(":invalid")) ? $(this).parent('.form-group').addClass('error') : $(this).parent('.form-group').removeClass('error');
				});
			});
		},
		submit : function(form, nUrl)
		{
			nUrl = (typeof nUrl === 'undefined') ? '/' : nUrl;
			var datos = $(form).serializeObject();
			console.log(datos);
			$.each(datos, function(index, value)
			{
				datos[index] = value.trim();
			});
			console.log(datos);
			$.ajax({
				type:'POST',
				data: datos,
				success: function(data)
				{
					if(data === true)
					{
						window.location = nUrl;
					}
					else
					{
						if($('body #modal').length > 0){
							$('body #modal').each(function(){
								$(this).remove();
							});
						}
						$('ul#error').html('<li>'+data+'</li>');
					}
				}
			});
		}
	};

	$(document).ready(app.init);
	$(window).resize(app.resize);
})(jQuery);