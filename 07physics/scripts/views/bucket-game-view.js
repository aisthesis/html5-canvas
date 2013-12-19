var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.BucketGameView = Backbone.View.extend({
        events: {
            'mousemove': 'handleMouseMove',
            'mousedown': 'handleMouseDown'
        },

        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'setDefaultStyles',
                'initLaunchPad',
                'initBall',
                'initBucket',
                'initMouseTracker',
                'handleMouseMove',
                'handleMouseDown',
                'animate'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            if (this.shooting) {
                this.trajNow.y = this.GRAVITY * this.elapsedTime + this.trajLaunch.y; 
            }
            for (var sprite in this.sprites) {
                this.sprites[sprite].update(this.context, 
                    new Date()).paint(this.context);
            }
        },

        setConstants: function(options) {
            this.GRAVITY = 9.81 / 100; // m/s/ms
            this.PIXELS_PER_METER = this.el.width / 10;
        },

        initMembers: function(options) {
            this.context = this.el.getContext('2d');
            this.setDefaultStyles(this.context);
            this.sprites = {};
            this.initLaunchPad(this);
            this.initBall(this);
            this.initBucket(this);
            this.shooting = false;
            this.trajLaunch = new _c.draw.Vector(0, 0);
            this.trajNow = new _c.draw.Vector(0, 0);
            this.launchTime = 0;
            this.elapsedTime = 0;
            this.lastTime = 0;
            this.timeDelta = 0;
            this.initMouseTracker(this);
        },

        setDefaultStyles: function(context) {
            context.lineWidth = 0.5;
            context.strokeStyle = 'rgba(0,0,0,0.5)';
        },

        initLaunchPad: function(_this) {
            this.sprites.launchPad = new _c.draw.Sprite({
                drawable: new _c.draw.Rectangle({
                    corner: new _c.draw.Point(50, _this.el.height - 50),
                    width: 50,
                    height: 12,
                    styles: {
                        fillStyle: 'rgb(100,140,230)',
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowOffsetX: -8,
                        shadowOffsetY: 8,
                        shadowBlur: 8
                    }
                }),

                paint: function(context) {
                    context.save();
                    this.drawable.draw(context);
                    context.restore();
                }
            });
        },

        initBall: function(_this) {
            var _radius = 8,
                centerX = _this.sprites.launchPad.drawable.corner.x + _this.sprites.launchPad.drawable.width / 2,
                centerY = _this.sprites.launchPad.drawable.corner.y - _radius;

            this.sprites.ball = new _c.draw.Sprite({
                drawable: new _c.draw.Circle({
                    radius: _radius,
                    center: new _c.draw.Point(centerX, centerY),
                    styles: {
                        fillStyle: 'rgb(255,255,0)',
                        strokeStyle: 'rbga(0,0,0,0.4)',
                        lineWidth: 2
                    }
                }),

                paint: function(context) {
                    this.drawable.drawClipped(context);
                }
            });
        },

        initBucket: function(_this) {
            var _height = 62,
                _width = 83;

            this.sprites.bucket = new _c.draw.Sprite({
                drawable: new _c.draw.Image({
                    src: 'bucket.png',
                    corner: new _c.draw.Point(_this.el.width - _width - 20, _this.el.height - _height - 20),
                    height: _height,
                    width: _width,
                    onload: function(event) {
                        _this.animate();
                    }
                })
            });
        },

        initMouseTracker: function(_this) {
            this.mouseTracker = {
                x: this.sprites.ball.drawable.center.x,
                y: this.sprites.ball.drawable.center.y
            };

            this.mouseTracker.track = function() {
                _this.trajLaunch.x = this.x - _this.sprites.ball.drawable.center.x;
                _this.trajLaunch.y = this.y - _this.sprites.ball.drawable.center.y;
            };
        },

        handleMouseMove: function(event) {
            if (!this.shooting) {
                event.preventDefault();
                _c.draw.windowToCanvas(this.el, event.clientX, event.clientY, this.mouseTracker);
                this.mouseTracker.track();
            }
        },

        handleMouseDown: function(event) {
            var _this = this;

            if (!this.shooting) {
                this.trajNow.x = this.trajLaunch.x;
                this.trajNow.y = this.trajLaunch.y;
                this.sprites.ball.behaviors.push(function(context, time) {
                    this.drawable.center.x += _this.trajNow.x * _this.timeDelta / _this.PIXELS_PER_METER;
                    this.drawable.center.y += _this.trajNow.y * _this.timeDelta / _this.PIXELS_PER_METER;
                });
                this.shooting = true;
            }
        },

        animate: function(time) {
            this.context.clearRect(0, 0, this.el.width, this.el.height);
            if (!this.shooting) {
                this.context.moveTo(this.sprites.ball.drawable.center.x, this.sprites.ball.drawable.center.y);
                this.context.lineTo(this.mouseTracker.x, this.mouseTracker.y);
                this.context.stroke();
                this.launchTime = time;
                this.lastTime = time;
            }
            else {
                this.timeDelta = time - this.lastTime;
                this.lastTime = time;
                this.elapsedTime = time - this.launchTime;
            }
            this.render();
            requestAnimationFrame(this.animate);
        }
    });
})(_c.app.views);
