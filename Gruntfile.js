"use strict";

module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);   // batch require npm modules
	require('time-grunt')(grunt);   // timing visualisation utility


	// App conf
	var config = grunt.file.readYAML('config.yml');
	var pkg = grunt.file.readJSON( 'package.json' );


	// Tasks conf
	grunt.initConfig({
		pkg: pkg,
		config: config,

		// Clean generated files and directories
		//
		clean: {
			dist: ['<%= config.destination %>', '.sass-cache'],
		},

		// Launch a node web server
		//
		connect: {
			options: {
				port: '<%= config.port %>',
				livereload: 35729,
				hostname: '*',
				base: '',       // path to index.html
				// protocol: 'https',
			},
			livereload: {
				options: {
					open: true,
				}
			}
		},

		// Compile Handlebars templates
		//
		emberTemplates: {
			compile: {
				options: {
					templateBasePath: /src\/templates\//
				},
				files: {
					'dist/templates.js': '<%= config.source %>/templates/**/*.hbs'
				}
			}
		},

		// Compile node Sass
		//
		sass: {
			static: {
				options: {
					style: 'expanded'
				},
				files: {
					'<%= config.destination %>/css/main.css': '<%= config.source %>/styles/main.scss',
				}
			}
		},

		// Watch module which..
		//
		watch: {
			emberTemplates: {   // ..triggers Handlebars compile task
				files: 'src/templates/**/*.hbs',
				tasks: ['emberTemplates']
			},
			sass: { // ..triggers Sass compile task
				files: ['<%= config.source %>/styles/**/*.scss',],
				tasks: ['sass:static', 'autoprefixer']
			},
			livereload: {   // ..triggers connect livereload task
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'**/*.html',
					'<%= config.destination %>/css/**/*.css',
					'<%= config.source %>/scripts/**/*.js'
				]
			}
		},

		// automate CSS vendor auto-prefixing
		//
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			static: {
				src: '<%= config.destination %>/css/*.css'
			}
		}
	});


	// Processes conf
	grunt.registerTask('flush', 'Removes all generated files and cache directories.', function() {
		return grunt.task.run([
			'clean'
		]);
	});

	grunt.registerTask('serve', 'Executes all tasks, opens a web server and runs a watch that triggers updates on file changes.', function() {
		return grunt.task.run([
			'flush',
			'emberTemplates',
			'sass',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});


	// Set a default task, so we can just run 'grunt'
	grunt.registerTask('default', ['serve']);

};
