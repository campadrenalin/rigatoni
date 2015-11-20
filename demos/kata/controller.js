define(['models', 'views'], function(models, views) {
    var app = {
        models: {},
        views: {}
    };

    views.ready.done(function() {
        app.models.boards = new models.BoardList();
        app.views.boards = new views.BoardList({
            collection: app.models.boards
        });
        app.models.boards.add([
            { title: 'Untitled Board' }
        ]);
    });

    return app;
});
