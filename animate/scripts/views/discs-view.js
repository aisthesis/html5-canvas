var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.DiscsView = Backbone.View.extend({
        initialize: function(options) {
            var _this = this;

            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'update',
                'animate'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
            requestAnimationFrame(_this.animate);
        },

        render: function() {
            this.discs.forEach(function(disc) {
                disc.circle.draw(this.context);
            }, this);
        },

        setConstants: function(options) {
            this.RADIUS = 32;
            this.X_MAX = this.el.width - this.RADIUS;
            this.Y_MAX = this.el.height - this.RADIUS;
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

                    velocity: new _c.draw.Vector(2.2, 2.5)
                },

                {
                    circle: new _c.draw.Circle({
                        center: new _c.draw.Point(150, 75),
                        radius: this.RADIUS,
                        fillStyle: 'gray',
                        strokeStyle: 'navy'
                    }),

                    velocity: new _c.draw.Vector(1.2, 1.5)
                },
            ];
        },

        update: function() {
            var _this = this,
                tmp;

            this.discs.forEach(function(disc) {
                // reverse directions if edge would be hit
                tmp = disc.circle.center.x + disc.velocity.x;
                if (tmp < _this.RADIUS || _this.X_MAX < tmp) {
                    disc.velocity.x = -disc.velocity.x;
                }
                tmp = disc.circle.center.y + disc.velocity.y; 
                if (tmp < _this.RADIUS || _this.Y_MAX < tmp) {
                    disc.velocity.y = -disc.velocity.y;
                }
                disc.circle.center.move(disc.velocity);
            });
        },

        animate: function(time) {
            this.context.clearRect(0, 0, this.el.width, this.el.height);
            this.update();
            this.render();
            requestAnimationFrame(this.animate);
        }
    });
})(_c.app.views);
