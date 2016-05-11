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
                    'dist/css/app.css': 'app/css/app.scss'
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
            }
        },
        'http-server': {
            dev: {
                root: './dist',
                port: 3000,
                openBrowser: true,
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

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'sass', 'copy', 'http-server', 'watch']);
};