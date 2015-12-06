var http = require('http');
var app  = require('./main-node');

var server = http.createServer(function(request, response) {
    app.serve(request, response);
});

var port = 8080;
server.listen(port, function() {
    console.log('Server started on http://localhost:%s/', port);
});
