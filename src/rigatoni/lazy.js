define('rigatoni/lazy', ['underscore'], function(_) {

    function LazyAttribute(compute_function, value) {
        var self = this;
        self.compute = compute_function;
        self.value = value;
        self.bound_accessor = function(value) { return self.accessor(value); };
        self.bound_accessor.prototype = self;
    }
    LazyAttribute.prototype.get = function() {
        if (!_.has(this, 'value'))
            this.value = this.compute.call(this);
        return this.value;
    }
    LazyAttribute.prototype.set = function(value) {
        this.value = value;
        return value;
    }
    LazyAttribute.prototype.rebuild = function() {
        delete this.value;
        return this.get();
    }
    LazyAttribute.prototype.accessor = function(value) {
        return (value === undefined) ? this.get() : this.set(value);
    }

    function Lazy(builders, initial_values) {
        this.extendAttributes(builders);
        this.extendValues(initial_values);
    }
    Lazy.prototype.extendAttributes = function(builders) {
        _.chain(builders || {}).keys().each(function(key) {
            var attr = new LazyAttribute(builders[key]);
            this[key] = attr.bound_accessor;
        };
    };
    Lazy.prototype.extendCache = function(cache) {
        _.chain(cache || {}).keys().each(function(key) {
            if (!_.has(this, key)) return;
            this[key].set(cache[key]);
        };
    };

    return Lazy;
});
