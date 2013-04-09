	var fs = require( 'fs' )
	, wrench = require( 'wrench' )
	, path = './dir_rm_old.js'
	;

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
		callback(err, path);
	} else {
		throw err;
	}
}

