var ax_settings = {
    'dataType': 'xml'
};

var _tmpl_cache = {}
function get_tmpl(url) {
    if (!_tmpl_cache[url])
        _tmpl_cache[url] = $.ajax(url, ax_settings);
    return _tmpl_cache[url];
}

function rigatoni(root, path, selector, transforms, element, data) {
    var url = root + path;
    return get_tmpl(url).done(function(html) {
        var selected = $(html).find(selector).clone();
        for (var i = 0; i < transforms.length; i++) {
            transforms[i](selected, data);
        }
        $(element).html(selected);
    });
}
rigatoni._bound = [];
rigatoni.groove = function() {
    // Build up clone function
    var outer_args = this._bound.concat(
        Array.prototype.slice.call(arguments));
    var clone = function() {
        var inner_args = Array.prototype.slice.call(arguments);
        rigatoni.apply(rigatoni, outer_args.concat(inner_args));
    }

    // Add attributes
    clone._bound = outer_args;
    clone.groove = rigatoni.groove;

    return clone;
}
