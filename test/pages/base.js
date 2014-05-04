var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/home' },

    btnLogin: {
        get: function() { return this.find.by.css('button.navbar-btn'); }
    },

    btnLogout: { 
        // This is aliased to btnLogin, providing a meaningful semantic binding
        get: function() { return this.btnLogin; }
    },

    lnkEpikVote: {
        get: function() { return this.find.by.css('a.epik-brand'); }
    },

    isLoggedIn: {
        value: function () {
            return this.btnLogout.getText().then(function (buttonText) {
                return buttonText === 'Sign Out';
            });
        }
    }

});
