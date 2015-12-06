define([], function() {
    function Router() {
        this.routes = {};
    }
    Router.prototype.find = function(req) {
        return this.routes[req.url];
    }
    Router.prototype.resolve = function(url) {
        var found = this.routes[url];
        return found ? found(url) : {
            src: '/error.tmpl',
            selector: 'body',
            statusCode: 404,
            data: {
                url: url
            }
        };
    }
    Router.prototype.register = function(url, callback) {
        this.routes[url] = callback;
    }
    return new Router();
});
