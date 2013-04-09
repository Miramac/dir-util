	var dir = require('../')
	, options = {
			filters: ['\.js(on)*$'] //  just count .js or .json files: ['\.js(on)*$']
			, unit: 'kb'
		}
	, file = '../'
	;
  	
	dir.getSize(file, options, function(err, size) {
		console.log(dir.to(size, options.unit), options.unit);
	} );
	
	
