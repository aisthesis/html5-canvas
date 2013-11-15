/**
 * Dependencies:
 * subclass.js
 * shape.js
 * point.js
 */
var Circle = Shape.cMsubClass({
    init: function(params) {
        // required
        this.center = params.center;
        this.radius = params.radius;
        // optional
        this.fillStyle = params.fillStyle || 'white';
        this.strokeStyle = params.strokeStyle || 'black';
        this.lineWidth = params.lineWidth || 1;
    },

    buildPath: function(context) {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 
            0, Math.PI * 2, false);
        context.closePath();
    }
});
