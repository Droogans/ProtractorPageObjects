var basePage = require('../pages/Base'),
    loginPage = require('../pages/login/Form.js')

describe('Main page', function() {

    basePage.go();

    it('should be at the correct URL', function() {
        expect(basePage.currentUrl).toEqual(browser.baseUrl + basePage.url);
    });

    it('should let me click through to the login page', function() {
        basePage.btnLogin.click();
        expect(loginPage.currentUrl).toEqual(browser.baseUrl + loginPage.url);
    });

    it('should return to the front page when clicking the Epik Vote link', function() {
        basePage.lnkEpikVote.click();
        expect(basePage.currentUrl).toEqual(browser.baseUrl + basePage.url);
    });

});
