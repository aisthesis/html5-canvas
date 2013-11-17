/**
 * Superclass for closed geometric shapes,
 * such as Polygon or Circle.
 * This class is "abstract" in the sense that it
 * does nothing except provide functionality for 
 * subclasses and has no constructor.
 * The buildPath() method must be overriden to define
 * the shape to be drawn.
 *
 * Dependencies:
 * extend.js
 */

var Shape = Base.extend({
    init: function(params) {
        this.fillStyle = params.fillStyle || 'white';
        this.strokeStyle = params.strokeStyle || 'black';
        this.lineWidth = params.lineWidth || 1;
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
            context.fillStyle = _this.fillStyle || 'white';
            context.fill();
        });
    },

    stroke: function(context) {
        var _this = this;

        this.render(context, function() {
            context.strokeStyle = _this.strokeStyle || 'black';
            context.lineWidth = _this.lineWidth || 1;
            context.stroke();
        });
    },

    draw: function(context) {
        var _this = this;

        this.render(context, function() {
            context.strokeStyle = _this.strokeStyle || 'black';
            context.lineWidth = _this.lineWidth || 1;
            context.fillStyle = _this.fillStyle || 'white';
            context.fill();
            context.stroke();
        });
    },

    /**
     * abstract method
     */
    buildPath: function(context) {
        alert('Subclasses must override buildPath()!');
    }
});
