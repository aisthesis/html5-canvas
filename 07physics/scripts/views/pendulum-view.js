var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.PendulumView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'setDefaultStyles',
                'animate'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.setDefaultStyles(this.context);
            this.render();
        },

        render: function() {
            this.pendulum.paint(this.context);
        },

        setConstants: function(options) {
            this.GRAVITY = 9.81 / 100; // m/s/ms
            this.PIXELS_PER_METER = this.el.width / 10;
        },

        initMembers: function(options) {
            var _this = this;

            this.context = this.el.getContext('2d');
            this.setDefaultStyles(this.context);
            this.pendulum = new _c.draw.Sprite({
                drawable: new _c.draw.Composite({
                    points: {
                        pivot: new _c.draw.Point(_this.el.width / 2, 32),
                        bob: new _c.draw.Point(_this.el.width / 2, 0)
                    },

                    drawables: {
                        pivot: new _c.draw.Circle({
                            center: {},
                            radius: 4
                        }),

                        bob: new _c.draw.Circle({
                            center: {},
                            radius: 16
                        })
                    },

                    config: {
                        length: _this.el.height - 64
                    },

                    keys: ['pivot', 'bob'],

                    finish: function() {
                        this.points.bob.y = this.points.pivot.y + this.config.length; 
                        this.drawables.pivot.center = this.points.pivot;
                        this.drawables.bob.center = this.points.bob;
                    },

                    beforeDraw: function(context) {
                        context.moveTo(this.points.pivot.x, this.points.pivot.y);
                        context.lineTo(this.points.bob.x, this.points.bob.y);
                        context.stroke();
                    }
                })
            });
        },

        setDefaultStyles: function(context) {
            context.lineWidth = 0.5;
            context.strokeStyle = 'rgba(0,0,0,0.5)';
            context.fillStyle = 'rosybrown';
        },

        animate: function(time) {
            this.render();
            requestAnimationFrame(this.animate);
        }
    });
})(_c.app.views);
