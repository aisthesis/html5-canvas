/**
 * Dependencies:
 * extend.js
 * point.js
 */
var codeMelon = codeMelon || {};
codeMelon.games = codeMelon.games || {};

(function(_cg) {
    "use strict";

    _cg.windowToCanvas = function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();

        return new Point(x - bbox.left, y - bbox.top);
    }
})(codeMelon.games);
