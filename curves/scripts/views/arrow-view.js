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
            this.START = new Point(120.5, 130);
            this.ANCHOR1 = new Point(160.6, 150.5);
            this.CONTROL1 = new Point(150.8, 130);
            this.ANCHOR2 = new Point(210.5, 160.5);
            this.CONTROL2 = new Point(190, 250.0);
            this.ANCHOR3 = new Point(290, 70.5);
            this.CONTROL3 = new Point(240, 100.5);
        },

        drawPoint: function(point, strokeStyle, fillStyle) {
            this.CONTEXT.beginPath();
            this.CONTEXT.fillStyle = fillStyle;
            this.CONTEXT.strokeStyle = strokeStyle;
            this.CONTEXT.lineWidth = 1;
            this.CONTEXT.arc(point.getX(), point.getY(), this.POINT_RADIUS, 
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
            this.CONTEXT.quadraticCurveTo(this.CORNERS[0].ctrl.getX(), this.CORNERS[0].ctrl.getY(),
                    this.CORNERS[0].anchor.getX(), this.CORNERS[0].anchor.getY());
            this.CONTEXT.lineTo(this.ARROW_MARGIN, this.el.height / 2 + this.ARROW_MARGIN);
            this.CONTEXT.quadraticCurveTo(this.CORNERS[1].ctrl.getX(), this.CORNERS[1].ctrl.getY(),
                    this.CORNERS[1].anchor.getX(), this.CORNERS[1].anchor.getY());
            this.CONTEXT.lineTo(this.el.width - this.ARROW_MARGIN * 2, this.ARROW_MARGIN);
            this.CONTEXT.quadraticCurveTo(this.CORNERS[2].ctrl.getX(), this.CORNERS[2].ctrl.getY(),
                    this.CORNERS[2].anchor.getX(), this.CORNERS[2].anchor.getY());
            this.CONTEXT.fill();
            this.CONTEXT.stroke();
        }
    });
})(codeMelon.games);
