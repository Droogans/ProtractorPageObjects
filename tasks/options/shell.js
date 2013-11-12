var grunt = require('grunt');

module.exports = {
    protractor: {
        options: {
            stdout: true
        },
        command: function (file) {
            var localConfigFile = 'test/protractor.conf.local.js';
            var defaultConfigFile = 'test/protractor.conf.js';
            var configFile =  grunt.file.isFile(localConfigFile) ? localConfigFile : defaultConfigFile;
            var cmd = 'protractor ' + configFile;

            if (file && grunt.file.isFile(file)) {
                cmd += ' --specs ' + file;
            }

            console.log('Command: ' + cmd);
            return cmd;
        }
    }
};
