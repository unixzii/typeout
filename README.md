# typeout [![Build Status](https://travis-ci.org/unixzii/typeout.svg?branch=master)](https://travis-ci.org/unixzii/typeout)

> Print out text one char by one char

## Install

```
$ npm install --save typeout
```

## Usage

```js
const typeout = require('typeout');

typeout('Hello')
  .then(() => {
    // Some stuff to do after the animation.
  });
```

## API

**typeout`(text, [opt])`**

### Options

* `duration`: duration for the whole animation, in milliseconds, default is **700**.
* `delay`: delay for every character, in milliseconds. When `delay` is specified, `duration` option will be ignored.
* `interruptable`: whether user can skip the animation, default is **false**.
* `stream`: the destination stream, default is **process.stdout**.

## Best Practice

**typeout** use Promise to reflect the animation state, which may lead to a chaos procedure. With `async` and `await` keywords, you can make the procedure more intuitive and continuous.

## License

MIT © [Cyandev](https://www.icyandev.com)