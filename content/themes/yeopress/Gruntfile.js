var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

	// To support SASS/SCSS or Stylus, just install
	// the appropriate grunt package and it will be automatically included
	// in the build process, Sass is included by default:
	//
	// * for SASS/SCSS support, run `npm install --save-dev grunt-contrib-sass`
	// * for Stylus/Nib support, `npm install --save-dev grunt-contrib-stylus`

	var npmDependencies = require('./package.json').devDependencies;
	var hasSass = npmDependencies['grunt-contrib-sass'] !== undefined;
	var hasStylus = npmDependencies['grunt-contrib-stylus'] !== undefined;

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Watches for changes and runs tasks
		watch : {
			options: {
                nospawn: true,
                livereload: true
            },
			livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '*.php',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js',
                    'images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    'templates/*.{ejs,mustache,hbs}'
                ]
            },
			compass : {
				files : ['scss/**/*.scss'],
				tasks : (hasSass) ? ['compass:dev'] : null,

			},
			stylus : {
				files : ['stylus/**/*.styl'],
				tasks : (hasStylus) ? ['stylus:dev'] : null,

			},
			js : {
				files : ['js/**/*.js'],
				tasks : ['jshint'],

			},
			php : {
				files : ['**/*.php'],

			}
		},

		// JsHint your javascript
		jshint : {
			all : ['js/*.js', '!js/modernizr.js', '!js/*.min.js', '!js/vendor/**/*.js'],
			options : {
				browser: true,
				curly: false,
				eqeqeq: false,
				eqnull: true,
				expr: true,
				immed: true,
				newcap: true,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: false,
				globals: {
					'console': true
				}
			}
		},

		// Dev and production build for sass
		compass : {
			production : {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'scss',
						dest : 'css',
						ext : '.css',
						expand : true
					}
				],
				options : {

				}
			},
			dev : {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'scss',
						dest : 'css',
						ext : '.css',
						expand : true
					}
				],
				options : {
					sassDir: 'scss/',
                    cssDir: 'css/'
				}
			}
		},

		// Dev and production build for stylus
		stylus : {
			production : {
				files : [
					{
						src : ['**/*.styl', '!**/_*.styl'],
						cwd : 'stylus',
						dest : 'css',
						ext: '.css',
						expand : true
					}
				],
				options : {
					compress : true
				}
			},
			dev : {
				files : [
					{
						src : ['**/*.styl', '!**/_*.styl'],
						cwd : 'stylus',
						dest : 'css',
						ext: '.css',
						expand : true
					}
				],
				options : {
					compress : false
				}
			},
		},

		connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                //hostname: 'localhost'
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://dev.giles.com:80'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },

		// Bower task sets up require config
		bower : {
			all : {
				rjsConfig : 'js/global.js'
			}
		},

		// Require config
		requirejs : {
			production : {
				options : {
					name : 'global',
					baseUrl : 'js',
					mainConfigFile : 'js/global.js',
					out : 'js/optimized.min.js'
				}
			}
		},

		// Image min
		imagemin : {
			production : {
				files : [
					{
						expand: true,
						cwd: 'images',
						src: '**/*.{png,jpg,jpeg}',
						dest: 'images'
					}
				]
			}
		},

		// SVG min
		svgmin: {
			production : {
				files: [
					{
						expand: true,
						cwd: 'images',
						src: '**/*.svg',
						dest: 'images'
					}
				]
			}
		}

	});

	// Default task
	grunt.registerTask('default',
		[
			'connect:livereload',
            'open:server',
			'watch',
        ]);

	// Build task
	grunt.registerTask('build', function() {
		var arr = ['jshint'];

		if (hasSass) {
			arr.push('sass:production');
		}

		if (hasStylus) {
			arr.push('stylus:production');
		}

		arr.push('imagemin:production', 'svgmin:production', 'requirejs:production');

		return arr;
	});

	// Template Setup Task
	grunt.registerTask('setup', function() {
		var arr = [];

		if (hasSass) {
			arr.push['sass:dev'];
		}

		if (hasStylus) {
			arr.push('stylus:dev');
		}

		arr.push('bower-install');
	});

	// Load up tasks
	// if (hasSass) {
	// 	grunt.loadNpmTasks('grunt-contrib-compass');
	// }

	// if (hasStylus) {
	// 	grunt.loadNpmTasks('grunt-contrib-stylus');
	// }

	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-bower-requirejs');
	// grunt.loadNpmTasks('grunt-contrib-requirejs');
	// grunt.loadNpmTasks('grunt-contrib-imagemin');
	// grunt.loadNpmTasks('grunt-svgmin');

	// Run bower install
	grunt.registerTask('bower-install', function() {
		var done = this.async();
		var bower = require('bower').commands;
		bower.install().on('end', function(data) {
			done();
		}).on('data', function(data) {
			console.log(data);
		}).on('error', function(err) {
			console.error(err);
			done();
		});
	});

};
