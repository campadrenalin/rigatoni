define(['rigatoni/lazy', 'underscore', 'rigatoni/tmpl'], function(Lazy, _, tmpl) {

    function builtinLoader(path) {
        return '<html><b>' + path + ':</b> <i class="detail"></i></html>';
    };

    var default_builders = {
        url:        function() { return '/' },
        statusCode: function() { return 200 },
        handler: function() { throw "Override your page handler, please!" },
        content: function() {
            try {
                return this.handler()
            } catch (e) {
                return this.error(e)
            }
        },
        contentType: function() {
            // Can be trivially overriden by a handler
            return _.isString(this.content()) ? 'text/plain' : 'text/html';
        },
        structure: function() {
            return (this.contentType() === 'text/html') ? tmpl(this.templateParams()) : this.content();
        },
        templateLoader: function() {
            return builtinLoader;
        },
        templateParams: function() {
            return {
                loader: this.templateLoader(),
                data: this.content(),
            };
        },
    };

    function Page(builders, initial_values) {
        Lazy.call(
            this,
            _.extend({}, default_builders, builders),
            initial_values
        );
    }
    Page.prototype = new Lazy();
    Page.prototype.error = function(e) {
        this.statusCode(500);
        return 'Failed: ' + e;
    };
    Page.prototype.serve = function (req, res) {
        this.url(req.url);
        res.setHeader("Content-Type", this.contentType());
        res.statusCode = this.statusCode();
        res.end(this.structure());
    }

    return Page;
});
