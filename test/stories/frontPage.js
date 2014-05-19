var basePage = require('../pages/base'),
    loginPage = require('../pages/login.js'),
    expect = require('./setupExpect').expect;

describe('Main page', function () {

    basePage.go();

    it('should be at the correct URL', function () {
        expect(basePage.currentUrl).to.eventually.equal(browser.baseUrl + basePage.url);
    });

    it('should let me click through to the login page', function () {
        basePage.goLogin();
        expect(loginPage.currentUrl).to.eventually.equal(browser.baseUrl + loginPage.url);
    });

    it('should return to the front page when clicking the Epik Vote link', function () {
        basePage.goHome();
        expect(basePage.currentUrl).to.eventually.equal(browser.baseUrl + basePage.url);
    });

});
