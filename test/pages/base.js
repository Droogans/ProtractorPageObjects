var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/home' },

    btnLogin: {
        get: function () { return $('button.navbar-btn'); }
    },

    lnkEpikVote: {
        get: function () { return $('a.epik-brand'); }
    },

    goLogin: {
        // Although this function seems useless, it may save us trouble later on
        // should the process of logging in require more than a simple link click.
        value: function () {
            this.btnLogin.click();
        }
    },

    goHome: {
        // Takes the user back to the home page.
        value: function () {
            this.lnkEpikVote.click();
        }
    }

});
