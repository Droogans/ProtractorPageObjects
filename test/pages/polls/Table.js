var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/political-polls' },

    tblColumnHeadings: {
        get: function() { return this.tblPolls.findElements(this.by.css('tr th')); }
    },

    tblPolls: {
        get: function() { return this.findElement(this.by.css('div.main-view')); }
    },

    tblRows: {
        get: function() { return this.tblPolls.findElements(this.by.css('tr[ng-repeat$="polls"]')); }
    },

    getHeading: {
        value: function () {
            // Notice that a `return` statement is used before each `.then` call, leading up to `return headingText;`.
            // This is because returning a `.then` function returns a promise. When a promise is returned, it
            // halts execution at that point in the application until the previous `.then` statement(s) return.
            // If you leave the return statement out, it won't wait here, and you'll get code that runs too early.
            // Sometimes, this is what you want to have happen.
            return this.tblPolls.findElement(this.by.css('div.heading')).then(function (headingElement) {
                // For instance, this headingElement won't do anything until the above `return` statement happens.
                // And when it does finish, it will continue here, returning yet another promise.
                return headingElement.getText().then(function (headingText) {
                    // Here, we have the result of the `getText()` promise, which is just the text in `headingElement`.
                    // We do not return a promise. We've "unwrapped" this promise all the way to the bottom.
                    // All we have now is text. Let's return it.
                    return headingText;
                });
            });
        }
    }

});
