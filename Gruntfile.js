module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		, nodeunit: {
			all: ['test/*_test.js']
		}
	});

	// Load the plugin
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	// Default task(s).
	grunt.registerTask('default', ['concat']);

};