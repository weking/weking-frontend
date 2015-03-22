module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    weking: grunt.file.readJSON('package.json'),
    theme: grunt.file.readJSON('package.json'),

    less: {
      // Main options
      options: {
        expand: true,
        // Enable sourcemaps
        sourceMap: true,
        outputSourceFiles: true,
        sourceMapRootpath: '../../'
      },

      // Options for framework
      main: {
        options: {
          banner: '/*\n' +
          ' * Name: <%= weking.name %>\n' +
          ' * Description: <%= weking.description %>\n' +
          ' * Version: <%= weking.version %>\n' +
          ' * URI: <%= weking.url %>\n' +
          ' * Author: <%= weking.author %>\n' +
          ' * License: <%= weking.license %>\n' +
          ' */\n',
          sourceMapURL: 'weking.css.map',
          sourceMapFilename: 'dist/css/weking.css.map'
        },
        files: {
          "dist/css/weking.css": "src/less/weking.less"
        }
      },

      // Options for theme
      theme: {
        options: {
          banner: '/*\n' +
          ' * Name: <%= theme.name %>\n' +
          ' * Description: <%= theme.description %>\n' +
          ' * Version: <%= theme.version %>\n' +
          ' * URI: <%= theme.url %>\n' +
          ' * Author: <%= theme.author %>\n' +
          ' * License: <%= theme.license %>\n' +
          ' */\n',
          sourceMapURL: 'weking-theme.css.map',
          sourceMapFilename: 'dist/css/weking-theme.css.map'
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
        dest: 'dist/css/',
        ext: '.min.css',
        src: 'weking.css'
      },

      theme: {
        expand: true,
        cwd: 'dist/css/',
        dest: 'dist/css/',
        ext: '.min.css',
        src: 'weking-theme.css'
      }
    },

    // Watch - to compile files when sources will be changed
    watch: {
      main: {
        files: ['src/less/weking/**', 'src/less/weking.less'],
        tasks: ['compile-weking-newer']
      },

      theme: {
        files: ['src/less/weking/utilities/**', 'src/less/weking-theme.less'],
        tasks: ['compile-theme-newer']
      },

      full : {
        files: ['src/less/**'],
        tasks: ['compile-newer']
      }
    }

  });

  // Load Grunt modules
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task: compile weking and theme, format and minify css and watch for next manipulations
  grunt.registerTask('default', ['compile', 'watch:full']);

  // Compile Tasks

  // Compile framework
  grunt.registerTask('compile-weking', ['less:main']);
  grunt.registerTask('compile-weking-newer', ['compile-weking', 'watch:main']);

  // Compile theme
  grunt.registerTask('compile-theme', ['less:theme']);
  grunt.registerTask('compile-theme-newer', ['compile-theme', 'watch:theme']);

  // Compile full
  grunt.registerTask('compile', ['compile-weking', 'compile-theme']);
  grunt.registerTask('compile-newer', ['compile', 'watch:full']);

  // Production Tasks

  // Framework production
  grunt.registerTask('production-weking', ['compile-weking', 'cssmin:main']);

  // Theme production
  grunt.registerTask('production-theme', ['compile-theme', 'cssmin:theme']);

  // Production full
  grunt.registerTask('production', ['production-weking', 'production-theme']);

};
