var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/login' },

    btnLogin: {
        get: function() { return this.find.by.css('button[type="submit"]'); }
    },

    lblLoginError: {
        get: function() { return this.find.by.css('div.alert'); }
    },

    lnkForgotPassword: {
        get: function() { return this.find.by.css('a[href="/forgotPassword"]'); }
    },

    lnkCreateAccount: {
        get: function() { return this.find.by.css('a[href="/signup"]'); }
    },

    txtUsername: {
        get: function() { return this.find.by.css('#email'); }
    },

    txtPassword: {
        get: function() { return this.find.by.css('#password'); }
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
    }

});
