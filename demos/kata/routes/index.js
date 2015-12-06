define(['rigatoni/router'], function(router) {
    function KataPage(url) {
        return {
            src: '/template.html',
            selector: 'body',
        }
    }

    router.register('/', KataPage);
});
