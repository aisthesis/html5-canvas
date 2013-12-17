var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.RunnerView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'animate'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            this.sprite.update(this.context, new Date()).paint(this.context);
        },

        setConstants: function(options) {
            this.OFFSET = new _c.draw.Vector(-22, -32);
            // ms to expire before moving to next image
            this.PAGEFLIP_INTERVAL = 100;
        },

        initMembers: function(options) {
            var _this = this;

            this.context = this.el.getContext('2d');
            this.lastAdvance = new Date();
            this.sprite = new _c.draw.Sprite({
                drawable: new _c.draw.TileSet({
                    src: 'running-sprite-sheet.png',
                    corner: new _c.draw.Point(_this.el.width / 2, 
                        _this.el.height / 2).offset(_this.OFFSET),
                    onload: function(event) {
                        _this.render();
                        _this.animate();
                    },
                    cells: [
                        { corner: new _c.draw.Point(0, 0), width: 47, height: 64 },
                        { corner: new _c.draw.Point(55, 0), width: 44, height: 64 },
                        { corner: new _c.draw.Point(107, 0), width: 39, height: 64 },
                        { corner: new _c.draw.Point(150, 0), width: 46, height: 64 },
                        { corner: new _c.draw.Point(208, 0), width: 49, height: 64 },
                        { corner: new _c.draw.Point(265, 0), width: 46, height: 64 },
                        { corner: new _c.draw.Point(320, 0), width: 42, height: 64 },
                        { corner: new _c.draw.Point(380, 0), width: 35, height: 64 },
                        { corner: new _c.draw.Point(425, 0), width: 35, height: 64 },
                    ]
                }),

                behaviors: [
                    function(context, time) {
                        if (time - _this.lastAdvance > _this.PAGEFLIP_INTERVAL) {
                            this.drawable.advance();
                            _this.lastAdvance = time;
                            context.clearRect(0, 0, _this.el.width, _this.el.height);
                        }
                    }
                ]
            });
        },

        animate: function(time) {
            this.render();
            requestAnimationFrame(this.animate);
        }
    });
})(_c.app.views);
