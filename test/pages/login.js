var base = require('./base');

var Page = require('astrolabe').Page;

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
        value: function (username, password) {
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
            base.btnLogout.click();
        }
    }

});
