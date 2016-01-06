define(['rigatoni/page', 'underscore'], function(Page, _) {

    function KataApp() {
        Page.call(this, {
            handler: function() {
                if (this.url() != '/') throw "Out of bounds, young lad";
                return { detail: this.url() };
            },
        });
    }
    KataApp.prototype = new Page();
    return KataApp;
});
