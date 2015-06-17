util = require './utils'

api 'hello world coffee', ->
  util.helloApi()

  endpoint '/hello', ->
    method 'GET', ->
      it 'says hello', (done) ->
        @api()
          .expect 200
          .expect 'Hello World!\n'
          .end done
