var _ = require('lodash'),
    Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/political-polls' },

    tblRows: {
        get: function() { return $$('tr[ng-repeat$="polls"]'); }
    },

    length: {
        get: function () { return this.tblRows.length; }
    },

    all: {
        get: function () {
            var page = this;
            var rows = [];
            return this.tblRows.then(function (rowPromises) {
                _.forEach(rowPromises, function (rowPromise) {
                    return rowPromise.then(function (row) {
                        rows.push(page.rowFromElement(row));
                    });
                });
                return rows;
            });
        }
    },

    byNumber: {
        value: function (rowNumber) {
            // This functon is not zero-indexed (i.e., for the first row, use `getRowByNumber(1)`
            var page = this;
            return this.tblRows.then(function (pollsRows) {
                if (rowNumber < 1 || rowNumber > pollsRows.length) {
                    page.NoSuchRowException.thro('use row number 1 through ' + pollsRows.length);
                }
                return page.rowFromElement(pollsRows[rowNumber - 1]);
            });
        }
    },

    rowFromElement: {
        value: function (rowElement) {
            var page = this;
            return {
                title: function () { return page.rowTitleFromElement(rowElement); },
                href: function () { return page.rowHrefFromElement(rowElement); },
                visit: function () { return page.rowVisitFromElement(rowElement); },
                votes: function () { return page.rowVotesFromElement(rowElement); }
            };
        }
    },

    rowTitleFromElement: {
        value: function (rowElement) {
            return rowElement.$('td').getText();
        }
    },

    rowHrefFromElement: {
        value: function (rowElement) {
            return rowElement.$('td a').getAttribute('href');
        }
    },

    rowVisitFromElement: {
        value: function (rowElement) {
            rowElement.$('td a').click();
        }
    },

    rowVotesFromElement: {
        value: function (rowElement) {
            // Will return an integer representing the number of votes in the "Votes" column.
            return rowElement.$('td.ng-binding').then(function (votesPromise) {
                return votesPromise.getText().then(function (votesText) {
                    return parseInt(votesText, 10);
                });
            });
        }
    },

    NoSuchRowException: {
        get: function() { return this.exception('No such row number'); }
    }

});
