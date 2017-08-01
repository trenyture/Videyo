function Person (firstname, lastname, age, gender)
{
	var $this = this;
	//ARGUMENTS
	$this.name = [
		firstname,
		lastname
	];
	$this.age = age;
	$this.gender = gender;
	//FUNCTIONS
	$this.who_are_you = function(){
		return 'I am '+$this.name[0]+' '+$this.name[0]+', '+this.age+' years old, '+this.gender;
	};
}