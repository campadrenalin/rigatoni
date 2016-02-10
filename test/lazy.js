var chai = require('chai');
var expect = chai.expect;
var rjs = require('./common');
var lazy = rjs('rigatoni/lazy');

describe('LazyAttribute', function() {
    it('should store initially provided values', function() {
        var attr = new lazy.Attribute(undefined, 9);
        expect(attr.get()).to.equal(9);
    });
    it('should compute values if it doesn\'t have one', function(){
        var attr = new lazy.Attribute(function() { return 8 }, undefined);
        expect(attr.get()).to.equal(8);
    });
    it('should only compute things once', function(){
        var tries = 0;
        var attr = new lazy.Attribute(function() { return ++tries }, undefined);
        for (var i = 0; i < 20; i++) {
            expect(attr.get()).to.equal(1);
            expect(tries).to.equal(1);
        }
    });
    it('should support recomputing', function() {
        var tries = 0;
        var attr = new lazy.Attribute(function() { return ++tries }, undefined);
        for (var i = 0; i < 20; i++) {
            expect(attr.recompute()).to.equal(i + 1);
            expect(tries).to.equal(i + 1);
        }
        expect(attr.get()).to.equal(20);
    });
    it('should support setting the value explicitly after initialization, or even computation', function(){
        var attr = new lazy.Attribute(function() { return 5 }, undefined);
        attr.set(6);
        expect(attr.get()).to.equal(6);
        attr.recompute(); attr.set(4);
        expect(attr.get()).to.equal(4);
    });
    it('should have a callable accessor function, with same functions exposed on it', function(){
        var attr = new lazy.Attribute(function() { return "computed" }, "initialized");
        var acc = attr.bound_accessor;
        expect(acc()).to.equal("initialized");

        expect(acc("set")).to.equal("set");
        expect(acc()).to.equal("set");

        expect(acc.recompute()).to.equal("computed");
        expect(acc()).to.equal("computed");
    });
});

describe('Lazy', function() {
    it('should accept builders and initial values in constructor');
    it('should support adding builders');
    it('should support overriding values');
});
