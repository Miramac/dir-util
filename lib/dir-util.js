var analyser = require('./analyser')
	, finder = require('./finder')
	, creator = require('./creator')
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




//Removes dir recursive or files 
function rm(path, callback) {
	var err = null;
	
	try {
	if(fs.existsSync(path)) {
		if(fs.lstatSync(path).isDirectory()) {
			wrench.rmdirSyncRecursive(path);
		} else {
			fs.unlinkSync(path);
		}
	}
	}catch(e) {
		err = e;
	}
	if(callback) {
		callback(err, path)
	} else {
		throw err;
	}
}

