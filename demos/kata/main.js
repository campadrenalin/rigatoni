requirejs.config({
    baseUrl: '/kata/',
    paths: {
        jquery:     '/vendor/jquery-1.11.3.min',
        underscore: '/vendor/underscore-min',
        backbone:   '/vendor/backbone-min',
        rigatoni:   '/build/rigatoni'
    }
});

// Start preloading certain libs
require(['jquery', 'backbone', 'underscore']);

// Set up DOM
require(['controller'], function(app) {
    window.app = app;
});
