	var fs = require( 'fs' )
	, wrench = require( 'wrench' )
	, path = './dir_rm_old.js'
	, lstat
	;

	if(fs.existsSync(path)) {
		if(fs.lstatSync(path).isDirectory()) {
			wrench.rmdirSyncRecursive(path);
		} else {
			fs.unlinkSync(path);
		}
	}
	

	