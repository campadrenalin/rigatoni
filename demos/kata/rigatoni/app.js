define(['underscore', 'rigatoni/router', 'rigatoni/tmpl'], function(_, router, tmpl) {

    var default_render_params = {
        src: '/',
        selector: 'root',
        transforms: [],
        data: {},
        base: '/'
    };

    function App(imports, render_params) {
        require(imports);
        this.router = router;
        this.render_params = _.extend({}, default_render_params, render_params);
    }
    App.prototype.serve = function(req, res) {
        var route = this.router.resolve(req.url);
        res.setHeader("Content-Type", "text/html");
        res.statusCode = route.statusCode || 200;
        res.end(this.render(route));
    }
    App.prototype.render = function(params) {
        params = _.extend({}, this.render_params, params);
        console.log(params);
        return tmpl(params);
    }

    return App;
});
