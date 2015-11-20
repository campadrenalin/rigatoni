requirejs.config({
    baseUrl: '/kata/',
    paths: {
        jquery:     '/vendor/jquery-1.11.3.min',
        underscore: '/vendor/underscore.min',
        backbone:   '/vendor/backbone.min',
        rigatoni:   '/build/rigatoni'
    }
});

require(['rigatoni'], function(rigatoni) {
    var templates = rigatoni.groove('/kata/', 'template.html');
    templates.body = templates.groove('body');
    templates.body([], 'body', undefined);
});
