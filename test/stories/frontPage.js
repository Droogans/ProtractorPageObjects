var basePage = require('../pages/base');
var expect = require('./setupExpect').expect;

describe('Main page', function() {

    basePage.go();

    it('should be at the correct URL', function () {
        expect(basePage.currentUrl).to.eventually.equal(browser.baseUrl + basePage.url);
    });

});
