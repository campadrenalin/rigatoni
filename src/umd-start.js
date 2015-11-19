(function (root, factory) {
    // Wrapper, to execute the factory with dependencies resolved
    if (typeof define === "function" && define.amd) {
        // AMD/RequireJS
        define(["jquery"], factory);
    } else if(typeof module === "object" && module.exports) {
        // CommonJS/node
        module.exports = factory(require("cheerio"));
    } else {
        // Plain browser support. Get with the times.
        root.rigatoni = factory(root.$);
    }
}(this, function($) {
// Factory to produce rigatoni module, given deps as params.

