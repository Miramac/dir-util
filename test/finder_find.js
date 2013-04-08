    var dir = require('../')
	, _ = require('underscore')
    , options = {
      filters: [/lib$/i, /\.bak$/i] // directory filters: ['\\\\lib$']  File filter: ['\.zip$'] 'alt\.[a-z,A-Z]+$'
    };


	dir.find('../', options, function(err, files) {
		files = _.flatten(files);
		console.log((files));
	});
