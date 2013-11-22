# Chapter 4 - The Tabs

We're going to introduce a pretty complex topic by using a simple example.

Here's an example: when you sign into a website where you are a regular user, perhaps you have two different tabs you can see. But when you sign in as an admin, you get an extra tab for managing some features. I've seen these kinds of situations handled in the following way:

```javascript
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

```javascript
tabs = getTabs();
```

Where `getTabs()` might look something like this:

```javascript
getTabs: {
    value: function () {
        var tabs = {};
        _.forEach(this.tblTabs, function (tab) {
            return tab.getAttribute('data-name').then( function (name) {
                tabs[name] = tab;
            });
        });
        return tabs;
    }
}
```

All this does is:

1. Iterate over all of the tabs we currently have
2. Get some attribute that uniquely identifies that tab
3. Name the tab that
4. Assign the tab itself to that name

So now when we use the site as a regular user, our tabs look like this:

```javascript
{
    profile: <WebDriverElement>,
    polls: <WebDriverElement>
}
```

And this same code will assign the special "admin" tabs as well:

```javascript
{
    profile: <WebDriverElement>,
    polls: <WebDriverElement>,
    banhammer: <WebDriverElement>
}
```

**Q**: *Won't my tests be different for different users though?*
>  - Yes. However, if I had to choose between remembering how my tests work versus how my over complicated page objects work, I'll choose the former. You can always abstract away user logins too, so that your login page features a `loginAdmin()` function to help with this.

## An example of this

See the code for the [tabs on the base page](test/pages/Base.js), and their [respective tests](test/stories/tabs.js) for a more in-depth look at a working example.

## Exceptions

If you read through the source code for the `getTabByName` function, you may have noticed an else statement at the end that called `NoSuchTabException`. This happened since all the tabs had been searched, and none were found matching the tab the user asked for.

Writing exceptions and throwing them are pretty simple. Just follow the example and you'll be find.

The thing that you may notice is that this exception won't work yet, because you haven't downloaded it. If you go to [`package.json`](package.json), you'll see that a new dependency was added to the project: `exceptions`. To add this, just run

```bash
$> npm install .
```

To update your project's node modules.

>  **PROTIP**: if you ever want to add your own module to a project, like I did with exceptions, do so with `npm install --save-dev` followed by the package name.

## Continuing

Run

    $>: git checkout chapter-5

to skip ahead, or just [visit this branch in your browser](../chapter-5).
