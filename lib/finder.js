var fs = require('fs')
	, path = require('path')
	, async = require('async')
	, filter = require('./filter')
		, _ = require('underscore')
	;
	
var finder = {};
finder.find = find;
module.exports = finder;

function find( item, options, cb ) {
	var results = [];
	if(typeof options === 'function') {
		cb = options;
		options = {};
	}
	options.filters = ( options.filters ) ? options.filters : false;
	
	fs.lstat( item, function( err, stats ) {
		//read subdir async
		if ( !err && stats.isDirectory() ) {
			if(filter.test( item.toString(), options.filters ) ) {
				results.push( item );
				cb( err, results );
			}else {
				fs.readdir(item, function(err, items) {
					async.forEach(
					items
					, function( dirItem, callback ) {
						find( path.join( item, dirItem ), options, function( err, file ) {
							//Test filter
							if(filter.test( file.toString(), options.filters ) ) {
								results.push( file );
							}
							callback(err);
						});
					}, function(err) {
						cb( err, results);
					});  
				}); 
			}
		}else{
			if(err) {
				console.log(err);
				cb(err);
			} else {
				cb( err, item );
			}
		}
	}); 
}