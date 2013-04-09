dir-util.js
=======================

Node module to work with directories and files like finding, analyse or creating from templates using [wrench-js](https://github.com/ryanmcgrath/wrench-js) and [Async.js](https://github.com/caolan/async). 

## Usage

### Analyser 
Read directory size recursive:

	var dir = require('dir')
	, options = {
			filters: ['\.js(on)*$'] //  just count .js or .json files: ['\.js(on)*$']
			, unit: 'kb'
		}
	, dirlist = { 
			dirs: []
			, total:0
		}
	, file = '../'
	;
		
	dir.readSize(file, options, function(err, size) {
		console.log(dir.to(size, options.unit), options.unit);
		dirlist.dirs.push( { 
			name: file
			, size: dir.to(size, options.unit)
			, group: file.split('/').slice(0,file.split('/').length -2).join('/')
		} );
		dirlist.total += dir.to(size, options.unit);
		
		console.log(dirlist);
	});


### Finder		
Find directories and files recursive

	var dir = require('dir')
	, _ = require('underscore')
	, options = {
		filters: [/lib$/i, /\.bak$/i] // directory filters: ['\\\\lib$']  File filter: ['\.zip$'] 'alt\.[a-z,A-Z]+$'
	};

	dir.find('../', options, function(err, files) {
		files = _.flatten(files);
		console.log((files));
	});


### Delete files or directories recursive

	var dir = require('dir')
	dir.rm(path, callback);