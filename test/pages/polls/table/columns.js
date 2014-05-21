var _ = require('lodash'),
    Page = require('astrolabe').Page,
    rows = require('./rows');

module.exports = Page.create({
    url: { value: '/political-polls' },

    tblColumnHeadings: {
        get: function() { return $$('.blue-panel tr th'); }
    },

    all: {
        get: function () {
            var page = this;
            var columns = {};
            return this.tblColumnHeadings.then(function (headingElements) {
                _.forEach(headingElements, function (headingElement) {
                    return headingElement.getText().then(function (headingText) {
                        columns[headingText] = page.byName(headingText);
                    });
                });
                return columns;
            });
        }
    },

    byName: {
        value: function (columnName) {
            var page = this;
            return {
                name: function () { return columnName; },
                data: function () { return page.columnDataFromName(columnName); }
            };
        }
    },

    columnDataFromName: {
        // We're now resorting to passing in our `columnName`, since there is no way
        // of determining which column we're dealing with once we've evalutaed it.
        // I have no other option but to do so this way, since I can't change the source.
        // In a real life situation, you should never define your columns by their
        // position on the table. Instead, reach out to a developer and ask them to assign
        // each column with a class or other attribute that identifies the current column.
        // Let this function's definition serve as a warning of how not to do this!
        // If you find yourself using these patterns, stop and refine your HTML.
        value: function (columnName) {
            // A better way to have done this is to have a css selector get what we need for us:
            // return pollsTable.$$('td[column-name="' + columnName  + '"]')
            switch (columnName.toLowerCase()) {
                case "title":
                    return this.titles;
                case "votes":
                    return this.votes;
                default:
                    this.NoSuchColumnException.thro(columnHeading);
            }
        }
    },

    titles: {
        get: function () {
            var titles = [];
            return rows.tblRows.then(function (rowElements) {
                _.forEach(rowElements, function (rowElement) {
                    // Here is a good thing in this otherwise bad example.
                    // Reuse the code for building row link objects in your columns.
                    return rows.rowTitleFromElement(rowElement).then(function (title) {
                        titles.push(title); 
                    });
                });
                return titles;
            });
        }
    },

    votes: {
        get: function () {
            var votes = [];
            return rows.tblRows.then(function (rowElements) {
                _.forEach(rowElements, function (rowElement) {
                    return rows.rowVotesFromElement(rowElement).then(function (vote) {
                        votes.push(vote);
                    });
                });
                return votes;
            });
        }
    },

    NoSuchColumnException: {
        get: function() { return this.exception('No such column'); }
    }

});
