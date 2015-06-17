var http = require('http');

exports.helloApi = function helloApi () {
  var server;
  beforeEach(function (done) {
    var self = this;
    server = http.createServer(function (req, res) {
      res.end('Hello World!\n');
    });
    server.listen(0, function (err) {
      if (err) return done(err);
      self.api.at('http://localhost:' + server.address().port);
      done();
    });
  });

  afterEach(function (done) {
    server.close(done);
    server = null;
  });
}
