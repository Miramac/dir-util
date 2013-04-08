	var dir = require('../')
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
    } );
	
	
