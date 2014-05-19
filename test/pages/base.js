var _ = require('lodash'),
    Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/home' },

    cssTabs: {
        // This is used by both `getTabByName` and `tblTabs`.
        get: function () { return 'ul.navbar-nav li[ng-show$="loggedIn"] a'; }
    },

    btnLogin: {
        get: function () { return $('button.navbar-btn'); }
    },

    btnLogout: {
        get: function () { return this.btnLogin; }
    },

    lnkEpikVote: {
        get: function () { return $('a.epik-brand'); }
    },

    tblTabs: {
        get: function () { return $$(this.cssTabs); }
    },

    goLogin: {
        value: function () {
            this.btnLogin.click();
        }
    },

    goHome: {
        value: function () {
            this.lnkEpikVote.click();
        }
    },

    isLoggedIn: {
        value: function () {
            return this.btnLogout.getText().then(function (buttonText) {
                return buttonText === 'Sign Out';
            });
        }
    },

    tabs: {
        get: function () {
            // First, we need to create a reference to `this`.
            // Since we're using functions inside of other functions,
            // the scope of the `this` keyword changes.
            // By copying the original scope, we can use it as we'd expect.
            var page = this;
            var tabs = {};
            return this.tblTabs.then(function (tabElements) {
                _.forEach(tabElements, function (tabElement) {
                    var tab = page.tabFromElement(tabElement);
                    return tab.name().then(function (name) {
                        // Here, we use the original `page` from above.
                        // Without it, we'd be referring to the `this`
                        // we got from above.
                        tabs[name] = tab;
                    });
                });
                return tabs;
            });
        }
    },

    tab: {
        value: function (tabName) {
            var page = this;
            var tabHref = tabName.toLowerCase();
            var tabCss = this.cssTabs + '[href$="' + tabHref  + '"]';
            // We use `this.find.all` because it might return an empty list
            return $$(tabCss).then(function (tabs) {
                if (tabs.length) {
                    // If there is a list, we accept the first one as our tab
                    return page.tabFromElement(tabs[0]);
                } else {
                    // otherwise, the list is empty, and there is no such tab
                    page.NoSuchTabException.thro(tabName);
                }
            });
        }
    },

    tabFromElement: {
        // We prepend this function with an underscore to serve as an
        // indicator/warning that, although this function is public,
        // it's really only supposed to be used internally.
        // If you want to *actually* get a tab, use `getTabs`,
        // which is the "friendly" public function.
        value: function (tabElement) {
            var page = this;
            return {
                name: function () { return page.tabNameFromElement(tabElement); },
                isActive: function () { return page.tabIsActiveFromElement(tabElement); },
                visit: function () { tabElement.click(); }
            };
        }
    },

    tabIsActiveFromElement: {
        value: function (tabElement) {
            return tabElement.getCssValue('color').then(function (fontColor) {
                // White font for active tabs
                return fontColor === 'rgba(255, 255, 255, 1)';
            });
        }
    },

    tabNameFromElement: {
        value: function (tabElement) {
            return tabElement.getText().then(function (name) {
                return name;
            });
        }
    },

    NoSuchTabException: {
        get: function () { return this.exception('No such tab'); }
    }

});
