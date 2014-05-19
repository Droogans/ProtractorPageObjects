# Chapter 1 - The Outline

This chapter will focus on where we will put our page objects, and how we'll keep them organized as our application grows.

Here's what our project looks like right now:

```
$:> tree test/pages/
test/pages/
├── base.js
├── login.js
├── polls
│   ├── table
│   │   ├── columns.js
│   │   └── rows.js
│   └── table.js
└── profile
    ├── basic.js
    ├── politics.js
    └── social.js

3 directories, 8 files
```
> **PROTIP**: You can install `tree` via `brew install tree` for mac, or `sudo apt-get install tree` in Linux.

However, all of these files are empty. They are just placeholders to allow some observations about their structure.

Namely,

1. Our more complex web pages are actually page *directories*.
  - We need to be able to keep things that belong on the same page together, but not in the same file.
2. Our files describe parts of our entire page.
  - Our "polls" page directory could just be one file. But we keep it separate to allow rows and columns to support more and more functionality without sacrificing readability of our code base.
  - This also holds true for components on pages, too. See `test/pages/polls/table`, and the corresponding file, `test/pages/polls/table.js`, which acts as a top-level container for the more complex modules found in the `table/` directory beside it.
3. Our pages get namespaced this way.
  - That way, if our profile gets a table later, it doesn't need to be called `profileTable.js`. It's just `profile/table.js`, which compartmentalizes our thinking when working on one tiny section of a larger application.
4. We can nest this as deep as we need to.
  - Don't like that `profile/politics.js` isn't `profile/politics/form.js` instead? Well, then change it! This also holds true over time. If our profile page(s) get larger, smaller, or anything in between, shifting things around inside of it's own domain is relatively unobtrusive.

Next, we'll take a look at writing our first page object, which navigates us past the front page to the login page. There we'll introduce Astrolabe, a tool designed to make page objects much easier to read and write.

Run

    $> git checkout -b chapter-2 origin/chapter-2

to skip ahead, or just [visit this branch in your browser](../../tree/chapter-2).
