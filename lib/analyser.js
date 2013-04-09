var fs = require('fs')
	, path = require('path')
	, async = require('async')
	, filter = require('./filter')
;

var analyser = {};
analyser.getSize = getSize;
analyser.to = to;
module.exports = analyser;

//reads directory size recursive
function getSize(item, options, cb) {
	var total = 0;
	if(typeof options === 'function') {
		cb = options;
		options = {};
	}
	options.filters = (options.filters) ? options.filters : ['.*'];
	
	fs.lstat(item, function(err, stats) {
		//read subdir async
		if (!err && stats.isDirectory()) {
			fs.readdir(item, function(err, items) {
				async.forEach(
					items
					, function(dirItem, callback) {
						getSize(path.join(item, dirItem), options, function(err, size) {
							//Test filter
							if(filter.test(dirItem, options.filters) ) {
								total +=  size;
							}
							callback(err);
						});
					}, function(err) {
						cb(err, total);
				});  
			}); 
		}else {
			if(err) {
				console.log(err);
				cb(err, 0 );
			} else {
				cb(err, (stats.size) ? stats.size : 0 );
			}
		}   
	}); 
}


function to(size,toMesure){
	toMesure = (typeof toMesure === 'string') ? toMesure.toLowerCase() :'';
	switch(toMesure){
		case 'b':
				size = Math.round(size*8*10)/10;
			break;
		case 'by':
				size = Math.round(size*10)/10;
			break;
		case 'kb':
				size = Math.round(size/1024*10)/10;
			break;
		case 'mb':
				size = Math.round(size/1024/1024*10)/10;
			break;
		case 'gb':
				size = Math.round(size/1024/1024/1024*10)/10;
			break;
		default:
				size = Math.round(size/1024/1024*10)/10;
			break;
	}
	return size;
}