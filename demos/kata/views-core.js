define(['rigatoni'], function(rigatoni) {
    var templates = rigatoni.groove('/kata/', 'template.html');
    templates.ready = templates('body', [], 'body', undefined); // Promise

    return templates;
});
