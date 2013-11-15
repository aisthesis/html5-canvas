var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.ArrowView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'drawPoint',
                'drawBezierPoints',
                'drawArrow'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            this.drawArrow();
            this.drawBezierPoints();
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
            this.ARROW_MARGIN = 30;
            this.POINT_RADIUS = 7;
            this.CORNERS = [
                {
                    ctrl: new Point(this.el.width - this.ARROW_MARGIN, 
                        this.el.height - this.ARROW_MARGIN),
                    anchor: new Point(this.el.width - this.ARROW_MARGIN * 2,
                        this.el.height - this.ARROW_MARGIN)
                },
                {
                    ctrl: new Point(this.POINT_RADIUS,
                        this.el.height / 2),
                    anchor: new Point(this.ARROW_MARGIN,
                        this.el.height / 2 - this.ARROW_MARGIN)
                },
                {
                    ctrl: new Point(this.el.width - this.ARROW_MARGIN,
                        this.ARROW_MARGIN),
                    anchor: new Point(this.el.width - this.ARROW_MARGIN,
                        this.ARROW_MARGIN * 2)
                }
            ];
        },

        drawPoint: function(point, strokeStyle, fillStyle) {
            this.CONTEXT.beginPath();
            this.CONTEXT.fillStyle = fillStyle;
            this.CONTEXT.strokeStyle = strokeStyle;
            this.CONTEXT.lineWidth = 1;
            this.CONTEXT.arc(point.x, point.y, this.POINT_RADIUS, 
                    0, Math.PI * 2, false);
            this.CONTEXT.fill();
            this.CONTEXT.stroke();
        },

        drawBezierPoints: function() {
            var i,
                strokeStyle,
                fillStyle;

            for (i = 0; i < this.CORNERS.length; i++) {
                this.drawPoint(this.CORNERS[i].ctrl, 'blue', 'white');
                this.drawPoint(this.CORNERS[i].anchor, 'white', 'blue');
            }
        },

        drawArrow: function() {
            this.CONTEXT.strokeStyle = 'white';
            this.CONTEXT.fillStyle = 'blue';

            this.CONTEXT.moveTo(this.el.width - this.ARROW_MARGIN, 
                    this.ARROW_MARGIN * 2);
            this.CONTEXT.lineTo(this.el.width - this.ARROW_MARGIN,
                    this.el.height - this.ARROW_MARGIN * 2);
            this.CONTEXT.quadraticCurveTo(this.CORNERS[0].ctrl.x, this.CORNERS[0].ctrl.y,
                    this.CORNERS[0].anchor.x, this.CORNERS[0].anchor.y);
            this.CONTEXT.lineTo(this.ARROW_MARGIN, this.el.height / 2 + this.ARROW_MARGIN);
            this.CONTEXT.quadraticCurveTo(this.CORNERS[1].ctrl.x, this.CORNERS[1].ctrl.y,
                    this.CORNERS[1].anchor.x, this.CORNERS[1].anchor.y);
            this.CONTEXT.lineTo(this.el.width - this.ARROW_MARGIN * 2, this.ARROW_MARGIN);
            this.CONTEXT.quadraticCurveTo(this.CORNERS[2].ctrl.x, this.CORNERS[2].ctrl.y,
                    this.CORNERS[2].anchor.x, this.CORNERS[2].anchor.y);
            this.CONTEXT.fill();
            this.CONTEXT.stroke();
        }
    });
})(codeMelon.games);
