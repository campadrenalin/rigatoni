define('rigatoni/lazy', ['underscore'], function(_) {

    function Lazy(builders, initial_values) {
        var self = this;
        self._cache    = _.extend({}, initial_values);
        self._builders = _.extend({}, builders);

        _.chain(self._builders).keys().each(function(key) {
            self[key] = self._build_lazy_getter(key);
        });
    }
    Lazy.prototype._build_lazy_getter = function(key) {
        var self  = this,
            cache = self._cache,
            builder_callback = self._builders[key];
        function getter(set_value) {
            if (set_value !== undefined)
                cache[key] = set_value;
            if (!_.has(cache, key))
                cache[key] = builder_callback.call(self);
            return cache[key];
        }
        getter.rebuild = function() {
            delete cache[key];
            return getter();
        };
        return getter;
    };

    return Lazy;
});
