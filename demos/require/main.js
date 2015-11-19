requirejs.config({
    baseUrl: '/require/',
    paths: {
        jquery:   '/vendor/jquery-1.11.3.min',
        rigatoni: '/rigatoni',
    }
});

require(['rigatoni', 'jquery'], function(rigatoni, $) {
    function span_text(el, d) { el.find('span').text(d) }
    var r = rigatoni.groove('/require/', 'required.html', 'root', [span_text]);

    // Document ready
    $(function(){
        r('body', "From Main With Love");
    });
});
