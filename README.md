# Chapter 5 - The Polls Page

## Tables, rows, and columns

This chapter will be dealing with complex objects, and some good ways to keep them easy to use over time.

## A primer

Last time we took a look at how to create our own custom objects.

This lesson covers custom objects in more detail, taking time to explain a little more about how they work.

The page objects defined here will require more effort to explain.

This chapter also includes more of them as well.

## A closer look at promises

Take a look at the annotated source of the [`getHeading()`](test/pages/polls/Table.js) method to get a better understanding of how Selenium handles promises. We will be constructing a custom object using this model, and it will return a promise to us.

**Q**: *Why don't page fields (`btnSignOut`, `lnkEpikVote`, etc.) need to be unwrapped?*

>  - Astrolabe provides utilities that account for the unwrapping step, so you don't have to write it out.

**Q**: *Why don't you have to unwrap promises that are used in a test's `expect` function?*

>  - Jasmine knows how to handle promises passed into `expect`, and it will unwrap it one layer for you.

**Q**: *How do I know if a promise is done being "unwrapped"?*

>  - One way is to try and look up the API of the code you're interacting with, reading the source, or, if all else fails, sticking some `console.log(possiblePromiseObject)` to see if it can be unwrapped some more.

**Q**: *How do I know if an object I've console.logged can be unwrapped further?*

>  - If you use console.log and you see something that looks like the following, then you've got a promise object.

```javascript
{ then: [Function: then],
        cancel: [Function: cancel],
        isPending: [Function: isPending] }
```

>  - Replace your current console.log statement with this:

```javascript
possiblePromiseObject.then( function (anotherPossiblePromise) {
    console.log(anotherPossiblePromise);
});
```

Eventually, you'll unwrap it all the way to your desired state.

## Custom objects

The secret to making good custom objects is to always return your results as a promise, and not a raw values (such as an integer, string, or list). This consistency makes it easier for others to use your custom objects without resorting to tedious debugging.

I highly recommend requiring all custom objects to return promises from their methods/attributes.

## For example

Take this code, for instance:

```javascript
colums.getColumnByName('Votes').then( function (votesColumn) {
    console.log(votesColumn);
});
```

We want all of the properties of the column to formatted like this:

```javascript
{ name:
   { then: [Function: then],
     cancel: [Function: cancel],
     isPending: [Function: isPending] },
  data:
    { then: [Function: then],
     cancel: [Function: cancel],
     isPending: [Function: isPending] }
}
```

And not like this:

```javascript
{ name: "Votes",
  data: [12, 22, 32]
}
```

Again, this is because everything else works like the first example. Keep it consistent.

## Examples

[Rows and Columns](test/stories/polls.js) look nearly identical when implemented in their tests.

However, there is a huge difference between how these were coded.

## A good example

[Rows](test/pages/polls/Rows.js) has a very good example of how to implement row objects in a table.

This is because all rows support numbered rows, which makes them easy to map to a page object.

## An anti-pattern

To bring attention to what can happen when a page's HTML is insufficient for creating page objects, I've shown some ways [not to define column objects](test/pages/polls/Columns.js).

A common code smell is passing around text parameters into function to determine what you're going to do with some function.

## Continuing

Run

    $>: git checkout chapter-6

to skip ahead, or just [visit this branch in your browser](../chapter-6).
