var ax_settings = {
    'dataType': 'xml'
};

// Preserve promises indefinitely
var _tmpl_cache = {}
function get_tmpl(url) {
    if (!_tmpl_cache[url])
        _tmpl_cache[url] = $.ajax(url, ax_settings);
    return _tmpl_cache[url];
}

function rigatoni(root, path, selector, transforms, element, data) {
    var url = root + path;
    return get_tmpl(url).done(function(html) {
        // Compute reused values
        element = $(element);
        var reset_url = url + "#" + selector,
            noreset   = element.data('rigatoni-url') == reset_url,
            selected  = noreset ? element : $(html).find(selector).clone();

        // Apply transforms serially
        for (var i = 0; i < transforms.length; i++) {
            transforms[i](selected, data);
        }

        // If edits were not in-place, apply them now.
        // We use in-place editing when the structure has not changed since last boil.
        if (noreset) return;
        element
            .html(selected.html() || 'no such pasta')
            .data('rigatoni-url', reset_url);
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
