var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.ExplosionView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'animate',
                'getFrames'
            );

            this.setConstants(options);
            this.initMembers(options);
        },

        render: function() {
            this.sprite.update(this.context, new Date()).paint(this.context);
        },

        setConstants: function(options) {
            this.OFFSET = new _c.draw.Vector(-22, -32);
            // ms to expire before moving to next image
            this.PAGEFLIP_INTERVAL = 100;
            this.FUSE_FRAMES = 9;
            this.EXPLOSION_FRAMES = 9;
        },

        initMembers: function(options) {
            var _this = this,
                params = {
                    frames: this.getFrames()
                };

            this.context = this.el.getContext('2d');
            this.lastAdvance = new Date();
            this.ready = false;
            this.sprite = new _c.draw.Sprite({
                drawable: new _c.draw.FrameSet(params),

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
            var _this = this;

            if (this.ready) {
                if (this.sprite.drawable.index === this.sprite.drawable.frames.length - 1) {
                    this.ready = false;
                    setTimeout(function() {
                        _this.render();
                    }, this.PAGEFLIP_INTERVAL * 8);
                }
                this.render();
                requestAnimationFrame(this.animate);
            }
        },

        getFrames: function() {
            var _this = this,
                frames = [],
                paramsArray = [],
                _width = 180,
                _height = 130,
                corner =  new _c.draw.Point(this.el.width / 2, 
                    this.el.height / 2).offset({x: -_width / 2, y: -_height / 2});

            // initial bomb image
            paramsArray.push({ src: 'bomb.png' });

            // fuse burning
            for (var i = 0; i < this.FUSE_FRAMES; i++) {
                paramsArray.push({ src: 'explosion/fuse-0' + i + '.png' });
            }

            // bomb no fuse
            paramsArray.push({ src: 'explosion/bomb-no-fuse.png' });
           
            // post-explosion
            for (var i = 0; i < this.EXPLOSION_FRAMES; i++) {
                paramsArray.push({ src: 'explosion/explosion-0' + i + '.png' });
            }

            paramsArray.forEach(function(params) {
                params.corner = new _c.draw.Point(corner.x, corner.y),
                params.width = _width,
                params.height = _height,
                params.onload = function(event) {
                    _this.ready = true;
                    _this.sprite.paint(_this.context);
                }
                frames.push(new _c.draw.Image(params));
            });

            return frames;
        }
    });
})(_c.app.views);
