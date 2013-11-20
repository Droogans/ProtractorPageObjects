var _ = require('lodash'),
    Page = require('astrolabe').Page,
    exceptions = require('exceptions'),
    pollsTable = require('./Table');

module.exports = Page.create({
    url: { value: '/political-polls' },

    getRows: {
        // This is going to do heavy operations on all rows.
        // It is a very expensive call to make, taking ~1500 msecs to complete.
        // Perfer using `getRowByNumber` if possible.
        value: function () {
            var _this = this;
            var rows = [];
            return pollsTable.tblRows.then( function (rowPromises) {
                _.forEach(rowPromises, function (rowPromise) {
                    return rowPromise.then( function (row) {
                        rows.push(_this._getRow(row));
                    });
                });
                return rows;
            });
        }
    },

    getRowByNumber: {
        value: function (rowNumber) {
            // This functon is not zero-indexed (i.e., for the first row, use `getRowByNumber(1)`
            var _this = this;
            return pollsTable.tblRows.then( function (pollsRows) {
                if (rowNumber < 1 || rowNumber > pollsRows.length) {
                    _this.NoSuchRowException.thro('use row number 1 through ' + pollsRows.length);
                }
                return pollsRows[rowNumber - 1].then( function (rowPromise) {
                    return rowPromise.then( function (rowObject) {
                        return _this._getRow(rowObject);
                    });
                });
            });
        }
    },

    _getRow: {
        value: function (rowObject) {
            return {
                // _getRowLink returns an object, so it will have nested methods.
                link: this._getRowLink(rowObject),
                votes: this._getRowVotes(rowObject)
            };
        }
    },

    _getRowLink: {
        // Here, we create yet another object, just to show how it's done.
        // You may not actually need this much functionality for a simple link.
        value: function (rowObject) {
            var row = rowObject;
            var _this = this;
            // These functions are our helper methods. They're used at the bottom.
            // Because they are all within this same `_getRowLink` function,
            // no `this` keyword is required to reference them.
            function getLink() {
                return row.findElement(this.by.css('td a')).then( function (linkPromise) {
                    return linkPromise;
                });
            }
            function getLinkText() {
                return getLink().then( function (link) {
                    return link.getText().then( function (linkText) {
                        return linkText;
                    });
                });
            }
            function getLinkHref() {
                return getLink().then( function (link) {
                    return link.getAttribute('href').then( function (href) {
                        return href;
                    });
                });
            }
            // Here's the actual object. We can get some information about the link, or click it.
            return {
                href: getLinkHref(),
                text: getLinkText(),
                visit: function () { return _this.getLink().click(); }
            };
        }
    },

    _getRowVotes: {
        value: function (rowObject) {
            // Will return an integer representing the number of votes in the "Votes" column.
            return rowObject.findElement(this.by.css('td.ng-binding')).then( function (votesPromise) {
                return votesPromise.getText().then( function (votesText) {
                    return parseInt(votesText, 10);
                });
            });
        }
    },

    NoSuchRowException: {
        get: function() { return new exceptions.Exception('No such row number'); }
    }

});
