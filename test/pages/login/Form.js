var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/login' },

    btnLogin: {
        get: function() { return this.findElement(this.by.css('button[type="submit"]')); }
    },

    lblLoginError: {
        get: function() { return this.findElement(this.by.css('div.alert')); }
    },

    lnkForgotPassword: {
        get: function() { return this.findElement(this.by.css('a[href="/forgotPassword"]')); }
    },

    lnkCreateAccount: {
        get: function() { return this.findElement(this.by.css('a[href="/signup"]')); }
    },

    txtUsername: {
        get: function() { return this.findElement(this.by.css('#email')); }
    },

    txtPassword: {
        get: function() { return this.findElement(this.by.css('#password')); }
    },

    login: {
        value: function (username, password) {
            if (username === undefined) {
                username = this.driver.params.login.username;
            }
            if (password === undefined) {
                password = this.driver.params.login.password;
            }
            this.txtUsername.clear();
            this.txtUsername.sendKeys(username);
            this.txtPassword.clear();
            this.txtPassword.sendKeys(password);
            this.btnLogin.click();
        }
    }

});
