requirejs.config({
    baseUrl: '/kata/',
    paths: {
        jquery:     '/vendor/jquery-1.11.3.min',
        underscore: '/vendor/underscore-min',
        rigatoni:   '/build/rigatoni'
    }
});

// Load app, preloading some libs with it
require(['jquery', 'underscore', 'app']);
