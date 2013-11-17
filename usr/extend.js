/**
 * Cf. JavaScript Ninja, pp. 145ff.
 * http://ejohn.org/blog/simple-javascript-inheritance
 *
 * My version differs from the book in 3 ways:
 * 1) It doesn't check for whether the corresponding
 *    _super method is called by the overriding subclass method.
 * 2) It uses a different syntax that ALWAYS (even for constructor)
 *    requires the super method to be called explicitly. So, to 
 *    call the super constructor, you write
 *    _super.init(params);
 *    NOT just _super(params);
 *    (the latter will result in an error)
 * 3) No functionality is added directly to the built-in
 *    JavaScript Object.
 */

(function () {
    var initializing = false;

    // generic base class
    this.Base = function() {};

    Base.extend = function extend(properties) {
        var _super = this.prototype,
            proto,
            name;

        initializing = true;
        proto = new this();
        initializing = false;

        // leaving out check for presence of "_super" string
        for (name in properties) {
            proto[name] = typeof properties[name] === "function" &&
                typeof _super[name] === "function" ? (function (name, fn) {
                    return function () {
                        this._super = this._super || {};
                        this._super[name] = _super[name];
                        return fn.apply(this, arguments);
                    };
                })(name, properties[name]) : properties[name];
        }

        function Class() {
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }

        Class.prototype = proto;
        Class.constructor = Class;
        Class.extend = extend;
        return Class;
    };
})();
