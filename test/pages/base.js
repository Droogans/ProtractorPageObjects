var _ = require('lodash'),
    Page = require('astrolabe').Page;

// This is used by both `getTabByName` and `tblTabs`.
var tblTabsCss = 'ul.navbar-nav li[ng-show$="loggedIn"] a';

module.exports = Page.create({
    url: { value: '/home' },

    btnLogin: {
        get: function() { return this.find.by.css('button.navbar-btn'); }
    },

    btnLogout: {
        get: function() { return this.btnLogin; }
    },

    lnkEpikVote: {
        get: function() { return this.find.by.css('a.epik-brand'); }
    },

    tblTabs: {
        get: function() { return this.find.all.by.css(tblTabsCss); }
    },

    getTabs: {
        value: function () {
            // First, we need to create a reference to `this`.
            // Since we're using functions inside of other functions,
            // the scope of the `this` keyword changes.
            // By copying the original scope, we can use it as we'd expect.
            var _this = this;
            var tabs = {};
            return this.tblTabs.then(function (tabsTable) {
                _.forEach(tabsTable, function (tab) {
                    return tab.getText().then(function (tabText) {
                        // Here, we use the original `_this` from above.
                        // Without it, we'd be referring to the `this`
                        // we got when we created `tab.getText().then()`
                        tabs[tabText.toLowerCase()] = _this._getTab(tab);
                    });
                });
                return tabs;
            });
        }
    },

    getTabByName: {
        value: function (tabName) {
            var _this = this;
            var tabHref = tabName.toLowerCase();
            var tabCss = tblTabsCss + '[href$="' + tabHref  + '"]';
            // We use `this.find.all` because it might return an empty list
            return this.find.all.by.css(tabCss).then(function (tabs) {
                if (tabs.length) {
                    // If there is a list, we accept the first one as our tab
                    return _this._getTab(tabs[0]);
                } else {
                    // otherwise, the list is empty, and there is no such tab
                    _this.NoSuchTabException.thro(tabName);
                }
            });
        }
    },

    isLoggedIn: {
        value: function () {
            return this.btnLogout.getText().then(function (buttonText) {
                return buttonText === 'Sign Out';
            });
        }
    },

    _getTab: {
        // We prepend this function with an underscore to serve as an
        // indicator/warning that, although this function is public,
        // it's really only supposed to be used internally.
        // If you want to *actually* get a tab, use `getTabs`,
        // which is the "friendly" public function.
        value: function (tabObject) {
            var _this = this;
            return {
                text: this._tabText(tabObject),
                // `visit` and `isActive` are functions. This is how you make one.
                isActive: function () { return _this._tabIsActive(tabObject); },
                visit: function () { return tabObject.click();  }
            };
        }
    },

    _tabIsActive: {
        value: function (tabObject) {
            return tabObject.getCssValue('color').then(function (fontColor) {
                // White font for active tabs
                return fontColor === 'rgba(255, 255, 255, 1)';
            });
        }
    },

    _tabText: {
        value: function (tabObject) {
            return tabObject.getText().then(function (tabText) {
                return tabText;
            });
        }
    },

    NoSuchTabException: {
        get: function() { return this.exception('No such tab'); }
    }

});
