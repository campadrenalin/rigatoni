// ================================================================================
// Rigatoni - Template animation toolkit designed for minimalism and
//            partial function binding. Raw HTML + Transforms = Win.
// Primarily written by Philip Horger.
// ================================================================================

// Settings used for retrieving templates asyncronously.
var _ax_settings = {
    'dataType': 'xml'
};

// Cache for reusing the same template, never requesting twice in a
// module lifetime (page lifetime in the browser).
var _tmpl_cache = {};
function get_tmpl(url) {
    if (!_tmpl_cache[url])
        _tmpl_cache[url] = $.ajax(url, _ax_settings).promise();
    return _tmpl_cache[url];
}

// Utility function to sanity check that a selector has exactly one element.
// Currently a warning if it fails.
function _check_one(el, stage) {
    if (el.length === 1) return;
    console.warn(stage + ': Expected 1 element, got ' + el.length);
}

// The main template function. Includes .groove() for partial binding.
//
//  - root       : Common part of all template paths.
//  - path       : Path to this specific template HTML, relative to root.
//  - selector   : Which part of the content to extract.
//  - transforms : An array of mutator functions, f(element, data).
//  - element    : Which element in the page to repopulate. Anything $-able.
//  - data       : Data to interpolate. Just needs to be understood by transforms.
function rigatoni(root, path, selector, transforms, element, data) {
    var url = root + path;
    return get_tmpl(url).done(function(html) {
        // Compute reused values
        element = $(element);
        var reset_url = url + "#" + selector,
            noreset   = element.data('rigatoni-url') == reset_url,
            selected  = noreset ? element : $(html).find(selector).clone();
        _check_one(selected, 'Selection from source');
        _check_one(element, 'Elements to inject to');

        // If edits were not in-place, apply them now.
        // We use in-place editing when the structure has not changed since last boil.
        if (!noreset) {
            element
                .html(selected.html() || 'no such pasta')
                .data('rigatoni-url', reset_url);
            selected = element;
        }

        // Apply transforms serially
        for (var i = 0; i < transforms.length; i++) {
            transforms[i](selected, data);
        }
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.error("Request failed for " + url);
        console.error(errorThrown);
    });
}

// Create a "groove" (partial binding) of the template function.
//
// In this example, calling templates() is like calling rigatoni(),
// but with the first arg always filled in as '/templates/'. That's
// the kind of benefit we're trying to achieve with having root and
// path as separate args.
//
//      templates = rigatoni.groove('/templates/');
//
// Now we can add more properties onto that. This is totally convention,
// you can store grooves wherever you want. The important lesson here
// is just that you can make grooves off of grooves, building up more
// and more presupplied arguments.
//
//      templates.foo = templates.groove('foo.html', '.foo', [myTransform]);
//      templates.foo('#foo-in-document', { 'foo':'bar' }); // Apply
//
// This is powerful and flexible, in that it lets *you* decide the
// conventions your code will follow. It's recommended to be consistent,
// though, so that you aren't constantly in the dark about how many args
// any template function takes.
rigatoni.groove = function() {
    // Build up clone function
    var outer_args = this._bound.concat(
        Array.prototype.slice.call(arguments));
    var clone = function() {
        var inner_args = Array.prototype.slice.call(arguments);
        return rigatoni.apply(rigatoni, outer_args.concat(inner_args));
    };

    // Add attributes
    clone._bound = outer_args;
    clone.groove = rigatoni.groove;

    return clone;
};
rigatoni._bound = [];

// ================================================================================
