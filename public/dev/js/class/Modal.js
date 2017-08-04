function Modal (title,message)
{
	this.modal = $('<aside id="modal">');
	this.modal.append($('<div id="modal_content">'));
	this.modal.find('#modal_content').append('<span id="modal_close" class="lnr lnr-cross"></span>');
	this.modal.find('#modal_content').append('<h2>'+title+'</h2>');
	this.modal.find('#modal_content').append(message);

	this.run = function(){
		$('body').append(this.modal);
	};
	this.stop = function(){
		$('body #remove').remove();
	};

	this.modal.click(function(){
		$('body #modal').remove();
	});
	this.modal.find('#modal_content').click(function(event){
		event.stopPropagation();
	});
	this.modal.find('#modal_content').find('#modal_close').click(function(){
		$('body #modal').remove();
	});
}