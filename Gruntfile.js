module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: 'app/js/app.js',
                dest: 'dist/js/app.js',
                options: {
                    external: ['angular'],
                    debug: true,
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
            },
            build: {
                src: 'dist/js/app.js',
                dest: 'dist/js/app.min.js'
            }
        },
        copy: {
            all: {
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css', '**/*.png', '**/*.jpg'],
                dest: 'dist/'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded', // comessed or expanded
                    sourcemap: 'none'
                },
                files: {
                    'dist/css/app.css': 'app/css/app.scss',
                    'dist/css/game-list.css': 'app/css/game-list.scss',
                    'dist/css/game-details.css': 'app/css/game-details.scss',
                    'dist/css/board/board1.css': 'app/css/board/style1.scss',
                    'dist/css/board/board2.css': 'app/css/board/style2.scss'
                }
            }
        },
        watch: {
            js: {
                files: "app/**/*.js",
                tasks: "browserify"
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.css',
                tasks: 'copy'
            },
            scss: {
                files: 'app/**/*.scss',
                tasks: 'sass'
            }
        },
        'http-server': {
            dev: {
                root: './dist',
                port: 3000,
                openBrowser: false,
                runInBackground: true
            }
        }
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', /*'uglify', */ 'sass', 'copy', 'http-server', 'watch']);
};