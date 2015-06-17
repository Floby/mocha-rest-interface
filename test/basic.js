var util = require('./utils');

api('hello world JS', function () {
  util.helloApi();

  endpoint('/hello', function () {
    method('GET', function () {
      it('says hello', function (done) {
        this.api()
          .expect(200)
          .expect('Hello World!\n')
          .end(done)
      });
    });
  })
})
