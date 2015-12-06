define(['cheerio', 'fs'], function(cheerio, fs) {
    function _load(path) {
        if (/^\//.test(path))
            path = "." + path;
        return cheerio.load(fs.readFileSync(path));
    }

    function template(params) {
        var base = _load(params.base);
        var src  = _load(params.src);

        var overwrite = params.overwrite || params.selector;
        var selector  = params.selector;
        base(overwrite).replaceWith(src(selector));

        return base.html();
    }
    return template;
});
