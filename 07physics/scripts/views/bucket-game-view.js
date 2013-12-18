var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.BucketGameView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'setDefaultStyles',
                'initLaunchPad',
                'initBall',
                'initBucket'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            this.context.save();
            this.launchPad.paint(this.context);
            this.context.restore();
            this.ball.paint(this.context);
        },

        setConstants: function(options) {
            // TODO
        },

        initMembers: function(options) {
            this.context = this.el.getContext('2d');
            this.setDefaultStyles(this.context);
            this.initLaunchPad(this);
            this.initBall(this);
            this.initBucket(this);
        },

        setDefaultStyles: function(context) {
            context.lineWidth = 0.5;
            context.strokeStyle = 'rgba(0,0,0,0.5)';
        },

        initLaunchPad: function(_this) {
            this.launchPad = new _c.draw.Sprite({
                drawable: new _c.draw.Rectangle({
                    corner: new _c.draw.Point(50, _this.el.height - 50),
                    width: 50,
                    height: 12,
                    styles: {
                        fillStyle: 'rgb(100,140,230)',
                        shadowColor: 'rgba(0,0,0,0.5)',
                        shadowOffsetX: -8,
                        shadowOffsetY: 8,
                        shadowBlur: 4
                    }
                })
            });
        },

        initBall: function(_this) {
            var _radius = 8,
                centerX = _this.launchPad.drawable.corner.x + _this.launchPad.drawable.width / 2,
                centerY = _this.launchPad.drawable.corner.y - _radius;

            this.ball = new _c.draw.Sprite({
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

            this.bucket = new _c.draw.Sprite({
                drawable: new _c.draw.Image({
                    src: 'bucket.png',
                    corner: new _c.draw.Point(_this.el.width - _width - 20, _this.el.height - _height - 20),
                    height: _height,
                    width: _width,
                    onload: function(event) {
                        _this.bucket.paint(_this.context);
                    }
                })
            });
        }
    });
})(_c.app.views);
