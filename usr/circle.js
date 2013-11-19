/**
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */
var Circle = Shape.extend({
    init: function(params) {
        this._super(params);
        // required
        this.center = params.center;
        this.radius = params.radius;
    },

    buildPath: function(context) {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 
            0, Math.PI * 2, false);
        context.closePath();
    },

    contains: function(point) {
        return this.center.distanceTo(point) <= this.radius;
    }
});
