directory-size-analyser
=======================

Node module to work with directories and files like finding, analyse or creating from templates. 

## Usage

# Analyser 
Read directory size recursive:

    var dirlyser = require('dir')
    , options = {
      filters: ['\.js(on)*$'] //just count .js or .json files 
      , unit: 'kb'
    };
    
    dirlyser.readSize('../', options, function(err, size) {
      console.log(dirlyser.to(size, options.unit), options.unit);
    });


# Finder		
		/*
		directory filters: ['\\\\lib$'] 
		File filter: ['\.zip$'] 'alt\.[a-z,A-Z]+$'

		//Alle Alt Verzeichnisse (wie  [/\\\d\d_alt$/i] 
		*/

		find('../', {filters: [/alt$/i, /\.bak$/i]}, function(err, files) {
			files = _.flatten(files);
			if(	err) console.log('ERROR: '+ (err));
				console.log((files));
			console.log("done")	
		});