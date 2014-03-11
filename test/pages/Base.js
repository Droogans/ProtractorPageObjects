var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '/home' },

    // The name of our page elements go here
    btnLogin: {
        get: function() { return this.find.by.css('button.navbar-btn'); }

        // Let's look closer at this page element's code more closely:
        //
        // get: function()
        //  - `get` is used to signify a page element (as an attribute).
        //
        // return this.findElement
        //  - You can also write `findElements` for selecting a group of matching elements.
        //
        // this.by.css('button.navbar-btn')
        //  - `by.css` is how we select things. See the chapter 1 README for more on CSS selectors.
    },

    lnkEpikVote: {
        get: function() { return this.find.by.css('a.epik-brand'); }
    }


    // Our page functions go down here, below the elements.
    // Q: Why isn't there a login() function defined here?
    // A: We could define it, but the code would look like this:
    //
    // login: {
    //     value: function () {
    //         this.btnLogin.click();
    //     }
    // }
    //
    // And that doesn't really save us much typing.
    // If we can call an element directly, then just call the element.
    // Don't write functions around trivial selenium interactions.

});
