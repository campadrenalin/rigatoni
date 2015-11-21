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
                var nav_view = new views.BoardListItem({ model: board });
                el.append(nav_view.el);
            });
        })
    });
    views.BoardListItem = backbone.View.extend({
        tagName: "a",
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
            this.render();
        },
        render: function() {
            var stext = 'selected';
            this.$el
                .text(this.model.get('title'))
                .attr('href', '#' + this.model.id);
            this.$el.toggleClass(stext, this.model.get(stext));
        },
        events: {
            click: "toggle"
        },
        toggle: function() {
            this.model.set('selected', !this.model.get('selected'));
        }
    });

    return views;
});
