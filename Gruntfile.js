module.exports = function (grunt) {
	'use strict';
	
	grunt.initConfig({
      
		pkg: grunt.file.readJSON('package.json'),
		
		less: {
			dev: {
				options: {
					expand: true,
//					banner: '/*!\n' +
//							' * Name: <%= pkg.name %>\n' +
//							' * URI: <%= pkg.url %>\n' +
//							' * Description: <%= pkg.description %>\n' +
//							' * Version: <%= pkg.version %>\n' +
//							' * Author: <%= pkg.author %>\n' +
//							' * License: <%= pkg.license %>\n' +
//							' */\n'
				},
				files: {
					"dist/css/weking.css": "src/less/weking.less"
				}
			}
		},
		
		cssmin: {
			minify: {
				expand: true,
				cwd: 'dist/css/',
				src: 'weking.css',
				dest: 'dist/css/',
				ext: '.min.css'
			}
		},
		
		cssbeautifier: {
			files : ["dist/css/weking.css"],
			options : {
				indent: '	',
				openbrace: 'end-of-line',
				autosemicolon: false
			}
		},
		
		watch: {
			scripts: {
				files: ['src/less/*.less'],
				tasks: ['compile']
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-cssbeautifier');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	
	grunt.registerTask('compile', ['newer:less', 'cssbeautifier', 'cssmin', 'watch']);
	grunt.registerTask('default', ['less', 'cssbeautifier', 'cssmin']);
};