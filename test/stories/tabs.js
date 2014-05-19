var _ = require('lodash'),
    basePage = require('../pages/base'),
    loginPage = require('../pages/login'),
    expect = require('./setupExpect').expect;

describe('Tabs', function () {

    var tabs;
    before(function () {
        basePage.go();
        basePage.btnLogin.click();
        loginPage.login();
        basePage.tabs.then(function (baseTabs) {
            tabs = baseTabs;
        });
    });

    it('should display two tabs', function () {
        expect(_.size(tabs)).to.equal(2);
    });

    it('should not have the profile tab active by default', function () {
        expect(tabs['Profile'].isActive()).to.eventually.be.false;
    });

    it('should not have the polls tab active by default', function () {
        expect(tabs['Polls'].isActive()).to.eventually.be.false;
    });

    it('should allow users to navigate to the polls tab', function () {
        basePage.tab('Polls').then(function (pollsTab) {
            pollsTab.visit();
            expect(pollsTab.isActive()).to.eventually.be.true;
        });
    });

    it('should allow users to navigate to the profile tab', function () {
        basePage.tab('Profile').then(function (profileTab) {
            profileTab.visit();
            expect(profileTab.isActive()).to.eventually.be.true;
        });
    });

    it('should throw an error when an invalid tab is requested', function () {
        expect(basePage.tab('INVALID')).to.be.rejectedWith('INVALID');
    });

    after(function () {
        loginPage.logout();
    });

});
