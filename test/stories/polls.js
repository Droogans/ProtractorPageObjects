var _ = require('lodash'),
    basePage = require('../pages/base'),
    loginPage = require('../pages/login/form'),
    pollsColumns = require('../pages/polls/columns'),
    pollsRows = require('../pages/polls/rows'),
    pollsTable = require('../pages/polls/table'),
    expect = require('./setupExpect').expect;

describe('Polls table', function() {

    before(function() {
        basePage.go();
        basePage.btnLogin.click();
        loginPage.login();
        basePage.getTabByName('Polls').then(function (pollsTab) {
            pollsTab.visit();
        });
    });

    it('should have the right heading', function() {
        expect(pollsTable.getHeading()).to.eventually.equal('Polls');
    });

    describe('Polls rows', function() {

        // This test is for demonstration purposes only.
        // To highlight this, the `it` function has been
        // changed to `it.skip`, marking it for skipping.
        it.skip('should show some rows', function() {
            // Get rows is a very slow call.
            // Perfer using `getRowByNumber` if possible.
            // There are some instances where all rows are needed,
            // so it is still shown here for demonstration purposes.
            pollsRows.getRows().then(function (rows) {
                expect(rows.length).to.be.above(0);
                // You could continue here, using rows[0] to mimic the next test shown below.
            });
        });

        it('should have specific information in the first row', function() {
            pollsRows.getRowByNumber(1).then(function (row) {
                // Uncomment this console.log statement to see how this row works:
                // console.log(row);
                row.link.href.then(function (rowHref) {
                    var href = 'http://beta.epikvote.com/political-polls/view/merry-xmas';
                    expect(rowHref).to.equal(href);
                });
                row.link.text.then(function (rowText) {
                    expect(rowText).to.equal('Merry Xmas');
                });
                expect(row.votes).to.eventually.equal(0);
            });
        });

    });

    describe('Polls columns', function() {

        // This is another slow test. Prefer using `getColumnByName` instead.
        // It is skipped unless you decide to examine it closer.
        it.skip('should have some columns', function() {
            pollsColumns.getColumns().then(function (columns) {
                // Uncomment this line to see how columns get names,
                // where rows get put into a simple list.
                // console.log(columns);
                pollsTable.tblColumnHeadings.then(function (headings) {
                    expect(_.size(columns)).to.equal(headings.length);
                });
                pollsTable.tblRows.then(function (rows) {
                    columns.title.data.then(function (titles) {
                        expect(titles.length).to.equal(rows.length);
                    });
                    columns.votes.data.then(function (votes) {
                        expect(votes.length).to.equal(rows.length);
                    });
                });
            });
        });

        it('should have specific data in each column', function() {
            // Since our table's HTML doesn't support column identifiers,
            // we're left with an awkward implementation of columns in our test.
            pollsColumns.getColumnByName('Title').data.then(function (titles) {
                // Uncomment to see that these have the same links object as our rows.
                // console.log(titles);
                expect(titles[1].text).to.eventually.equal('Is Google Evil?');
            });
            pollsColumns.getColumnByName('Votes').data.then(function (votes) {
                expect(votes[1]).to.eventually.equal(0);
            });
        });

    });

    after(function() {
        basePage.btnLogout.click();
    });

});
