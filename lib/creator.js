var fs = require('fs')
	, path = require('path')
	, crypto = require('crypto')
	, wrench = require('wrench')
	, _ = require('underscore')
	, analyser = require('./analyser')
	;

	var creator = {};
	creator.create = create;
	creator.replace = replace;
	exports.creator = creator;
	
/** Used to create user directory with htacces password-file from a template folder. Will need a rework for more generic functionality...
 *
 * Deep copy src to the dest 
 * Search and replace in dest
 **/
function create(options, cb) {

	options.force = (options.force) ? options.force : false;
	options.preserve = (options.preserve) ? options.preserve : true;
	options.password = getPwHash(options.password);  
	console.log('Gernerating directories with folling options:\n', options, '\n');
	if(options.test) {return;}
	//create directory
	if(options.force || !fs.existsSync(options.dest)) {
		wrench.mkdirSyncRecursive(options.dest);
		wrench.copyDirSyncRecursive(options.src, options.dest, { preserve: options.preserve }); 
	}
	if(options.files.length) {
		_.each(options.files, function(file) {
			fs.exists(path.join(options.dest,options.pwfile), function(exists) {
				if(!exists || options.force || file.force) {
					fs.writeFile(path.join(options.dest,strReplace(file.name, options)),  strReplace(file.data, options), function(err){
						if(err) {throw err;}
					});
				}
			});
		});
	}
	//Search and replace 
	replace(options.dest, {
		filters: ['index\.php$', '\.htaccess']
		, type: 'replace' 
		, values: [{
			user: options.user
			, root: options.root
			, project: options.project
			, title: options.title
			, userDir: options.userDir
			, pwfile: options.pwfile
		}]
	}, function(err, data) {
		if(cb) {
			cb(err, data);
			}
	});
}

function strReplace(str, obj, mark, options) {
	mark = (mark) ? mark : '#';
	options = (options) ? options : 'g';
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			str = str.replace(new RegExp(mark+key+mark, options), obj[key]);
		}
	}
	return str;
}

/**
 * search and replace in files file
 **/
function replace(root, options, callback) {
	analyser.readDir(root, options, function(err, files) {
		files = _.flatten(files);
		_.each(files, function(file){ 
			fs.readFile(file, 'UTF-8', function(err, data) {
				if(err) {throw err;}
				var i, value;
				for(i=0; i<options.values.length; i++) {
					value = options.values[i];
					if(value === Object(value)) {
						for(var key in value) {
							if(value.hasOwnProperty(key)) {
								data = data.replace(new RegExp('{{'+key+'}}','g'), value[key]);
							}
						}
					}
					fs.writeFile(file, data);
				}
			});
		});	
		if(callback) {
			callback(err, files);
		}
	});
}

//create an sha1 hash for auth basic 
function getPwHash(pw) {
	return '{SHA}' + crypto.createHash('sha1').update(pw).digest('base64');
}
