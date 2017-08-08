var AlphabeticID = { 
	index:'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',

	encode:function(_number)
	{
		if('undefined' == typeof _number)
		{
			return null;
		}
		else if('number' != typeof(_number))
		{
			throw new Error('Wrong parameter type');
		}
		
		var ret = '';
		
		for(var i=Math.floor(Math.log(parseInt(_number))/Math.log(AlphabeticID.index.length));i>=0;i--)
		{
			ret = ret + AlphabeticID.index.substr((Math.floor(parseInt(_number) / AlphabeticID.bcpow(AlphabeticID.index.length, i)) % AlphabeticID.index.length),1);
		}
  
    	return ret.reverse();
	},

	decode:function(_string)
	{
		if('undefined' == typeof _string)
		{
			return null;
		}
		else if('string' != typeof _string)
		{
			throw new Error('Wrong parameter type');
		}

		var str = _string.reverse();
		var ret = 0;

		for(var i=0;i<=(str.length - 1);i++)
		{
			ret = ret + AlphabeticID.index.indexOf(str.substr(i,1)) * (AlphabeticID.bcpow(AlphabeticID.index.length, (str.length - 1) - i));
		}
	    
	    return ret;
	},

	bcpow:function(_a, _b)
	{
    	return Math.floor(Math.pow(parseFloat(_a), parseInt(_b)));
  	}
};

String.prototype.reverse = function()
{
  return this.split('').reverse().join('');
};