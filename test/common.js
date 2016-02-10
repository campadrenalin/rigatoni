var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,

    paths: {
        rigatoni: '../src/rigatoni',
    }
});

module.exports = requirejs;
