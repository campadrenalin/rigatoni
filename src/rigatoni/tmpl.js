define('rigatoni/tmpl', ['underscore'], function(_) {

    // Example workflow, low-level. Plugins should automate parts of this,
    // by providing factory functions to things built on Template.
    //
    // var tmpl = new Template(cheerio, pathloader, 'common.tmpl');
    // tmpl.sub('.content')
    //     .replace('home_content.tmpl')
    //     .transform(home_transforms, { user: myUser })
    //     ;
    function Template(jq, loader, base) {
        this.jq     = jq;
        this.loader = loader;
        this.base   = _.isString(base) ? this.load(base) : base;
    };
    Template.prototype.load = function(path) {
        return this.jq(this.loader(path));
    };
    Template.prototype.sub = function(selector) {
        return new Template(this.jq, this.loader, this.base.find(selector));
    };
    Template.prototype.replace = function(path) {
        var new_base = this.load(path);
        this.base.replaceWith(new_base);
        this.base = new_base;
    };
    Template.prototype.transform = function(transforms, data) {
        _.each(transforms, function(t) {
            t(this.base, data);
        });
    };
    Template.prototype.render = function() {
        return this.base.html();
    }

    return Template;
});
