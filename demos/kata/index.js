var http = require('http');
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,

    paths: {
        //rigatoni: '../build/rigatoni'
    }
});

var app = requirejs('app');

var server = http.createServer(function(request, response) {
    app.serve(request, response);
});

var port = 8080;
server.listen(port, function() {
    console.log('Server started on http://localhost:%s/', port);
});
