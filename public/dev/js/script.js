(function($){
	/*GLOBAL VARS*/
	var pageHeight = 0,
		pageWidth = 0;

	var app = {
		init : function()
		{

			var test = ['bonjour','simon','ca','va'];
			console.log(typeof(test));


			app.resize();
			var idPage = $('main').attr('id');
			idPage = idPage.split(' ');
			for(var i = 0; i < idPage.length; i++){
				switch(idPage[i])
				{
					case 'home':
						app.home.init();
						break;
					case 'connection':
						app.connection.init();
						break;
					case 'test':
						app.test.init();
						break;
					default :
						break;
				}
			}
			if ($('form.formulaire').length>0){
				app.forms.init();
			}

		},
		resize : function()
		{
			pageWidth = $(window).outerWidth();
			pageHeight = $(window).outerHeight();
			var mainHeight = pageHeight - parseInt($('header').outerHeight() + $('footer').outerHeight());
			$('main').css({
				width: pageWidth+'px',
				height: mainHeight+'px'
			});
		}
	};
	
	/*INDEX*/
	app.home = {
		init : function()
		{
			console.log('Bienvenue sur la home page');
		}
	};

	/*CONNECTION*/
	app.connection = {
		init : function()
		{
			$('form#connection_form').submit(function(e){
				e.preventDefault();
				app.forms.check(this);
			});
		}
	};

	app.test = {
		init : function()
		{
			$('#testform').submit(function(e){
				e.preventDefault();
				var datos = $(this).serializeObject();
				var person = new Person(datos.firstname, datos.lastname, datos.age, datos.gender);
				$('#test').html(person.who_are_you());
			});
		}
	};


	/*FORMULAIRES*/
	app.forms = {
		init : function()
		{
			$('form.formulaire').each(function(){
				app.forms.run(this);
			});
		},
		run : function(form)
		{
			$(form).find('.form-group').each(function(){
				$(this).find('input,textarea,select').focus(function(){
					$(this).siblings('label').addClass('active');
				});
				$(this).find('input,textarea,select').focusout(function(){
					if($(this).val() === ''){
						$(this).siblings('label').removeClass('active');
					}
					if ($(this).is(":invalid")) {
						$(this).siblings('label').addClass('error');
					} else{
						$(this).siblings('label').removeClass('error');
					}
				});
			});
		},
		check : function(form)
		{
			var datos = $(form).serializeObject();
			$.ajax({
				type:'POST',
				data: datos,
				success: function(data){
					if(data === true){
						window.location.reload();
					}else{
						$('ul#error').html('<li>Il y a eu une erreur avec le script</li>');
					}
				}
			})
		}
	};

	$(document).ready(app.init);
	$(window).resize(app.resize);
})(jQuery);