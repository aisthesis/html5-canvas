var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.DraggableCurveView = Backbone.View.extend({
        events: {
            "mousedown": "handleMouseDown",
            "mousemove": "handleMouseMove",
            "mouseup": "handleMouseUp"
        },

        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'handleMouseDown',
                'handleMouseMove',
                'handleMouseUp',
                'movePointIfDragging',
                'drawBezierCurve',
                'drawPoints',
                'getOffset',
                'movePoint'
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
                new _c.draw.Circle({
                    center: new _c.draw.Point(130, 70),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    styles: {
                        fillStyle: this.END_POINT_FILL_STYLE,
                        strokeStyle: this.END_POINT_STROKE_STYLE
                    }
                }),
                new _c.draw.Circle({
                    center: new _c.draw.Point(430, 270),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    styles: {
                        fillStyle: this.END_POINT_FILL_STYLE,
                        strokeStyle: this.END_POINT_STROKE_STYLE
                    }
                })
            ];
            this.ctrlPoints = [
                new _c.draw.Circle({
                    center: new _c.draw.Point(130, 250),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    styles: {
                        fillStyle: this.CTRL_POINT_FILL_STYLE,
                        strokeStyle: this.CTRL_POINT_STROKE_STYLE
                    }
                }),
                new _c.draw.Circle({
                    center: new _c.draw.Point(450, 70),
                    radius: this.DRAGGABLE_POINT_RADIUS,
                    styles: {
                        fillStyle: this.CTRL_POINT_FILL_STYLE,
                        strokeStyle: this.CTRL_POINT_STROKE_STYLE
                    }
                })
            ];
            this.mousedown = {};
            this.dragging = {
                active: false,
                view: null,
                origCenter: null
            };
        },

        handleMouseDown: function(event) {
            var loc = _c.draw.windowToCanvas(this.el, event.clientX, event.clientY),
                i;

            if (this.dragging.active || this.dragging.view !== null) {
                this.dragging.active = false;
                this.dragging.view = null;
                return;
            }
            for (i = 0; i < this.endPoints.length && this.dragging.view === null; i++) {
                if (this.endPoints[i].contains(loc)) {
                    this.dragging.view = this.endPoints[i];
                }
            }
            for (i = 0; i < this.ctrlPoints.length && this.dragging.view === null; i++) {
                if (this.ctrlPoints[i].contains(loc)) {
                    this.dragging.view = this.ctrlPoints[i];
                }
            }
            if (this.dragging.view !== null) {
                this.dragging.active = true;
                this.mousedown = loc;
                this.dragging.origCenter = new _c.draw.Point(this.dragging.view.center.x, this.dragging.view.center.y);
                console.log('mousedown at (' + this.dragging.view.center.x + ', ' + this.dragging.view.center.y + ')');
            }
        },

        handleMouseMove: function(event) {
            this.movePointIfDragging(event);
        },

        handleMouseUp: function(event) {
            if (!this.movePointIfDragging(event)) { return; }
            this.dragging.active = false;
            this.dragging.view = null;
        },

        movePointIfDragging: function(event) {
            var offset;

            if (!this.dragging.active) { return false; }
            offset = this.getOffset(event);
            this.movePoint(this.dragging.view, offset);
            return true;
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
        },

        getOffset: function(event) {
            var result = {},
                targetPoint;

            targetPoint = _c.draw.windowToCanvas(this.el, event.clientX, event.clientY);
            result.x = targetPoint.x - this.mousedown.x;
            result.y = targetPoint.y - this.mousedown.y;
            return result;
        },

        movePoint: function(point, offset) {
            point.center.x = this.dragging.origCenter.x + offset.x;
            point.center.y = this.dragging.origCenter.y + offset.y;
            this.CONTEXT.clearRect(0, 0, this.el.width, this.el.height);
            this.render();
        }
    });
})(codeMelon.games);
