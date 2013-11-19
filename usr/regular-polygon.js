/**
 * Regular convex polygon defined by
 * radius, center and number of sides.
 *
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */
var RegularPolygon = Shape.extend({
    init: function(params) {
        this._super(params);
        // required
        this.center = params.center;
        this.sides = params.sides;
        this.radius = params.radius;
        // optional
        // angle in radians at which first vertex will be drawn
        this.angle = params.angle || 0;
        // calculate vertices array (this.vertices)
        this.resetVertices();
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
    },
    
    innerRadius: function() {
        return this.radius * Math.cos(Math.PI / this.sides);
    },

    contains: function(point) {
        var diffX = point.x - this.center.x,
            diffY = this.center.y - point.y,
            distance = Math.sqrt(diffX * diffX + diffY * diffY),
            innerRadius = this.innerRadius(),
            referenceAngle = Math.PI / this.sides,
            angle,
            steps;

        if (distance > this.radius) { return false; }
        if (distance <= innerRadius) { return true; }

        angle = Math.atan2(diffY, diffX);
        // adjust according to polygon angle
        angle -= this.angle;
        // adjust as needed so that angle is positive
        while (angle < 0) { angle += Math.PI * 2; }
        steps = Math.floor(angle * this.sides / (Math.PI * 2));
        angle -= steps * 2 * referenceAngle;
        angle = Math.abs(angle - referenceAngle);
        return distance <= innerRadius / Math.cos(angle);
    }
});
