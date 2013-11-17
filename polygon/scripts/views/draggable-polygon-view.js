var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.DraggablePolygonView = Backbone.View.extend({
        events: {
            "mousedown": "handleMouseDown",
            "mouseup": "handleMouseUp",
            "mousemove": "handleMouseMove"
        },

        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'handleMouseDown',
                'handleMouseUp',
                'handleMouseMove',
                'highlightPolygon',
                'calculateOffset',
                'movePolygon',
                'restorePolygonColor',
                'windowToCanvas'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            this.polygon.draw(this.CONTEXT);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        },

        initMembers: function(options) {
            this.fillStyle = 'cornflowerblue';
            this.strokeStyle = 'goldenrod';
            this.polygonCenter = new Point(this.el.width / 2, this.el.height / 2);
            this.polygon = new RegularPolygon({
                center: new Point(this.polygonCenter.x, this.polygonCenter.y),
                radius: this.el.width / 8,
                sides: 5,
                angle: Math.PI / 2,
                fillStyle: this.fillStyle,
                strokeStyle: this.strokeStyle,
                lineWidth: 4
            });
            this.mousedown = {};
            this.dragging = false;
        },

        handleMouseDown: function(event) {
            var loc = this.windowToCanvas(event.clientX, event.clientY);

            if (this.dragging) {
                this.dragging = false;
                return;
            }
            if (this.polygon.contains(loc)) {
                event.preventDefault();
                this.mousedown = new Point(loc.x, loc.y);
                this.dragging = true;
                this.highlightPolygon();
            }
        },

        handleMouseUp: function(event) {
            var offset;

            if (!this.dragging) { return; }
            this.dragging = false;
            event.preventDefault();
            offset = this.calculateOffset(event);
            this.movePolygon(offset.x, offset.y);
            this.polygonCenter.x = this.polygon.center.x;
            this.polygonCenter.y = this.polygon.center.y;
            this.restorePolygonColor();
        },

        handleMouseMove: function(event) {
            var offset;

            if (!this.dragging) { return; }
            offset = this.calculateOffset(event);
            this.movePolygon(offset.x, offset.y);
        },

        calculateOffset: function(event) {
            var result = {},
                targetPoint;

            targetPoint = this.windowToCanvas(event.clientX, event.clientY);
            result.x = targetPoint.x - this.mousedown.x;
            result.y = targetPoint.y - this.mousedown.y;
            return result;
        },

        movePolygon: function(offsetX, offsetY) {
            this.polygon.center.x = this.polygonCenter.x + offsetX; 
            this.polygon.center.y = this.polygonCenter.y + offsetY;
            this.CONTEXT.clearRect(0, 0, this.el.width, this.el.height);
            this.polygon.resetVertices();
            this.polygon.draw(this.CONTEXT);
        },

        highlightPolygon: function() {
            this.polygon.fillStyle = _cg.highlights[this.fillStyle];
            this.polygon.strokeStyle = _cg.highlights[this.strokeStyle];
            this.polygon.draw(this.CONTEXT);
        },

        restorePolygonColor: function() {
            this.polygon.fillStyle = this.fillStyle;
            this.polygon.strokeStyle = this.strokeStyle;
            this.polygon.draw(this.CONTEXT);
        },

        windowToCanvas: function(_x, _y) {
            var bbox = this.el.getBoundingClientRect();

            return new Point(_x - bbox.left, _y - bbox.top);
        }
    });
})(codeMelon.games);
