var _ = require('lodash'),
    basePage = require('../pages/Base'),
    loginPage = require('../pages/login/Form'),
    pollsColumns = require('../pages/polls/Columns'),
    pollsRows = require('../pages/polls/Rows'),
    pollsTable = require('../pages/polls/Table');

describe('Polls table', function() {

    it('beforeAll', function() {
        basePage.go();
        basePage.btnLogin.click();
        loginPage.login();
        basePage.getTabByName('Polls').then(function (pollsTab) {
            pollsTab.visit();
        });
    });

    it('should have the right heading', function() {
        expect(pollsTable.getHeading()).toEqual('Polls');
    });

    describe('Polls rows', function() {

        // This test is for demonstration purposes only.
        // To highlight this, the `it` function has been
        // changed to `xit`, marking it for skipping.
        xit('should show some rows', function() {
            // Get rows is a very slow call.
            // Perfer using `getRowByNumber` if possible.
            // There are some instances where all rows are needed,
            // so it is still shown here for demonstration purposes.
            pollsRows.getRows().then(function (rows) {
                expect(rows.length).toBeGreaterThan(0);
                // You could continue here, using rows[0] to mimic the next test shown below.
            });
        });

        it('should have specific information in the first row', function() {
            pollsRows.getRowByNumber(1).then(function (row) {
                // Uncomment this console.log statement to see how this row works:
                // console.log(row);
                row.link.href.then(function (rowHref) {
                    var href = 'http://beta.epikvote.com/political-polls/do-you-support-battleground-texas';
                    expect(rowHref).toEqual(href);
                });
                row.link.text.then(function (rowText) {
                    expect(rowText).toEqual('Do you support Battleground Texas');
                });
                expect(row.votes).toEqual(12);
            });
        });

    });

    describe('Polls columns', function() {

        // This is another slow test. Prefer using `getColumnByName` instead.
        // It is skipped unless you decide to examine it closer.
        xit('should have some columns', function() {
            pollsColumns.getColumns().then(function (columns) {
                // Uncomment this line to see how columns get names,
                // where rows get put into a simple list.
                // console.log(columns);
                pollsTable.tblColumnHeadings.then(function (headings) {
                    expect(_.size(columns)).toEqual(headings.length);
                });
                pollsTable.tblRows.then(function (rows) {
                    columns.name.data.then(function (names) {
                        expect(names.length).toEqual(rows.length);
                    });
                    columns.votes.data.then(function (votes) {
                        expect(votes.length).toEqual(rows.length);
                    });
                });
            });
        });

        it('should have specific data in each column', function() {
            // Since our table's HTML doesn't support column identifiers,
            // we're left with an awkward implementation of columns in our test.
            pollsColumns.getColumnByName('Name').data.then(function (names) {
                // Uncomment to see that these have the same links object as our rows.
                // console.log(names);
                expect(names[1].text).toEqual('Future of Womens Health Issues');
            });
            pollsColumns.getColumnByName('Votes').data.then(function (votes) {
                expect(votes[1]).toEqual(22);
            });
        });

    });


    it('afterAll', function() {
        basePage.btnLogout.click();
    });

});
