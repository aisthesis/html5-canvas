var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.DiscsView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            this.discs.forEach(function(disc) {
                disc.circle.draw(this.context);
            }, this);
        },

        setConstants: function(options) {
            this.RADIUS = 32;
        },

        initMembers: function(options) {
            this.context = this.el.getContext('2d');
            this.discs = [
                {
                    circle: new _c.draw.Circle({
                        center: new _c.draw.Point(150, 250),
                        radius: this.RADIUS,
                        fillStyle: 'orange',
                        strokeStyle: 'gray'
                    }),

                    velocity: new _c.draw.Vector(-3.2, 3.5)
                },

                {
                    circle: new _c.draw.Circle({
                        center: new _c.draw.Point(50, 150),
                        radius: this.RADIUS,
                        fillStyle: 'navy',
                        strokeStyle: 'orange'
                    }),

                    velocity: new _c.draw.Vector(-3.2, 3.5)
                },

                {
                    circle: new _c.draw.Circle({
                        center: new _c.draw.Point(150, 75),
                        radius: this.RADIUS,
                        fillStyle: 'gray',
                        strokeStyle: 'navy'
                    }),

                    velocity: new _c.draw.Vector(-3.2, 3.5)
                },
            ];
        }
    });
})(_c.app.views);
