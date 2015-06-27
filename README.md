locator
=======

##locator.publish(key, value)

```js
// Publish some value
let publish = locator.publish('foo', 'bar')

// .. and later you can stop 'foo' publishing
publish.stop()
```

##locator.discover(key, handler)

```js
let discover = locator.discover('foo', (value, stop) => {
  if (value === 'bar') {
    stop(); // stop discover for 'foo'
    // some stuff with value ...
  }
})

setTimeout(() => {
  discover.stop(); // stop discover for 'foo'
  throw new Error('foo discover timeout');
}, 15000);
```