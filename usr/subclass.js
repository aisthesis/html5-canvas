/**
 * Cf. JavaScript Ninja, pp. 145ff.
 *
 * My version differs from the book in 2 ways:
 * 1) It doesn't check for whether the corresponding
 *    _super method is called by the overriding subclass method.
 * 2) It uses a different syntax that ALWAYS (even for constructor)
 *    requires the super method to be called explicitly. So, to 
 *    call the super constructor, you write
 *    _super.init(params);
 *    NOT just _super(params);
 *    (the latter will result in an error)
 * Note: This script adds functionality
 * directly to the build-in JavaScript Object.
 */

(function () {
    var initializing = false;

    Object._subClass = function (properties) {
        var _super = this.prototype,
            proto,
            name;

        initializing = true;
        proto = new this();
        initializing = false;

        // leaving out check for presence of "_super" string
        for (name in properties) {
            proto[name] = typeof properties[name] === "function" &&
                typeof _super[name] === "function" ?
                (function (name, fn) {
                    return function () {
                        this._super = this._super || {};
                        this._super[name] = _super[name];
                        return fn.apply(this, arguments);
                    };
                })(name, properties[name]) :
                properties[name];
        }

        function Class() {
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }

        Class.prototype = proto;
        Class.constructor = Class;
        Class._subClass = arguments.callee;
        return Class;
    };
})();
