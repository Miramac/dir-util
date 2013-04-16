dir-util.js
=======================

Node module to find and analyse directories or files using [wrench-js](https://github.com/ryanmcgrath/wrench-js) and [Async.js](https://github.com/caolan/async). 

## Usage

### Analyser 
Read directory size recursive:

	var dir = require('dir-util')
	, options = {
			filters: [/\.js(on)*$/i] //  just count .js or .json files
			, unit: 'kb'
		}
	, path = './'
	;
  	
	dir.getSize(path, options, function(err, size) {
		console.log(dir.to(size, options.unit), options.unit);
	});


### Finder		
Find directories and files recursive

	var dir = require('dir-util')
	, options = {
		filters: [/old/i, /\.bak$/i] 
	}
	, path = './'
	;

	dir.find(path, options, function(err, files) {
		console.log(files);
	});


### Delete files or directories recursive

	var dir = require('dir-util')
	dir.rm(path, callback);