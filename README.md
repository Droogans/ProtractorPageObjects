# Chapter 1 - The Outline

This chapter will focus on where we will put our page objects, and how we'll keep them organized as our application grows.

Here's what our project looks like right now:

```
$:> tree test
test
├── pages
│   ├── Base.js
│   ├── login
│   │   └── Form.js
│   ├── polls
│   │   ├── Columns.js
│   │   ├── Rows.js
│   │   └── Table.js
│   └── profile
│       ├── Basic.js
│       ├── Politics.js
│       └── Social.js
├── protractor.conf.js
└── stories
    └── frontPage.js

5 directories, 10 files
```
> **PROTIP**: You can install `tree` via `brew install tree` for mac, or `sudo apt-get install tree` in Linux.

However, all of these files are empty. They are just placeholders to allow some observations about their structure.

Namely,

1. Our pages are actually page *directories*.
  - We need to be able to keep things that belong on the same page together, but not in the same file.
2. Our files describe parts of our entire page.
  - Our "polls" page directory could just be one file. But we keep it separate to allow rows and columns to support more and more functionality without sacrificing readability of our code base.
3. Our pages get namespaced this way.
  - That way, if our profile gets a table later, it doesn't need to be called `profileTable.js`. It's just `profile/Table.js`, which compartmentalizes our thinking when working on one tiny section of a larger application.
4. We can nest this as deep as we need to.
  - Don't like that `profile/Politics.js` isn't `profile/politics/Form.js` instead? Well, then change it! This also holds true over time. If our profile page(s) get larger, smaller, or anything in between, shifting things around inside of it's own domain is relatively unobtrusive.

Next, we'll take a look at writing our first page object, which navigates us past the front page to the login page. There we'll introduce Astrolabe, a tool designed to make page objects much easier to read and write.

Run

    $>: git checkout chapter-2

to skip ahead, or just [visit this branch in your browser](../chapter-2).
