dir-util.js
=======================

Node module to work with directories and files like finding, analyse or creating from templates using [wrench-js](https://github.com/ryanmcgrath/wrench-js) and [Async.js](https://github.com/caolan/async). 

## Usage

### Analyser 
Read directory size recursive:

	var dir = require('dir-util')
	, options = {
			filters: ['\.js(on)*$'] //  just count .js or .json files: ['\.js(on)*$']
			, unit: 'kb'
		}
	, options = {
			filters: ['\.js(on)*$'] //  just count .js or .json files: ['\.js(on)*$']
			, unit: 'kb'
		}
	, file = '../'
	;
  	
	dir.getSize(file, options, function(err, size) {
		console.log(dir.to(size, options.unit), options.unit);
	});


### Finder		
Find directories and files recursive

	var dir = require('dir-util')
	, _ = require('underscore')
	, options = {
		filters: [/lib$/i, /\.bak$/i] // directory filters: ['\\\\lib$']  File filter: ['\.zip$'] 'old\.[a-z,A-Z]+$'
	};

	dir.find('../', options, function(err, files) {
		files = _.flatten(files);
		console.log((files));
	});


### Delete files or directories recursive

	var dir = require('dir-util')
	dir.rm(path, callback);