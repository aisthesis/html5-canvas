/**
 * Dependencies:
 * point.js
 */
var Polygon = Object.cMsubClass({
    init: function(params) {
        // required
        this.center = params.center,
        this.sides = params.sides,
        this.radius = params.radius,
        // optional
        // angle in radians at which first vertex will be drawn
        this.angle = params.angle || 0,
        this.fillStyle = params.fillStyle || 'white',
        this.strokeStyle = params.strokeStyle || 'black',
        this.lineWidth = params.lineWidth || 1
        // calculate vertices array (this.vertices)
        this.resetVertices();
    },

    render: function(context, callback) {
        context.save();
        this.buildPath(context);
        callback();
        context.restore();
    },

    fill: function(context) {
        var _this = this;

        this.render(context, function() {
            context.fillStyle = _this.fillStyle;
            context.fill();
        });
    },

    stroke: function(context) {
        var _this = this;

        this.render(context, function() {
            context.strokeStyle = _this.strokeStyle;
            context.lineWidth = _this.lineWidth;
            context.stroke();
        });
    },

    draw: function(context) {
        var _this = this;

        this.render(context, function() {
            context.strokeStyle = _this.strokeStyle;
            context.lineWidth = _this.lineWidth;
            context.fillStyle = _this.fillStyle;
            context.fill();
            context.stroke();
        });
    },

    resetVertices: function() {
        var angle = this.angle,
            increment = 2 * Math.PI / this.sides,
            i;

        this.vertices = [];
        for (i = 0; i < this.sides; i++) {
            this.vertices.push(new Point(this.center.x + this.radius * Math.cos(angle),
                    this.center.y - this.radius * Math.sin(angle)));
            angle += increment;
        }
    },

    buildPath: function(context) {
        var i;

        context.beginPath();
        context.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (i = 1; i < this.sides; i++) {
            context.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        context.closePath();
    }
});
