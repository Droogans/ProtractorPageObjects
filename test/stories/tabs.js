var _ = require('lodash'),
    basePage = require('../pages/Base'),
    loginPage = require('../pages/login/Form'),
    expect = require('./setupExpect').expect;

describe('Tabs', function() {

    before(function() {
        basePage.go();
        basePage.btnLogin.click();
        loginPage.login();
    });

    it('should display two tabs', function() {
        basePage.getTabs().then(function (tabs) {
            expect(_.size(tabs)).to.equal(2);
            expect(tabs.profile.text).to.eventually.equal('Profile');
            expect(tabs.profile.isActive()).to.eventually.be.false;
            expect(tabs.polls.text).to.eventually.equal('Polls');
            expect(tabs.polls.isActive()).to.eventually.be.false;
        });
    });

    it('should allow users to navigate by tabs', function() {
        // Why is the 'Polls' page so slow? Comment out this test to see.
        basePage.getTabByName('Polls').then(function (pollsTab) {
            pollsTab.visit();
            expect(pollsTab.isActive()).to.eventually.be.true;
        });
        // Leave this test uncommented. It runs perfectly fast.
        basePage.getTabByName('Profile').then(function (profileTab) {
            profileTab.visit();
            expect(profileTab.isActive()).to.eventually.be.true;
        });
    });

    after(function () {
        basePage.btnLogout.click();
    });
});
