var Page = require('astrolabe').Page;
var basePage = require('./base');

module.exports = Page.create({
    url: { value: '/login' },

    btnLogin: { 
        get: function () { return $('button[type="submit"]'); } 
    },

    lblLoginError: { 
        get: function () { return $('div.alert'); } 
    },

    lnkForgotPassword: { 
        get: function () { return $('a[href="/forgotPassword"]'); } 
    },

    lnkCreateAccount: { 
        get: function () { return $('a[href="/signup"]'); } 
    },

    txtUsername: {
        get: function () { return $('#email'); }
    },

    txtPassword: {
        get: function () { return $('#password'); }
    },

    login: {
        // Like `get:` was for page fields, `value:` signifies a function for the page object.
        // This is where the arguments for your page function are supplied.
        value: function (username, password) {
            // Astrolabe provides `this.driver`, which maps to the protractor instance.
            // With this code, successful logins can be shortened to `loginPage.login();`
            username = username === undefined ? this.driver.params.login.username : username;            
            password = password === undefined ? this.driver.params.login.password : password;

            this.txtUsername.clear();
            this.txtUsername.sendKeys(username);
            this.txtPassword.clear();
            this.txtPassword.sendKeys(password);
            this.btnLogin.click();
        }
    },

    logout: {
        value: function () {
            basePage.btnLogout.click();
        }
    }

});
