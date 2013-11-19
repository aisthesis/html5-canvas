var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.DraggableCurveView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'drawBezierCurve',
                'drawPoints'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            this.drawPoints();
            this.drawBezierCurve();
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
            this.DRAGGABLE_POINT_RADIUS = 4;
            this.CTRL_POINT_FILL_STYLE = 'yellow';
            this.CTRL_POINT_STROKE_STYLE = 'gray';
            this.END_POINT_FILL_STYLE = 'green';
            this.END_POINT_STROKE_STYLE = 'navy';
        },

        initMembers: function(options) {
            this.endPoints = [
                new Circle({
                    center: new Point(130, 70),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    fillStyle: this.END_POINT_FILL_STYLE,
                    strokeStyle: this.END_POINT_STROKE_STYLE
                }),
                new Circle({
                    center: new Point(430, 270),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    fillStyle: this.END_POINT_FILL_STYLE,
                    strokeStyle: this.END_POINT_STROKE_STYLE
                })
            ];
            this.ctrlPoints = [
                new Circle({
                    center: new Point(130, 250),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    fillStyle: this.CTRL_POINT_FILL_STYLE,
                    strokeStyle: this.CTRL_POINT_STROKE_STYLE
                }),
                new Circle({
                    center: new Point(450, 70),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    fillStyle: this.CTRL_POINT_FILL_STYLE,
                    strokeStyle: this.CTRL_POINT_STROKE_STYLE
                })
            ];
        },
        
        drawBezierCurve: function() {
            this.CONTEXT.strokeStyle = 'blue';
            this.CONTEXT.beginPath();
            this.CONTEXT.moveTo(this.endPoints[0].center.x, 
                    this.endPoints[0].center.y);
            this.CONTEXT.bezierCurveTo(
                    this.ctrlPoints[0].center.x,
                    this.ctrlPoints[0].center.y,
                    this.ctrlPoints[1].center.x,
                    this.ctrlPoints[1].center.y,
                    this.endPoints[1].center.x,
                    this.endPoints[1].center.y
                );
            this.CONTEXT.stroke();
        },

        drawPoints: function() {
            var _this = this;

            this.endPoints.forEach(function(pt) {
                pt.draw(_this.CONTEXT);
            });
            this.ctrlPoints.forEach(function(pt) {
                pt.draw(_this.CONTEXT);
            });
        }
    });
})(codeMelon.games);
