var grunt = require('grunt');
var secrets = require('./secrets');

exports.config = {
    // The address of a running selenium server. If this is specified,
    // seleniumServerJar and seleniumPort will be ignored.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://beta.epikvote.com',

    specs: [
        './stories/*.js'
    ],

    framework: 'mocha',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    params: {
        login: secrets.credentials
    },

    allScriptsTimeout: 30000,

    // Options to be passed to mocha.
    mochaOpts: {
        reporter: 'spec',
        slow: 10000
    }
};
