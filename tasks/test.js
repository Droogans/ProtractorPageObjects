module.exports = function (grunt) {
    grunt.registerTask('test', 'Runs unit and midway tests - grunt unit:dev will run continously',
        function(type, file) {
        var protractorFile = file ? ':' + file : '';

        // define types of tests to run
        var types = {
            'mid': 'shell:protractor' + protractorFile
        };


        // set default to run unit and func test a single time
        var tasks = types.mid;

        // check if param passed in (e.g. 'grunt test:unit')
        if (typeof type === 'string') {
            // overwrite default tasks with single task
            tasks = types[type];
        }

        grunt.task.run(tasks);
    });
};
