'use strict';

const
	mapE = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	},
	mapD = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#039;': "'"	
	};

function encode(text) {
	return text.replace(/[&<>"']/g, function(m) { return mapE[m]; });
}

function decode(text) {
	return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function(m) { return mapD[m]; });
}

module.exports = {
	encode: encode,
	decode: decode
};