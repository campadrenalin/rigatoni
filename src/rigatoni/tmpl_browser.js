define('rigatoni/tmpl_browser', ['rigatoni/tmpl', 'jquery'], function(base_tmpl, $) {

    function loader(path) {
        $.ajax(path); // ...
        //return fs.readFileSync(path);        
    }

    // Specializes rigatoni/tmpl to use Cheerio and files from disk.
    function Template(path) {
        base_tmpl.call(this, $, loader, path);
    }
    Template.prototype = base_tmpl.prototype;
});
