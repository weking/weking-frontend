module.exports = function (grunt) {
	'use strict';

	// Grunt's tasks options
	grunt.initConfig({

		weking: grunt.file.readJSON('package.json'),
		theme: grunt.file.readJSON('package.json'),

		// Compile Less source
		less: {
			main: {
				options: {
					expand: true,
					banner: '/*!\n' +
					' * Name: <%= weking.name %>\n' +
					' * Description: <%= weking.description %>\n' +
					' * Version: <%= weking.version %>\n' +
					' * URI: <%= weking.url %>\n' +
					' * Author: <%= weking.author %>\n' +
					' * License: <%= weking.license %>\n' +
					' */\n'
				},
				files: {
					"dist/css/weking.css": "src/less/weking.less"
				}
			},

			theme: {
				options: {
					expand: true,
					banner: '/*!\n' +
					' * Name: <%= theme.name %>\n' +
					' * Description: <%= theme.description %>\n' +
					' * Version: <%= theme.version %>\n' +
					' * URI: <%= theme.url %>\n' +
					' * Author: <%= theme.author %>\n' +
					' * License: <%= theme.license %>\n' +
					' */\n'
				},
				files: {
					"dist/css/weking-theme.css": "src/less/weking-theme.less"
				}
			}
		},

		//  Minimize compiled files
		cssmin: {
			main: {
				expand: true,
				cwd: 'dist/css/',
				src: 'weking.css',
				dest: 'dist/css/',
				ext: '.min.css'
			},

			theme: {
				expand: true,
				cwd: 'dist/css/',
				src: 'weking-theme.css',
				dest: 'dist/css/',
				ext: '.min.css'
			}
		},

		// Watch - to compile files when sources will be changed
		watch: {
			src: {
				files: ['src/less/**/*.less'],
				tasks: ['compile-newer']
			}
		}

	});

	// Load Grunt modules
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');

	// Default task: compile weking and theme, format and minify css and watch for next manipulations
	grunt.registerTask('default', ['compile', 'watch']);

	// Compile
	grunt.registerTask('compile', ['less', 'cssmin']);

	// Compile newer
	grunt.registerTask('compile-newer', ['newer:less', 'cssmin', 'watch']);

};