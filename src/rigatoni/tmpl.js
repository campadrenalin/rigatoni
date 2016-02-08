define('rigatoni/tmpl', ['underscore', 'cheerio'], function(_, cheerio) {

    var default_render_params = {
        src: '/',
        selector: 'root',
        transforms: [],
        data: {},
        base: '/',
        loader: function() { throw "No template loader provided" }
    };

    function template(params) {
        params = _.extend({}, default_render_params, params);

        var _loader = params.loader;
        function _load(path_or_object) {
            var loaded = _loader(path_or_object);
            var cheeriod = cheerio.load(loaded);
            return (_.isString(path_or_object) ? cheerio.load(loaded) : path_or_object);
        }

        var base = _load(params.base);
        var src  = _load(params.src);

        var overwrite = params.overwrite || params.selector;
        var selector  = params.selector;
        base(overwrite).replaceWith(src(selector));

        return base.html();
    }
    return template;
});
