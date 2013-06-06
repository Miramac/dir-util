var analyser = require('./analyser')
	, finder = require('./finder')
	, creator = require('./creator')
	, rm = require('./rm')
	;
	
var dir = {};
//analyser
dir.getSize = analyser.getSize;
dir.to = analyser.to;

//finder 
dir.find = finder.find;

//creator 
dir.create = creator.create;

//common dir functions
dir.rm = rm;

module.exports = dir;


