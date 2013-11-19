/**
 * extend.js
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * For background to this script
 * cf. John Resig, Secrets of the JavaScript Ninja, pp. 145ff.
 * http://ejohn.org/blog/simple-javascript-inheritance
 *
 * My version differs from Resig's in 3 ways:
 * 1) It doesn't check for whether the corresponding
 *    _super method is called by the overriding subclass method.
 *    (seems to me like too much overhead since the if-condition
 *    is only met if the superclass already has the given method)
 * 2) No functionality is added directly to the built-in
 *    JavaScript Object.
 * 3) The reference to arguments.callee (likely to be
 *    deprecated) is eliminated.
 */

(function () {
    "use strict";
    var initializing = false;

    // generic base class
    window.Base = function() {};

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
                    var retFn = function () {
                        var tmp = this._super,
                            ret;

                        this._super = _super[name];
                        ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                    return retFn;
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
