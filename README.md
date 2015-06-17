[![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]

mocha-rest-interface
==================

> Specify your REST endpoints behaviours like a pro and generate their docs

__Mocha REST interface__ is a DSL for mocha specialized in testing APIs.

Installation
------------

    npm install --save mocha-rest-interface

Usage
-----

#### Basic

```javascript
api('catalog', function () {
  this.api.at('http://localhost:3000');
  endpoint('/products', function () {
    method('GET', function () {
      it('lists all available products', function (done) {
        this.api()
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(['a red ballon', 'a rubber duck', 'a very large pair of sunglasses', 'a bazooka'])
            .end(done)
      })
    })
    method('POST', function () {
      it('is not allowed', function () {
        this.api()
            .send({some: 'body data'})
            .expect(405)
            .end(done)
      })
    })
  })
})
```

Or, you know...

```coffeescript
api 'catalog', ->
  @api.at 'http://localhost:3000'
  endpoint '/products', ->
    method 'GET', ->
      it 'lists all available products', (done) ->
        @api()
          .expect 200
          .expect 'Content-Type', /application\/json/
          .expect ['a red ballon', 'a rubber duck', 'a very large pair of sunglasses', 'a bazooka']
          .end done

    method 'POST', ->
      it 'is not allowed', (done) ->
        @api()
          .expect 405
          .end done
```


#### TODO

* setup/teardown
* fixtures
* prerequisites (authentication, transverse headers or query params)
* swagger reporter/generator
* Automatic setup/teardown for express and hapi
* whatever comes from usage


Test
----

Tests are written with [mocha][mocha-url] and covered with [istanbul][istanbul-url]
You can run the tests with `npm test`.

Contributing
------------

Anyone is welcome to submit issues and pull requests


License
-------

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[travis-image]: http://img.shields.io/travis/Floby/mocha-rest-interface/master.svg?style=flat
[travis-url]: https://travis-ci.org/Floby/mocha-rest-interface
[coveralls-image]: http://img.shields.io/coveralls/Floby/mocha-rest-interface/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Floby/mocha-rest-interface
[mocha-url]: https://github.com/visionmedia/mocha
[istanbul-url]: https://github.com/gotwarlost/istanbul
