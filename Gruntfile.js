module.exports = function(grunt){

    grunt.initConfig({
        env: {
            dev: {
                // one of the tests depends on having a non-UTC timezone as local
                TZ: "Europe/Sofia"
            }
        },
        jshint: {
            dist: {
                options: {
                    // enable additional checks:
                    curly: true,
                    newcap: true,

                    // disable default checks:
                    boss: true, // allows us to do for loops like: for (var i=0, item; item=items[i]; i++) {
                    expr: true, // allows us to do fn calls in one-line expressions like: x === 1 && show(x);
                },
                src: [
                    'util.js'
                ]
            }
        },

        jasmine: {
            src: [
                'util.js',
            ],
            options: {
                vendor: [
                    'bower_components/jquery/dist/jquery.min.js'
                ],
                specs: [
                    'test/*'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask("test", "Lint and test", ["env:dev", "jshint", "jasmine"]);

};
