var _ = require('lodash'),
    Page = require('astrolabe').Page,
    exceptions = require('exceptions'),
    pollsRows = require('./Rows'),
    pollsTable = require('./Table');

module.exports = Page.create({
    url: { value: '/political-polls' },

    getColumns: {
        value: function () {
            // This code is here to serve as an example of some ways NOT to do this.
            // The reson these column operations have become such a burden to define
            // is because the table's HTML has no attributes or classes that identify them.
            // We resort to some messy page functions to accommodate for this.
            var _this = this;
            var columns = {};
            return pollsTable.tblColumnHeadings.then(function (headingsObject) {
                _.forEach(headingsObject, function (heading) {
                    return heading.getText().then(function (headingText) {
                        columns[headingText.toLowerCase()] = _this.getColumnByName(headingText);
                    });
                });
                return columns;
            });
        }
    },

    getColumnByName: {
        value: function (columnName) {
            return {
                // Since we can't find our column heading, we just assign it here.
                // This makes our object awkward to use, since the `name` won't be a promise.
                name: columnName,
                data: this._getColumnData(columnName)
            };
        }
    },

    _getColumnData: {
        // We're now resorting to passing in our `columnHeading`, since there is no way
        // of determining which column we're dealing with once we've evalutaed it.
        // I have no other option but to do so this way, since I can't change the source.
        // In a real life situation, you should never define your columns by their
        // position on the table. Instead, reach out to a developer and ask them to assign
        // each column with a class or other attribute that identifies the current column.
        // Let this function's definition serve as a warning of how not to do this!
        // If you find yourself using these patterns, stop and refine your HTML.
        value: function (columnHeading) {
            // A better way to have done this is to have a css selector get what we need for us:
            // return pollsTable.findElements(this.by.css('td[column-name="' + columnHeading  + '"]')).then...
            switch (columnHeading.toLowerCase()) {
                case "name":
                    return this._getColumnLinks();
                case "votes":
                    return this._getColumnVotes();
                default:
                    this.NoSuchColumnException.thro(columnHeading);
                    break;
            }
        }
    },

    _getColumnLinks: {
        value: function () {
            var links = [];
            return pollsTable.tblRows.then(function (rows) {
                _.forEach(rows, function (row) {
                    // Here is a good thing in this otherwise bad example.
                    // Reuse the code for building row link objects in your columns.
                    links.push(pollsRows._getRowLink(row));
                });
                return links;
            });
        }
    },

    _getColumnVotes: {
        value: function () {
            var votes = [];
            return pollsTable.tblRows.then(function (rows) {
                _.forEach(rows, function (row) {
                    votes.push(pollsRows._getRowVotes(row));
                });
                return votes;
            });
        }
    },

    NoSuchColumnException: {
        get: function() { return new exceptions.Exception('No such column'); }
    }

});
