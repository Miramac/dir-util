var fs = require('fs')
  , wrench = require('wrench')

//Removes dir recursive or files 
module.exports = function (path, callback) {
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
    if(err) {
      throw err;
    }
	}
}
