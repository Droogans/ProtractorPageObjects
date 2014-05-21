var _ = require('lodash'),
    basePage = require('../pages/base'),
    loginPage = require('../pages/login'),
    pollsTable = require('../pages/polls/table'),
    expect = require('./setupExpect').expect;

describe('Polls table', function() {

    before(function() {
        basePage.go();
        basePage.btnLogin.click();
        loginPage.login();
        basePage.tab('Polls').then(function (pollsTab) {
            pollsTab.visit();
        });
    });

    it('should have the right heading', function() {
        expect(pollsTable.title).to.eventually.equal('Polls');
    });

    describe('Polls rows', function() {
            
        var row;
        before(function () {
            pollsTable.row(1).then(function (rowOne) {
                row = rowOne;
            });
        });

        it('should have an href property', function () {
            var href = 'http://beta.epikvote.com/political-polls/view/merry-xmas';
            expect(row.href()).to.eventually.equal(href);
        });
        
        it('should have a text property', function () {
            expect(row.title()).to.eventually.equal('Merry Xmas');
        });

        it('should have a votes property', function () {
            expect(row.votes()).to.eventually.equal(0);
        });

    });

    describe('Polls columns', function() {

        var columns;
        before(function () {
            pollsTable.columns.then(function (allColumns) {
                columns = allColumns;
            });
        });

        it('should have some columns', function() {
            expect(_.keys(columns)).to.eql(['Title', 'Votes']);
        });

        it('should have title data', function () {
            var titleData = ['Merry Xmas', 'Is Google Evil?', 'Should I Pay Taxes?', 'My Test'];
            expect(columns['Title'].data()).to.eventually.eql(titleData);
        });
                
        it('should have vote data', function () {
            expect(columns['Votes'].data()).to.eventually.eql([0, 0, 0, 0]);
        });

    });

    after(function() {
        loginPage.logout();
    });

});
