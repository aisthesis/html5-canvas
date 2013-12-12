var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.SimpleView = Backbone.View.extend({
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
            this.sprite.paint(this.context);
        },

        setConstants: function(options) {
            this.RADIUS = 75;
        },

        initMembers: function(options) {
            var _this = this;

            this.context = this.el.getContext('2d');
            this.sprite = new _c.draw.Sprite({
                drawable: new _c.draw.Circle({
                    center: new _c.draw.Point(_this.el.width / 2, _this.el.height / 2),
                    radius: _this.RADIUS,
                    strokeStyle: 'rgb(100,100,195)',
                    fillStyle: 'rgba(30,144,255,0.15)',
                    lineWidth: 2
                }),

                paint: function(context) {
                    var _this = this;

                    this.drawable.clip(context, function() {
                        context.shadowColor = 'rgb(0,0,0)';
                        context.shadowOffsetX = -4;
                        context.shadowOffsetY = -4;
                        context.shadowBlur = 8;
                        _this.drawable.prep(context);
                        context.fill();
                        context.stroke();
                    });
                }
            });
        }
    });
})(_c.app.views);
