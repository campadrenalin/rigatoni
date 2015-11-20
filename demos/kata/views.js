define(['views-core', 'backbone', 'models'], function(t, backbone, models) {
    var views = {
        ready: t.ready
    };
    function renderer(selector, transforms) {
        if (typeof transforms === "function") {
            transforms = [transforms];
        }
        var groove = t.groove(selector, transforms);
        return function() {
            var data = this.model      ? this.model.attributes
                     : this.collection ? this.collection
                     :                   this
                     ;
            groove(this.el, data);
            return this;
        }
    }

    views.BoardList = backbone.View.extend({
        el: '#board-list',
        initialize: function() {
            this.listenTo(this.collection, "update", this.render);
        },
        render: renderer('#board-list', function(el, d) {
            el.empty();
            d.each(function(board) {
                el.append('<a href="#">' + board.get('title') + '</a>');
            });
        })
    });

    return views;
});
