var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.BombView = Backbone.View.extend({
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
        },

        setConstants: function(options) {
            this.BOMB_WIDTH = 180;
            this.BOMB_HEIGHT = 130;
        },

        initMembers: function(options) {
            var _this = this;

            this.context = this.el.getContext('2d');
            this.sprite = new _c.draw.Sprite({
                drawable: new _c.draw.Image({
                    src: 'bomb.png',
                    corner: new _c.draw.Point((_this.el.width - _this.BOMB_WIDTH) / 2, 
                        (_this.el.height - _this.BOMB_HEIGHT) / 2),
                    width: _this.BOMB_WIDTH,
                    height: _this.BOMB_HEIGHT,
                    onload: function(event) {
                        _this.sprite.paint(_this.context);
                    }
                }),

                paint: function(context) {
                    this.drawable.draw(context);
                }
            });
        }
    });
})(_c.app.views);
