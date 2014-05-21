var Page = require('astrolabe').Page;
var rows = require('./table/rows');
var columns = require('./table/columns');

module.exports = Page.create({
    url: { value: '/political-polls' },

    tblPolls: {
        get: function() { return $('div.blue-panel'); }
    },

    rows: {
        get: function () { return rows.all; }
    },

    row: {
        value: function (rowNumber) {
            return rows.byNumber(rowNumber);
        }
    },

    columns: {
        get: function () { return columns.all; }
    },

    column: {
        value: function (columnName) {
            return column.byName(columnName);
        }
    },

    title: {
        get: function () {
            return this.tblPolls.$('div.heading').getText();
        }
    }

});
