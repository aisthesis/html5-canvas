var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.CubicView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'drawBezierCurve',
                'drawPoints'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            this.drawPoints(this.CTRL_POINTS, 'yellow', 'blue');
            this.drawPoints(this.END_POINTS, 'blue', 'red');
            this.drawBezierCurve();
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
            this.END_POINTS = [
                new Point(130, 70),
                new Point(430, 270)
            ];
            this.CTRL_POINTS = [
                new Point(130, 250),
                new Point(450, 70)
            ];
        },
        
        drawBezierCurve: function() {
            this.CONTEXT.strokeStyle = 'blue';
            this.CONTEXT.beginPath();
            this.CONTEXT.moveTo(this.END_POINTS[0].getX(), 
                    this.END_POINTS[0].getY());
            this.CONTEXT.bezierCurveTo(
                    this.CTRL_POINTS[0].getX(),
                    this.CTRL_POINTS[0].getY(),
                    this.CTRL_POINTS[1].getX(),
                    this.CTRL_POINTS[1].getY(),
                    this.END_POINTS[1].getX(),
                    this.END_POINTS[1].getY()
                );
            this.CONTEXT.stroke();
        },

        drawPoints: function(points, strokeStyle, fillStyle) {
            var _this = this;

            this.CONTEXT.strokeStyle = strokeStyle;
            this.CONTEXT.fillStyle = fillStyle;

            points.forEach(function(point) {
                _this.CONTEXT.beginPath();
                _this.CONTEXT.arc(point.getX(), point.getY(), 5, 0, Math.PI * 2, false);
                _this.CONTEXT.stroke();
                _this.CONTEXT.fill();
            });
        }
    });
})(codeMelon.games);
