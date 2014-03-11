# Chapter 4 - The Tabs

We're going to introduce a pretty complex topic by using a simple example.

Here's an example: when you sign into a website where you are a regular user, perhaps you have two different tabs you can see. But when you sign in as an admin, you get an extra tab for managing some special features. I've seen these kinds of situations handled in the following way:

```js
if (user.isAdmin()) {
    tabs = getAdminTabs();
} else {
    tabs = getTabs();
}
```

A couple of things that are bad here:

1. What does `isAdmin()` do?
  - We'll have to maintain that function's logic to keep this up.
2. What's the difference between `getAdminTabs()` and `getTabs()`?
  - I bet the logic is ~80% the same between them.
  - We'll have to maintain them seperately to keep this up.
3. Are there any other roles?
  - What if there's a new type of user added? Yet another if statement?

## A look at dynamic objects

The solution is to do something like this:

```js
tabs = getTabs();
```

Where `getTabs()` might look something like this:

```js
getTabs: {
    value: function () {
        var tabs = {};
        return this.tblTabs.then( function (tabsTable) {
            _.forEach(tabsTable, function (tab) {
                return tab.getText().then( function (name) {
                    tabs[name.toLowerCase()] = tab;
                });
            });
            return tabs;
        });
    }
}
```

All this does is:

1. Iterate over all of the tabs we currently have
2. Get some attribute that uniquely identifies that tab
3. Name the tab that
4. Assign the tab itself to that name

So now when we use the site as a regular user, our tabs look like this:

```js
{
    profile: <WebDriverElement>,
    polls: <WebDriverElement>
}
```

And this same code will assign the special "admin" tabs as well:

```js
{
    profile: <WebDriverElement>,
    polls: <WebDriverElement>,
    banhammer: <WebDriverElement>
}
```

**Q**: *Won't my tests be different for different users though?*
>  - Yes. However, if I had to choose between remembering how my tests work versus how my page objects work, I'll choose the former. You can always abstract away user logins too, so that your login page features a `loginAdmin()` function to help with this.

## Creating custom objects

There are some neat things about using this "dynamic" model. We have a chance to intercept these tabs when we assign them to our `tabs` object, and give them special functionality.

Instead of returning just a normal tab, we can pass this `tabObject` into a constructor that builds us additional functionality:

```js
getTabs: {
    value: function () {
        var _this = this;
        var tabs = {};
        return this.tblTabs.then( function (tabsTable) {
            _.forEach(tabsTable, function (tab) {
                return tab.getText().then( function (tabText) {
                    tabs[tabText.toLowerCase()] = _this._getTab(tab);
                });
            });
            return tabs;
        });
    }
},

_getTab: {
    value: function (tabObject) {
        var _this = this;
        return {
            // Skip to the source to see how these custom functions are implemented.
            text: this._tabText(tabObject),
            isActive: function () { return _this._tabIsActive(tabObject); },
            visit: function () { return tabObject.click();  }
        };
    }
}
```

## An example of this

See the code for the [tabs on the base page](test/pages/Base.js), and their [respective tests](test/stories/tabs.js) for a more in-depth look at a working example.

## Exceptions

If you read through the source code for the `getTabByName` function, you may have noticed an else statement at the end that called `NoSuchTabException`. This happened since all the tabs had been searched, and none were found matching the tab the user asked for.

Writing exceptions and throwing them are pretty simple. Just follow the example and you'll be fine.

## Always write your own exceptions

Which would you rather see when viewing the output of a failed test?

```
Failures:

  1) Tabs should allow users to navigate by tabs
   Message:
     TypeError: Cannot read property 'text' of undefined
```

or

```
Failures:

  1) Tabs should allow users to navigate by tabs
   Message:
     No such tab: Foo
```

The second one is clearly better. Keep this in mind when creating custom objects.

I highly recommend requiring all custom objects to have reasonably managed exceptions for invalid use.

## Continuing

Run

    $> git checkout -b chapter-5 origin/chapter-5

to skip ahead, or just [visit this branch in your browser](../../tree/chapter-5).
