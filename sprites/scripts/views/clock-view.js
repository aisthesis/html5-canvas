var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.ClockView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'setSpriteLoc'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            this.context.clearRect(0, 0, this.el.width, this.el.height);
            this.face.paint(this.context);
            for (var sprite in this.sprites) {
                this.sprites[sprite].update(this.context, new Date()).paint(this.context);
            }
            requestAnimationFrame(this.render);
        },

        setConstants: function(options) {
            this.SPRITE_STYLES = {
                strokeStyle: 'rgb(100,100,195)',
                fillStyle: 'rgb(218,165,32)',
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffsetX: -2,
                shadowOffsetY: -2,
                shadowBlur: 4
            };
            this.LINE_STYLES = {
                strokeStyle: 'rgba(63,15,0,0.2)'
            };
            this.CLOCK_RADIUS = Math.min(this.el.width, this.el.height) / 2 - 24;
            this.HOUR_HAND_TRUNCATION = 32;
            this.AXIS_RADIUS = 6;
            this.CENTER = new _c.draw.Point(this.el.width / 2, this.el.height / 2);
        },

        initMembers: function(options) {
            var _this = this,
                _paint = function(offset) {
                    return function(context) {
                        var cos = Math.cos(this.angle),
                            sin = Math.sin(this.angle);

                        for (var style in _this.LINE_STYLES) {
                            context[style] = _this.LINE_STYLES[style];
                        }
                        context.beginPath();
                        context.moveTo(_this.CENTER.x + _this.AXIS_RADIUS * cos,
                            _this.CENTER.y + _this.AXIS_RADIUS * sin);
                        context.lineTo(_this.CENTER.x + (_this.CLOCK_RADIUS - offset - this.drawable.radius) * cos,
                            _this.CENTER.y + (_this.CLOCK_RADIUS - offset - this.drawable.radius) * sin);
                        context.stroke();
                        this.drawable.drawClipped(context);
                    };
                };

            this.context = this.el.getContext('2d');
            this.context.lineWidth = 2;
            this.sprites = {
                hourHand: new _c.draw.Sprite({
                    drawable: new _c.draw.Circle({
                        center: new _c.draw.Point(0, 0),
                        radius: 16,
                        styles: _this.SPRITE_STYLES
                    }),

                    paint: _paint(_this.HOUR_HAND_TRUNCATION),

                    behaviors: [function(context, time) {
                        var loc = time.getHours() * 5 + time.getMinutes() / 12;

                        _this.setSpriteLoc(this, context, _this.CLOCK_RADIUS - 
                            _this.HOUR_HAND_TRUNCATION, loc);
                    }]
                }),

                minuteHand: new _c.draw.Sprite({
                    drawable: new _c.draw.Circle({
                        center: new _c.draw.Point(0, 0),
                        radius: 12,
                        styles: _this.SPRITE_STYLES
                    }),

                    paint: _paint(0),

                    behaviors: [function(context, time) {
                        _this.setSpriteLoc(this, context, _this.CLOCK_RADIUS, time.getMinutes());
                    }]
                }),

                secondHand: new _c.draw.Sprite({
                    drawable: new _c.draw.Circle({
                        center: new _c.draw.Point(0, 0),
                        radius: 8,
                        styles: _this.SPRITE_STYLES
                    }),

                    paint: _paint(0),

                    behaviors: [function(context, time) {
                        _this.setSpriteLoc(this, context, _this.CLOCK_RADIUS, time.getSeconds());
                    }]
                }),

                axis: new _c.draw.Sprite({
                    drawable: new _c.draw.Circle({
                        center: _this.CENTER,
                        radius: _this.AXIS_RADIUS,
                        styles: _this.SPRITE_STYLES
                    }),

                    paint: _paint(0)
                })
            };

            this.face = new _c.draw.Sprite({
                drawable: new _c.draw.Circle({
                    center: _this.CENTER,
                    radius: _this.CLOCK_RADIUS,
                    styles: _this.LINE_STYLES
                }),

                paint: function(context) {
                    this.drawable.stroke(context);
                }
            });
        },

        setSpriteLoc: function(thisArg, context, radius, loc) {
            thisArg.angle = Math.PI * 2 * loc / 60 - Math.PI / 2;

            thisArg.drawable.center.x = this.el.width / 2 + Math.cos(thisArg.angle) * radius;
            thisArg.drawable.center.y = this.el.height / 2 + Math.sin(thisArg.angle) * radius;
        }
    });
})(_c.app.views);
