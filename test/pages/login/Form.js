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
        // Like `get:` was for page fields, `value:` signifies a function for the page object.
        // This is where the arguments for your page function are supplied.
        value: function (username, password) {
            if (username === undefined) {
                // Astrolabe provides `this.driver`, which maps to the protractor instance.
                username = this.driver.params.login.username;
            }
            if (password === undefined) {
                // With this code, successful logins can be shortened to `loginPage.login();`
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
