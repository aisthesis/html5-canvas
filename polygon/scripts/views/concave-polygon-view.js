var _c = _c || {};
_c.app = _c.app || {};
_c.app.views = _c.app.views || {};

(function(_cg) {
    "use strict";
    _cg.ConcavePolygonView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            var polygon = new _c.draw.Polygon({
                vertices: [
                    new _c.draw.Point(this.el.width / 2, 32),
                    new _c.draw.Point(this.el.width / 2 + 16, 64),
                    new _c.draw.Point(this.el.width / 2 + 64, 64),
                    new _c.draw.Point(this.el.width / 2 - 16, 128)
                ],
                styles: {
                    fillStyle: 'cornflowerblue',
                    strokeStyle: 'goldenrod',
                    lineWidth: 8
                }
            });

            polygon.draw(this.CONTEXT);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        }
    });
})(_c.app.views);
