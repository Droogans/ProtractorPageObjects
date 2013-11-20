var basePage = require('../pages/Base.js'),
    loginPage = require('../pages/login/Form.js');

describe('Login page', function(){

    it('beforeAll', function() {
        basePage.go();
        basePage.btnLogin.click();
    });

    it('should not log you in if username and password are blank', function() {
        loginPage.login('', '');
        expect(basePage.isLoggedIn()).toBe(false);
    });

    it('should not log you in if username is blank', function() {
        loginPage.login('', 'password');
        expect(basePage.isLoggedIn()).toBe(false);
    });

    it('should not log you in if password is blank', function() {
        loginPage.login('username', '');
        expect(basePage.isLoggedIn()).toBe(false);
    });

    it('should display an error if both username and password are incorrect', function() {
        loginPage.login('INVALID', 'INVALID');        
        expect(loginPage.lblLoginError.isDisplayed()).toBe(true);
    });

    it('should allow a user to login', function() {
        loginPage.login();
        expect(basePage.isLoggedIn()).toBe(true);
    });

    it('should allow a user to sign out', function() {
        basePage.btnLogout.click();
        expect(basePage.isLoggedIn()).toBe(false);
    });

});
