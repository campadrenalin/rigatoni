define(['backbone'], function(backbone) {
    var models = {};

    models.Board = backbone.Model.extend({
        defaults: function(){ return {
            title: "Untitled Board"
        }}
    });

    models.BoardList = backbone.Collection.extend({
        model: models.Board
    });

    return models;
});
