# Chapter 3 - The Login Page

This section is going to cover an important part of many sites: logging in.

## The problem with logging into sites

**Q**: *Where do I put the credentials for logging in?*

>  - This depends on where you're logging in. Is it a staging environment, using test accounts? You might be able to get away with placing those kind of passwords in a [configuration file](https://github.com/angular/protractor/blob/cda66d7d9efa48a9acb08d2f97c79fbe7baa31d7/referenceConf.js#L85) accessible to protractor.

**Q**: *I am using sensitive passwords in a production-like environment. How do I handle this?*

>  - First of all, *this is a bad idea*. But I understand that you might find yourself in this position. Whatever you do, [**do not check in passwords to repositories, public or private**](https://help.github.com/articles/remove-sensitive-data). For the sake of best practices, we'll cover a way to hide our passwords and use them in a semi-secured fashion.

Since our site is "live" (for ease of access), we'll have to use a live production account. I will supply you a username and password seperately that you'll need to add to a file that's been ignored by the project: `test/secrets.js`. This file has to be added to the [.gitignore](.gitignore) to work, which I've already done.

## Storing passwords (semi) securely

Using a text editor, create a new file in the `test` directory called `secrets.js`. Inside of it, copy and paste these credentials into it:

```js
module.exports = {
    credentials: {
        username: 'chris',
        password: 'qwerty'
    }
};
```

When you do share your ignored passwords with others, do so in a secure manner.

The main point is, give out production credentials on a per-person basis, and do so manually.

## Using ignored passwords

First, you need to `require` the ignored *secrets* file.

```js
var secret = require('./secrets');
```

The trick to making this all work is replacing a line that would normally store our passwords with this:

```js
params: {
    login: secret.credentials
}
```

Now our protractor instance has our username and password at runtime without explicitly revealing what those are in the code. We can also add more secrets to this file, as they are needed, perhaps for api keys, etc. Using this approach, we have one secrets file that contains all of our project's secrets.

See the actual [protractor configuration file](test/protractor.conf.js) for more info about how to go about doing this.

## Defining our login page

Aside from defining our page elements, a new feature of Astrolabe is exposed here: page functions.

## When to use page functions

Think about what steps are involved in logging in:

1. Entering a username and password
2. Clicking the sign in button

Since we have more than one action going on there, we should wrap this up into a function. A basic function would look like this:

```js
login: {
    value: function (username, password) {
        this.txtUsername.sendKeys(username);
        this.txtPassword.sendKeys(password);
        this.btnLogin.click();
    }
}
```

This is a good start. Here are some improvements that are quite common, and can be used in other situations as well:

1. Check if `username` and/or `password` is `undefined`.
  - If so, use the default credentials provided in the project.
2. Clear the textboxes before typing into them.

To see a more in-depth login function, check [the source](test/pages/login.js).

## Our login tests

See the test exercising the [login page](test/stories/login.js) for some basic examples of login tests.

One final note: the setup for this test required that we manually navigate to the login page. We wrapped this in a `before` function that doesn't actually test anything. Now that we have to login to our site to continue testing it, we'll see more `before` tests. These are simply there to highlight the set up and, later, teardown (which would go inside of `after`).

## Continuing

Run

    $> git checkout -b chapter-4 origin/chapter-4

to skip ahead, or just [visit this branch in your browser](../../tree/chapter-4).
