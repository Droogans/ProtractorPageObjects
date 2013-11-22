var _ = require('lodash'),
    basePage = require('../pages/Base'),
    loginPage = require('../pages/login/Form');

describe('Tabs', function() {

    it('beforeAll', function() {
        basePage.go();
        basePage.btnLogin.click();
        loginPage.login();
    });

    it('should display two tabs', function() {
        basePage.getTabs().then( function (tabs) {
            expect(_.size(tabs)).toEqual(2);
            expect(tabs.profile.text).toEqual('Profile');
            expect(tabs.profile.isActive()).toBe(false);
            expect(tabs.polls.text).toEqual('Polls');
            expect(tabs.polls.isActive()).toBe(false);
        });
    });

    it('should allow users to navigate by tabs', function() {
        basePage.getTabByName('Polls').then( function (pollsTab) {
            pollsTab.visit();
            expect(pollsTab.isActive()).toBe(true);
        });
        basePage.getTabByName('Profile').then( function (profileTab) {
            profileTab.visit();
            expect(profileTab.isActive()).toBe(true);
        });
    });

    it('afterAll', function () {
        basePage.btnLogout.click();
    });
});
