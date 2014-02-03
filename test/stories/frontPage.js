var basePage = require('../pages/Base'),
    loginPage = require('../pages/login/Form.js'),
    expect = require('./setupExpect').expect;

describe('Main page', function() {

    basePage.go();

    it('should be at the correct URL', function() {
        expect(basePage.currentUrl).to.eventually.equal(browser.baseUrl + basePage.url);
    });

    it('should let me click through to the login page', function() {
        basePage.btnLogin.click();
        // We switch to the loginPage here because we've navigated to it
        expect(loginPage.currentUrl).to.eventually.equal(browser.baseUrl + loginPage.url);
    });

    it('should return to the front page when clicking the Epik Vote link', function() {
        // You can't call the loginPage here, because lnkEpikVote belongs to the basePage
        basePage.lnkEpikVote.click();
        expect(basePage.currentUrl).to.eventually.equal(browser.baseUrl + basePage.url);
    });

});
