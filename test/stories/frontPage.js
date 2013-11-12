var basePage = require('../pages/Base');

describe('Main page', function() {

    basePage.go();

    it('should be at the correct URL', function() {
        expect(basePage.currentUrl).toEqual(browser.baseUrl + basePage.url);
    });

});
