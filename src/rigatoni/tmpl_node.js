define('rigatoni/tmpl_node', ['rigatoni/tmpl', 'cheerio', 'fs'], function(base_tmpl, cheerio, fs) {

    function jq(object) {
        return cheerio.load(object);
    }
    function loader(path) {
        return fs.readFileSync(path);        
    }

    // Specializes rigatoni/tmpl to use Cheerio and files from disk.
    function Template(path) {
        base_tmpl.call(this, jq, loader, path);
    }
    Template.prototype = base_tmpl.prototype;
});
