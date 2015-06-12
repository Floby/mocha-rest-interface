require('../');
api('hello world', function () {
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
