/**
 * Dependencies:
 * point.js
 */
var Polygon = Object._subClass({
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

    getCenter: function() { 
        return this.center; 
    },

    setCenter: function(center) {
        this.center = center;
    },

    getSides: function() {
        return this.sides;
    },

    getRadius: function() {
        return this.radius;
    },

    setRadius: function(radius) {
        this.radius = radius;
    },

    getAngle: function() {
        return angle;
    },

    setAngle: function(angle) {
        this.angle = angle;
    },

    getFillStyle: function() {
        return this.fillStyle;
    },

    setFillStyle: function(fillStyle) {
        this.fillStyle = fillStyle;
    },

    getStrokeStyle: function() {
        return this.strokeStyle;
    },

    setStrokeStyle: function(strokeStyle) {
        this.strokeStyle = strokeStyle;
    },

    getLineWidth: function() {
        return this.lineWidth;
    },

    setLineWidth: function(lineWidth) {
        this.lineWidth = lineWidth;
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
            this.vertices.push(new Point(this.center.getX() + this.radius * Math.cos(angle),
                    this.center.getY() - this.radius * Math.sin(angle)));
            angle += increment;
        }
    },

    getVertices: function() {
        return this.vertices;
    },

    buildPath: function(context) {
        var i;

        context.beginPath();
        context.moveTo(this.vertices[0].getX(), this.vertices[0].getY());
        for (i = 1; i < this.sides; i++) {
            context.lineTo(this.vertices[i].getX(), this.vertices[i].getY());
        }
        context.closePath();
    }
});
