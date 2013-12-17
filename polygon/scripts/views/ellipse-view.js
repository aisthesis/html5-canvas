var _c = _c || {};
_c.app = _c.app || {};
_c.app.views = _c.app.views || {};

(function(_cg) {
    "use strict";
    _cg.EllipseView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            var ellipse = new _c.draw.Ellipse({
                center: new _c.draw.Point(this.el.width / 2, this.el.height / 2),
                radius: this.el.width / 6,
                stretch: 3,
                angle: Math.PI / 6,
                styles: {
                    fillStyle: 'cornflowerblue',
                    strokeStyle: 'goldenrod',
                    lineWidth: 4
                }
            });

            ellipse.draw(this.CONTEXT);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        }
    });
})(_c.app.views);
