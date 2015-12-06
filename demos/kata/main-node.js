var requirejs = require('requirejs');

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,

    paths: {
        //rigatoni: '../build/rigatoni'
    }
});

module.exports = requirejs('app');
