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
                'animate',
                'updateBob'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.setDefaultStyles(this.context);
            this.animate();
        },

        render: function() {
            var _this = this;

            this.context.clearRect(0, 0, this.el.width, this.el.height);
            this.pendulum.update(this.context).paint(this.context);
        },

        setConstants: function(options) {
            this.GRAVITY = 0.001;
            this.LENGTH = this.el.height - 64;
            this.SQRT_G_OVER_L = Math.sqrt(this.GRAVITY / this.LENGTH);
            this.START_ANGLE = Math.PI / 4;
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

                    keys: ['pivot', 'bob'],

                    finish: function() {
                        this.points.bob.y = this.points.pivot.y + _this.LENGTH * Math.cos(_this.START_ANGLE);
                        this.points.bob.x = this.points.pivot.x + _this.LENGTH * Math.sin(_this.START_ANGLE);
                        this.drawables.pivot.center = this.points.pivot;
                        this.drawables.bob.center = this.points.bob;
                    },

                    draw: {
                        before: function(context) {
                            context.beginPath();
                            context.moveTo(this.points.pivot.x, this.points.pivot.y);
                            context.lineTo(this.points.bob.x, this.points.bob.y);
                            context.stroke();
                        }
                    }
                }),

                behaviors: [
                    function(context, time) {
                        var _points = this.drawable.points;

                        _points.bob.y = _points.pivot.y + _this.LENGTH * Math.cos(_this.angle);
                        _points.bob.x = _points.pivot.x + _this.LENGTH * Math.sin(_this.angle);
                    }
                ]
            });

            this.startTime = 0;
            this.angle = this.START_ANGLE;
        },

        setDefaultStyles: function(context) {
            context.lineWidth = 0.5;
            context.strokeStyle = 'rgba(0,0,0,0.5)';
            context.fillStyle = 'rosybrown';
        },

        animate: function(time) {
            var elapsed = 0;

            if (typeof time === 'undefined') {
                return requestAnimationFrame(this.animate);
            }
            if (this.startTime === 0) {
                this.startTime = time;
            }
            else {
                elapsed = time - this.startTime;
                this.angle = this.START_ANGLE * Math.cos(this.SQRT_G_OVER_L * elapsed);
            }
            this.render();
            requestAnimationFrame(this.animate);
        },

        updateBob: function(angle) {
            var _points = this.pendulum.drawable;

            _points.bob.y = _points.pivot.y + this.LENGTH * Math.cos(angle);
            _points.bob.x = _points.pivot.x + this.LENGTH * Math.sin(angle);

        }
    });
})(_c.app.views);
