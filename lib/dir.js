var analyser = require('./analyser')
	, finder = require('./finder');
	, creator = require('./creator');
	;
	
var dir = {};
//analyser
dir.readDir = analyser.readDir;
dir.readSize = analyser.readSize;
dir.to = analyser.to;

//finder 
dir.find = finder.find;

//creator 
dir.create = creator.create;


module.exports = dir;